import { useSelector } from 'react-redux';

import { RootState } from '../../../../../../stores';
import { Button } from '../../../../../../components/Button';
import { useUpdateWordMutation } from '../../../../../../services/api/apiService';

import styles from './styles.module.scss';

interface Props {
  wordId: string;
  answer: string;
  examples?: string[];
  synonyms?: string[];
  picture?: string;
  lastRecall?: string;
  successWordRecallCount?: number;
}

const Details: React.FC<Props> = ({
  answer,
  examples,
  picture,
  synonyms,
  lastRecall,
  successWordRecallCount,
  wordId,
}) => {
  const [updateWord] = useUpdateWordMutation();
  const language = useSelector((state: RootState) => state.training.language);

  const filterEmptyStrings = (arr: string[] = []) => arr.filter(Boolean);

  const renderSynonyms = filterEmptyStrings(synonyms);
  const renderExamples = filterEmptyStrings(examples);

  const repeatedToday = lastRecall
    ? new Date(lastRecall).toLocaleDateString() ===
      new Date().toLocaleDateString()
    : false;

  const handleRepeat = () => {
    if (language?.id) {
      updateWord({
        wordId,
        langId: language.id,
        newWord: {
          lastRecall: new Date().toISOString(),
          successWordRecallCount: (successWordRecallCount ?? 0) + 1,
        },
      });
    }
  };

  const handleResetSequence = () => {
    if (language?.id) {
      updateWord({
        wordId,
        langId: language.id,
        newWord: {
          lastRecall: '',
          successWordRecallCount: 0,
        },
      });
    }
  };

  return (
    <div>
      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <h3>Correct Answer</h3>
          <div>{answer}</div>
          {renderExamples.length ? (
            <>
              <hr />
              <h3>Examples:</h3>
              <div>
                <ul>
                  {renderExamples.map((example) => {
                    return <li key={example}>{example}</li>;
                  })}
                </ul>
              </div>
            </>
          ) : null}
          {renderSynonyms.length ? (
            <>
              <hr />
              <h3>Synonyms:</h3>
              <div>{renderSynonyms}</div>
            </>
          ) : null}
        </div>
        {picture ? (
          <div className={styles.pictureWrapper}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={picture} alt={answer} />
          </div>
        ) : null}
      </div>
      <hr />
      <div>
        <Button
          disabled={repeatedToday || !language?.id}
          onClick={handleRepeat}
        >
          Repeated
        </Button>
        <Button
          color="error"
          disabled={!successWordRecallCount}
          onClick={handleResetSequence}
        >
          Reset sequence
        </Button>
      </div>
    </div>
  );
};

export { Details };
