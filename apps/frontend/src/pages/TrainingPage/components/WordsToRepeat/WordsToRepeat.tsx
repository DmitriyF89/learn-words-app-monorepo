'use client';
import { useSelector } from 'react-redux';

import { Details } from './components/Details/Details';
import { useGetTrainingWordsQuery } from '../../../../services/api/apiService';
import { RootState } from '../../../../stores';
import { Accordion } from '../../../../components/Accordion';

import styles from './styles.module.scss';

const WordsToRepeat = () => {
  const languageId = useSelector(
    (state: RootState) => state.training.language?.id
  );

  const { data } = useGetTrainingWordsQuery(languageId ?? '', {
    skip: !languageId,
  });

  const splitSpecialStrings = (str: string) => {
    return str.split('|');
  };

  return (
    <div className={styles.wrapper}>
      {data?.length === 0 && <h3>There are no words added yet...</h3>}
      {data?.map(
        ({
          id,
          text,
          examples,
          synonyms,
          description,
          picture,
          lastRecall,
          successWordRecallCount,
        }) => {
          const lastRecalledDate = new Date(lastRecall).toLocaleDateString();
          const today = new Date().toLocaleDateString();
          const isRecalledToday = lastRecalledDate === today;

          return (
            <div className={styles.word} key={id}>
              <Accordion
                className={isRecalledToday ? styles.lastRecalled : undefined}
                summary={description}
                details={
                  <Details
                    wordId={id}
                    answer={text}
                    examples={splitSpecialStrings(examples)}
                    synonyms={splitSpecialStrings(synonyms)}
                    picture={picture}
                    successWordRecallCount={successWordRecallCount}
                    lastRecall={lastRecall}
                  />
                }
              />
            </div>
          );
        }
      )}
    </div>
  );
};

export { WordsToRepeat };
