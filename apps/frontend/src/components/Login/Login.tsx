'use client';
import { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Modal } from '../Modal';
import { AuthContext } from '../../contexts/auth/authContext';

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
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      onSubmit={(values) => {
        console.log({ values });
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.registerForm}>
          <label className={styles.registerFormLabel}>
            <span>Email</span>
            <Field
              type="email"
              name="email"
              className={styles.registerFormInput}
            />
          </label>
          <ErrorMessage name="email" component="div" />
          <label className={styles.registerFormLabel}>
            <span>Password</span>
            <Field
              type="password"
              name="password"
              className={styles.registerFormInput}
            />
          </label>
          <ErrorMessage name="password" component="div" />
          <label className={styles.registerFormLabel}>
            <span>Confirm password</span>
            <Field
              type="password"
              name="confirmPassword"
              className={styles.registerFormInput}
            />
          </label>
          <ErrorMessage
            name="confirmPassword"
            component="div"
            className={styles.registerFormInput}
          />
          <button
            type="submit"
            className={styles.registerFormSubmitButton}
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const { setUser } = useContext(AuthContext);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          setUser({});
          onLogin();
        }, 1000);
      }}
    >
      {({ isSubmitting, errors, isValid }) => (
        <Form className={styles.registerForm}>
          <label className={styles.registerFormLabel}>
            <span>Email</span>
            <Field
              name="email"
              type="text"
              className={styles.registerFormInput}
            />
          </label>
          <label className={styles.registerFormLabel}>
            <span>Password</span>
            <Field
              name="password"
              type="password"
              className={styles.registerFormInput}
            />
          </label>

          <button
            type="submit"
            className={styles.registerFormSubmitButton}
            disabled={isSubmitting || !isValid}
          >
            Login
          </button>
        </Form>
      )}
    </Formik>
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
    modalPurpose === 'login' ? (
      <LoginForm onLogin={onModalClose} />
    ) : (
      <RegisterForm />
    );

  return (
    <>
      <div className={styles.loginButtonWrapper}>
        <button onClick={onButtonClick} className={styles.loginButton}>
          Login
        </button>
      </div>
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
