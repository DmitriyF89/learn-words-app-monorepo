'use client';
import { useState } from 'react';

import { Modal } from '../Modal';

import styles from './styles.module.scss';

type ModalPurpose = 'login' | 'register';

interface PurposeSwitcherProps {
  onPurposeSwitch: (purpose: ModalPurpose) => void;
  currentPurpose: ModalPurpose;
}

const PurposeSwitcher: React.FC<PurposeSwitcherProps> = ({
  onPurposeSwitch,
  currentPurpose,
}) => {
  return (
    <div className={styles.purposeSwitcherContainer}>
      <button
        className={`${styles.purposeSwitcherButton} ${
          currentPurpose === 'login' ? styles.underlined : ''
        }`}
        onClick={() => onPurposeSwitch('login')}
      >
        Login
      </button>
      <button
        className={`${styles.purposeSwitcherButton} ${
          currentPurpose === 'register' ? styles.underlined : ''
        }`}
        onClick={() => onPurposeSwitch('register')}
      >
        Register
      </button>
    </div>
  );
};

const RegisterForm: React.FC = () => {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.registerForm} onSubmit={onFormSubmit}>
      <label className={styles.registerFormLabel}>
        <span>Email</span>
        <input type="text" className={styles.registerFormInput} />
      </label>
      <label className={styles.registerFormLabel}>
        <span>Password</span>
        <input type="password" className={styles.registerFormInput} />
      </label>
      <label className={styles.registerFormLabel}>
        <span>Confirm password</span>
        <input type="password" className={styles.registerFormInput} />
      </label>

      <button type="submit" className={styles.registerFormSubmitButton}>
        Register
      </button>
    </form>
  );
};

const LoginForm: React.FC = () => {
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form className={styles.registerForm} onSubmit={onFormSubmit}>
      <label className={styles.registerFormLabel}>
        <span>Email</span>
        <input type="text" className={styles.registerFormInput} />
      </label>
      <label className={styles.registerFormLabel}>
        <span>Password</span>
        <input type="password" className={styles.registerFormInput} />
      </label>

      <button type="submit" className={styles.registerFormSubmitButton}>
        Login
      </button>
    </form>
  );
};

const Login: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalPurpose, setModalPurpose] = useState<ModalPurpose>('login');

  const onModalClose = () => {
    setShowModal(false);
  };

  const onButtonClick = () => {
    setShowModal(true);
  };

  const onPurposeSwitch = (purpose: ModalPurpose) => {
    setModalPurpose(purpose);
  };

  const mainContent =
    modalPurpose === 'login' ? <LoginForm /> : <RegisterForm />;

  return (
    <>
      <button onClick={onButtonClick} className={styles.loginButton}>
        Login
      </button>
      {showModal ? (
        <Modal
          headerContent={
            <PurposeSwitcher
              currentPurpose={modalPurpose}
              onPurposeSwitch={onPurposeSwitch}
            />
          }
          mainContent={mainContent}
          onClose={onModalClose}
        />
      ) : null}
    </>
  );
};

export { Login };
