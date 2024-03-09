import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { AuthError, AuthRequest, useLoginMutation, useRegisterMutation } from '@/store/api/slice';
import { selectShowLogin } from '@/store/auth/selectors';
import { setShowLogin, setUser } from '@/store/auth/slice';
import { Button, Modal, PasswordInput, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RiErrorWarningLine, RiEyeLine, RiEyeOffLine, RiKeyLine, RiMailLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styles from '../styles/LoginModal.module.css';

export default function LoginModal() {
  const dispatch = useAppDispatch();
  const showLogin = useSelector(selectShowLogin);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();
  useAuth();
  useDisclosure(false);

  const [authRequest, setAuthRequest] = useState<AuthRequest>({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string | null>();

  function closeModal() {
    dispatch(setShowLogin(false));
  }

  async function handleLogin() {
    try {
      const { user } = await login(authRequest).unwrap();
      dispatch(setUser(user));
      dispatch(setShowLogin(false));
    } catch (error) {
      const loginError = error as AuthError;
      console.log('loginError', loginError);
      if (loginError.message === 'Invalid login credentials') {
        setErrorMessage('Unrecognized email or password.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  }

  async function handleRegister() {
    try {
      const { user } = await register(authRequest).unwrap();
      console.log(user);
      // dispatch(setUser(user));
      // dispatch(setShowLogin(false));
    } catch (error) {
      const registerError = error as AuthError;
      console.log('registerError', registerError);
      if (registerError.message === 'Invalid login credentials') {
        setErrorMessage('Unrecognized email or password.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
    }
  }

  function handleChange({ target: { name, value } }: ChangeEvent<HTMLInputElement>) {
    setErrorMessage(null);
    setAuthRequest((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const submitEvent = e.nativeEvent as SubmitEvent;
    const submitter = submitEvent.submitter as HTMLButtonElement;

    if (submitter.name === 'register-button') {
      handleRegister();
    } else {
      handleLogin();
    }
  }

  return (
    <Modal
      classNames={{ title: styles.title, close: styles.close }}
      opened={showLogin}
      onClose={closeModal}
      title="Log In"
      returnFocus={false}
      centered
    >
      <div className={styles.wrapper}>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-wrapper']}>
            <TextInput
              name="email"
              leftSection={<RiMailLine size="1.5rem" />}
              leftSectionPointerEvents="none"
              className={styles.input}
              placeholder="Email"
              size="md"
              data-autofocus
              required
              onChange={handleChange}
            />
            <PasswordInput
              name="password"
              leftSection={<RiKeyLine size="1.5rem" />}
              leftSectionPointerEvents="none"
              className={styles.input}
              placeholder="Password"
              size="md"
              visibilityToggleIcon={toggleIcon}
              required
              onChange={handleChange}
            />
          </div>
          {errorMessage && (
            <div className={styles.error}>
              <RiErrorWarningLine size="1.5rem" />
              <span>{errorMessage}</span>
            </div>
          )}
          <div className={styles['button-wrapper']}>
            <Button
              type="submit"
              name="login-button"
              classNames={{ label: styles['button-label'] }}
              color="orange.4"
              size="md"
              loading={isLoginLoading}
            >
              Log In
            </Button>
            <div className={styles.or}> - or -</div>
            <Button
              type="submit"
              name="register-button"
              classNames={{ label: styles['button-label'] }}
              variant="outline"
              color="dark"
              size="md"
              loading={isRegisterLoading}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

function toggleIcon({ reveal }: { reveal: boolean }) {
  return reveal ? <RiEyeOffLine size="1.5rem" /> : <RiEyeLine size="1.5rem" />;
}
