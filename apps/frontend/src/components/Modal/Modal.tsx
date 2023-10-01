'use client';
import { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

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
    <>
      <div className={styles.wrapper}>
        <div className={styles.closeButton}>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>

        <div className={styles.header}>{headerContent}</div>
        <div className={styles.main}>{mainContent}</div>
        <div className={styles.footer}>{footerContent}</div>
      </div>
      <div
        className={styles.backdrop}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose?.();
          }
        }}
      />
    </>
  );
};

export { Modal };
