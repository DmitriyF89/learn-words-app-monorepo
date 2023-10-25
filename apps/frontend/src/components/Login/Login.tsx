'use client';
import { useState } from 'react';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useDispatch } from 'react-redux';
import { TextField } from '@mui/material';

import { User } from '@backend/entities';

import { Modal } from '../Modal';
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from '../../services/api/apiService';
import { setUserId } from '../../stores/authSlice';

import styles from './styles.module.scss';
import { Button } from '../Button';

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

const RegisterForm: React.FC<{ onRegister: () => void }> = ({ onRegister }) => {
  const [register, { isError }] = useRegisterUserMutation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validate={(values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};

        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 4) {
          errors.password =
            'Password length has to be at least 4 characters long';
        }

        if (!values.confirmPassword) {
          errors.confirmPassword = 'Confirm password is required';
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
        }

        return errors;
      }}
      onSubmit={async (values) => {
        const user = await register(values);

        if (isError) {
          alert('Error while login');
        } else {
          const id = (user as unknown as { data: User }).data.id;

          dispatch(setUserId({ id }));

          onRegister();
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.registerForm}>
          <Field type="email" name="email" className={styles.registerFormInput}>
            {({ field, meta: { error, touched } }: FieldProps) => (
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                autoComplete="off"
                error={!!error && touched}
                helperText={error}
                {...field}
              />
            )}
          </Field>
          <Field
            type="password"
            name="password"
            className={styles.registerFormInput}
          >
            {({ field, meta: { error, touched } }: FieldProps) => (
              <TextField
                label="Password"
                variant="standard"
                fullWidth
                autoComplete="off"
                error={!!error && touched}
                helperText={error}
                type="password"
                {...field}
              />
            )}
          </Field>
          <Field
            type="password"
            name="confirmPassword"
            className={styles.registerFormInput}
          >
            {({ field, meta: { error, touched } }: FieldProps) => (
              <TextField
                label="Confirm password"
                variant="standard"
                fullWidth
                autoComplete="off"
                error={!!error && touched}
                helperText={error}
                type="password"
                {...field}
              />
            )}
          </Field>
          <Button type="submit" disabled={isSubmitting} fullWidth={false}>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const LoginForm: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [loginUser, { isError }] = useLoginUserMutation();
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnBlur
      onSubmit={async (values) => {
        const user = await loginUser(values);

        if (isError) {
          alert('Error while login');
        } else {
          const id = (user as unknown as { data: User }).data.id;

          dispatch(setUserId({ id }));
        }

        onLogin();
      }}
      validate={(values) => {
        const errors: Partial<Record<keyof typeof values, string>> = {};

        if (!values.email) {
          errors.email = 'Email is required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        } else if (values.password.length < 4) {
          errors.password =
            'Password length has to be at least 4 characters long';
        }

        return errors;
      }}
    >
      {({ isSubmitting, isValid }) => (
        <Form className={styles.registerForm}>
          <Field type="email" name="email" className={styles.registerFormInput}>
            {({ field, meta: { error, touched } }: FieldProps) => (
              <TextField
                label="Email"
                variant="standard"
                fullWidth
                autoComplete="off"
                error={touched && !!error}
                helperText={error}
                {...field}
              />
            )}
          </Field>
          <Field
            type="password"
            name="password"
            className={styles.registerFormInput}
          >
            {({ field, meta: { error }, form }: FieldProps) => (
              <TextField
                label="Password"
                variant="standard"
                fullWidth
                autoComplete="off"
                error={form.touched.password && !!form.errors.password}
                helperText={error}
                type="password"
                {...field}
              />
            )}
          </Field>
          <Button
            type="submit"
            className={styles.registerFormSubmitButton}
            disabled={isSubmitting || !isValid}
          >
            Login
          </Button>
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
      <RegisterForm onRegister={onModalClose} />
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
