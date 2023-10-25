'use client';

import { useSelector } from 'react-redux';

import { useGetAllWordsQuery } from '../../../../services/api/apiService';
import { RootState } from '../../../../stores';
import { Table } from '../../../../components/Table';
import { LinkButton } from '../../../../components/LinkButton';

import styles from './styles.module.scss';

const WordsTable = () => {
  const language = useSelector((state: RootState) => state.training.language);

  const { data } = useGetAllWordsQuery(language?.id ?? '', {
    skip: !language?.id,
  });

  const tableCells: React.ComponentProps<typeof Table>['tableHeadCells'] = [
    {
      key: 'index',
      value: '#',
    },
    {
      key: 'word',
      value: 'word',
    },
    {
      key: 'lastRepeated',
      value: 'Last time repeated',
    },
    {
      key: 'goToWordPage',
      value: '',
    },
  ];

  const tableRows: React.ComponentProps<typeof Table>['tableBodyRows'] =
    data?.map(({ id, text, lastRecall }, idx) => ({
      key: id,
      cells: [
        {
          key: `${id}-index`,
          value: idx + 1,
        },
        {
          key: `${id}-word`,
          value: text,
        },
        {
          key: `${id}-lastRepeated`,
          value: lastRecall ? new Date(lastRecall).toLocaleString() : '-',
        },
        {
          key: `${id}-goToWordPage`,
          value: (
            <LinkButton href={`/words/${language?.id}/${id}`}>
              Open word
            </LinkButton>
          ),
        },
      ],
    })) ?? [];

  return (
    <div className={styles.wordsTableContainer}>
      <Table tableHeadCells={tableCells} tableBodyRows={tableRows} />
    </div>
  );
};

export { WordsTable };
