import { ReactNode } from 'react';

import styles from './styles.module.scss';

type spanSizes =
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

interface ColumnProps {
  children: ReactNode;
  span?: spanSizes;
}

const spanSizeToClassName: Record<spanSizes, string> = {
  '1': styles['column-1'],
  '2': styles['column-2'],
  '3': styles['column-3'],
  '4': styles['column-4'],
  '5': styles['column-5'],
  '6': styles['column-6'],
  '7': styles['column-7'],
  '8': styles['column-8'],
  '9': styles['column-9'],
  '10': styles['column-10'],
  '11': styles['column-11'],
  '12': styles['column-12'],
};

const Column: React.FC<ColumnProps> = ({ children, span = '12' }) => {
  return <div className={spanSizeToClassName[span]}>{children}</div>;
};

export { Column };
