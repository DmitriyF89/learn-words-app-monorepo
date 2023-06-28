'use client';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

interface Props {
  headerContent?: ReactNode;
  mainContent?: ReactNode;
  footerContent?: ReactNode;
  onClose?: () => void;
}

const Modal: React.FC<Props> = ({
  mainContent,
  headerContent,
  footerContent,
  onClose,
}) => {
  return (
    <div
      className={styles.backdrop}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div className={styles.wrapper}>
        <button className={styles.closeButton} onClick={onClose}>
          x
        </button>
        <div className={styles.header}>{headerContent}</div>
        <div className={styles.main}>{mainContent}</div>
        <div className={styles.footer}>{footerContent}</div>
      </div>
    </div>
  );
};

export { Modal };
