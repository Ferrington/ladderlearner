import FeedbackMessage from '@/base/components/FeedbackMessage';
import { authError } from '@/base/utils/authError';
import { useChangeEmailMutation } from '@/store/api/slice';
import { Button, TextInput } from '@mantine/core';
import { AuthError, User } from '@supabase/supabase-js';
import { ChangeEvent, FormEvent, useState } from 'react';
import { RiMailLine } from 'react-icons/ri';
import styles from '../styles/AccountManager.module.css';

type Props = {
  user: User | null | undefined;
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
  open: () => void;
  close: () => void;
};

export default function ChangeEmailForm({
  user,
  setModalTitle,
  setModalContent,
  open,
  close,
}: Props) {
  const [email, setEmail] = useState(user?.email || '');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  function confirmEmail(e: FormEvent) {
    e.preventDefault();

    if (email === user?.email) {
      setErrorMessage('You must enter a new email address.');
      return;
    }

    setModalTitle('Confirm Email Change');
    setModalContent(
      <div>
        <p>Are you sure you want to change your email address?</p>
        <div className={styles['push-right']}>
          <Button
            classNames={{ label: styles['button-label'] }}
            color="orange.4"
            onClick={changeEmailHandler}
          >
            Confirm
          </Button>
          <Button
            classNames={{ label: styles['button-label'] }}
            variant="outline"
            color="dark"
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </div>,
    );
    open();
  }

  async function changeEmailHandler() {
    try {
      await changeEmail(email).unwrap();
      setSuccessMessage(
        'Email address updated. You need to verify your new email address before using it to log in.',
      );
    } catch (error) {
      const emailChangeError = error as AuthError;
      setErrorMessage(authError(emailChangeError.message));
    } finally {
      close();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMessage(null);
    setEmail(e.target.value);
  }

  return (
    <form onSubmit={confirmEmail}>
      <h3>Change Email Address</h3>
      <TextInput
        name="email"
        placeholder="Email"
        leftSection={<RiMailLine color="black" size="1.5rem" />}
        value={email}
        autoComplete="none"
        onChange={handleChange}
        required
      />
      <Button
        type="submit"
        classNames={{ label: styles['button-label'] }}
        color="orange.4"
        loading={isLoading}
        className={styles['margin-top']}
      >
        Update Email
      </Button>
      <FeedbackMessage type="error" message={errorMessage} />
      <FeedbackMessage type="success" message={successMessage} />
    </form>
  );
}
