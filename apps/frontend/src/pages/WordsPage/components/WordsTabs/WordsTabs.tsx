import { Tabs } from '../../../../components/Tabs';
import { AddWordForm } from '../AddWordForm';
import { WordsTable } from '../WordsTable';

import styles from './styles.module.scss';

const WordsTabs = () => {
  const tabs: React.ComponentProps<typeof Tabs>['tabs'] = [
    {
      label: 'All words',
      children: <WordsTable />,
    },
    {
      label: 'Add new word',
      children: <AddWordForm />,
    },
  ];

  return (
    <div className={styles.wordsTabsWrapper}>
      <Tabs tabs={tabs} />
    </div>
  );
};

export { WordsTabs };
