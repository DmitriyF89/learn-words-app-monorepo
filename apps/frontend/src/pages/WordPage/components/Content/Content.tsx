'use client';
import { useParams, useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikProps,
  FieldArray,
} from 'formik';

import {
  useDeleteWordMutation,
  useUpdateWordMutation,
} from '../../../../services/api/apiService';
import { Button } from '../../../../components/Button';

import styles from './styles.module.scss';

import { useGetWordQuery } from '../../../../services/api/apiService';

const WORD_TITLE = 'Word';
const WORD_DESCRIPTION = 'Description';
const WORD_SYNONYMS = 'Synonyms';
const WORD_EXAMPLE = 'Example';
const WORD_PICTURE = 'Picture';

const Content = () => {
  const params = useParams();
  const { push } = useRouter();
  const { data, isLoading } = useGetWordQuery({
    langId: params?.langId as string,
    wordId: params?.id as string,
  });
  const [deleteWord, { isError: isDeleteWordError, error }] =
    useDeleteWordMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newPicture, setNewPicture] = useState('');
  const [initialPicture, setInitialPicture] = useState('');

  if (!initialPicture && data?.picture && data.picture !== initialPicture) {
    setInitialPicture(data.picture);
  }

  const [updateWord, { isError }] = useUpdateWordMutation();

  // TODO: Move low level FileReader API logic to a separate module
  const handleImageChange =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (form: FormikProps<any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageFile = e?.target?.files?.[0] ?? null;
      const reader = new FileReader();

      reader.onload = async () => {
        const base64Image = reader.result?.toString();

        if (base64Image) {
          form.setFieldValue('picture', base64Image);
          setNewPicture(base64Image);
        }
      };

      if (imageFile) {
        reader.readAsDataURL(imageFile);
      }
    };

  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onDeleteWord = async () => {
    try {
      await deleteWord({
        langId: params?.langId as string,
        wordId: params?.id as string,
      });

      if (isDeleteWordError) {
        console.log({ error });
        return;
      }

      push('/words');
    } catch (error) {
      console.log({ error });
    }
  };

  if (!data && isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.formWrapper}>
      <Formik
        isInitialValid={false}
        validateOnBlur
        initialValues={{
          text: data?.text ?? '',
          synonyms: data?.synonyms ?? '',
          examples: data?.examples.split('|') ?? [],
          description: data?.description ?? '',
          picture: data?.picture ?? '',
        }}
        validate={({ text, description }) => {
          const errors: Partial<Record<'text' | 'description', string>> = {};

          if (!text) {
            errors.text = 'Word field is required';
          }

          if (!description) {
            errors.description = 'Description field is required';
          }

          return errors;
        }}
        onSubmit={async (values, form) => {
          if (!params?.langId) return;

          await updateWord({
            langId: params?.langId as string,
            newWord: {
              ...values,
              synonyms: [values.synonyms],
            },
            wordId: params?.id as string,
          });

          if (!isError) {
            form.resetForm();
            resetFileInput();

            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }
        }}
      >
        {({ isSubmitting, values, isValid, errors }) => {
          return (
            <Form>
              <Field name="text">
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <div className={styles.textFieldWrapper}>
                    <TextField
                      label={WORD_TITLE}
                      variant="standard"
                      fullWidth
                      autoComplete="off"
                      error={!!error && touched}
                      helperText={error}
                      {...field}
                    />
                  </div>
                )}
              </Field>
              <Field name="description">
                {({ field, meta: { error, touched } }: FieldProps) => (
                  <>
                    <div className={styles.textFieldWrapper}>
                      <TextField
                        label={WORD_DESCRIPTION}
                        variant="standard"
                        fullWidth
                        autoComplete="off"
                        error={!!error && touched}
                        helperText={error}
                        {...field}
                      />
                    </div>
                  </>
                )}
              </Field>
              <Field name="synonyms">
                {({ field }: FieldProps) => (
                  <div className={styles.textFieldWrapper}>
                    <TextField
                      label={WORD_SYNONYMS}
                      variant="standard"
                      fullWidth
                      autoComplete="off"
                      {...field}
                    />
                  </div>
                )}
              </Field>
              <FieldArray
                name="examples"
                render={(helpers) => {
                  return values.examples.length > 0 ? (
                    <>
                      {values.examples.map((example, i, all) => {
                        const lastItemIdx = all.length - 1;
                        const isLastItem = i === lastItemIdx;
                        const isAddMoreAllowed = isLastItem && !!example;
                        const firstItem = i === 0;
                        const key = `${values.text}_${i}`;

                        return (
                          <div className={styles.textFieldWrapper} key={key}>
                            <Field name={`examples.${i}`}>
                              {({ field }: FieldProps) => (
                                <TextField
                                  label={WORD_EXAMPLE}
                                  variant="standard"
                                  fullWidth
                                  autoComplete="off"
                                  {...field}
                                />
                              )}
                            </Field>
                            {isLastItem ? (
                              <>
                                <Button
                                  onClick={() => helpers.insert(i + 1, '')}
                                  disabled={!isAddMoreAllowed}
                                >
                                  Add more examples
                                </Button>
                                <Button
                                  onClick={() => helpers.remove(i)}
                                  disabled={firstItem}
                                >
                                  Delete example
                                </Button>
                              </>
                            ) : null}
                          </div>
                        );
                      })}
                    </>
                  ) : null;
                }}
              />
              <Field name="picture">
                {({ form }: FieldProps) => (
                  <div className={styles.textFieldWrapper}>
                    <TextField
                      label={WORD_PICTURE}
                      variant="standard"
                      type="file"
                      onChange={handleImageChange(form)}
                      ref={fileInputRef}
                    />
                    {newPicture || initialPicture ? (
                      <div className={styles.pictureWrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={newPicture || initialPicture}
                          alt="words picture"
                        />
                      </div>
                    ) : null}
                  </div>
                )}
              </Field>
              <div className={styles.buttonWrapper}>
                <Button type="submit" disabled={isSubmitting || !isValid}>
                  Update word
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <div>
        <Button color="error" onClick={onDeleteWord}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export { Content };
