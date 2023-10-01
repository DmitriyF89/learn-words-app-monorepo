'use client';
import { Tabs } from '../../../../components/Tabs';

import styles from './styles.module.scss';
import { SelectLanguage } from './components/SelectLanguage/SelectLanguage';
import { AddLanguage } from './components/AddLanguage';

const TopBar: React.FC = () => {
  const tabs: React.ComponentProps<typeof Tabs>['tabs'] = [
    { label: 'Select a language', children: <SelectLanguage /> },
    { label: 'Add a language', children: <AddLanguage /> },
  ];

  return (
    <div className={styles.topBarContainer}>
      <Tabs tabs={tabs} />
    </div>
  );
};

export { TopBar };
