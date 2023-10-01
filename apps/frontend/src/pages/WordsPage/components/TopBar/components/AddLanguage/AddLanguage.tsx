'use client';
import { Formik, Form, Field, FieldProps } from 'formik';
import TextField from '@mui/material/TextField';

import { Button } from '../../../../../../components/Button';
import { useAddLanguageMutation } from '../../../../../../services/api/apiService';

import styles from './styles.module.scss';

const AddLanguage = () => {
  const [addLanguage, { isError }] = useAddLanguageMutation();

  return (
    <div className={styles.container}>
      <Formik
        initialValues={{
          language: '',
        }}
        onSubmit={async (value, form) => {
          if (!value) {
            return;
          }

          await addLanguage(value);

          if (!isError) {
            form.resetForm();
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="language">
              {({ field }: FieldProps) => (
                <div>
                  <TextField
                    label="Language name"
                    variant="standard"
                    fullWidth
                    {...field}
                  />
                </div>
              )}
            </Field>
            <div className={styles.buttonWrapper}>
              <Button type="submit" disabled={isSubmitting}>
                Save language
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { AddLanguage };
