import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface RowProps {
  children: ReactNode;
}

const Row: React.FC<RowProps> = ({ children }) => {
  return <div className={styles.row}>{children}</div>;
};

export { Row };
