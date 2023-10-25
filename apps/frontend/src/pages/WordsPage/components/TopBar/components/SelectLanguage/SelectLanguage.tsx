'use client';
import { useDispatch, useSelector } from 'react-redux';

import { useGetLanguagesQuery } from '../../../../../../services/api/apiService';
import { Select } from '../../../../../../components/Select';
import { setLanguage } from '../../../../../../stores/trainingSlice';
import { RootState } from '../../../../../../stores';

import styles from './styles.module.scss';

const SelectLanguage = () => {
  const { data: languagesData, error, isLoading } = useGetLanguagesQuery();
  const languageId = useSelector(
    (state: RootState) => state.training.language?.id
  );

  const dispatch = useDispatch();

  const languageOptions =
    languagesData?.map(({ id, name }) => ({
      value: id,
      label: name,
    })) ?? [];

  const onChange = (value: string) => {
    const language = languageOptions.find((lang) => lang.value === value);

    if (language) {
      dispatch(setLanguage({ id: language.value, label: language.label }));
    }
  };

  if (error) {
    return <h2>Something went wrong...</h2>;
  }

  const content =
    languageOptions.length > 0 ? (
      <Select
        label="Select a language"
        onSelect={onChange}
        options={languageOptions}
        defaultValue={languageId}
      />
    ) : (
      <h3 className={styles.noLanguages}>No languages created yet</h3>
    );

  return (
    <div className={styles.container}>
      {!isLoading ? <>{content}</> : <h3>Loading...</h3>}
    </div>
  );
};

export { SelectLanguage };
