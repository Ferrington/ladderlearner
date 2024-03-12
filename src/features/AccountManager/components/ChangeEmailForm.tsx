import FeedbackMessage from '@/base/components/FeedbackMessage';
import { emailError } from '@/base/utils/emailError';
import { supabase } from '@/config/supabase';
import { useChangeEmailMutation } from '@/store/api/slice';
import { Button, TextInput } from '@mantine/core';
import { AuthError, User } from '@supabase/supabase-js';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/AccountManager.module.css';

type Props = {
  user: User | null;
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changeEmail, { isLoading }] = useChangeEmailMutation();

  const navigate = useNavigate();

  function confirmEmail(e: FormEvent) {
    e.preventDefault();

    if (email === user?.email) {
      setErrorMessage('You must enter a new email address.');
      return;
    }

    setModalTitle('Confirm Email Change');
    setModalContent(
      <div>
        <p>
          Are you sure you want to change your email address? You will be logged out and a new
          confirmation email will be sent to you.
        </p>
        <div className={styles['push-right']}>
          <Button onClick={changeEmailHandler}>Confirm</Button>
        </div>
      </div>,
    );
    open();
  }

  async function changeEmailHandler() {
    try {
      await changeEmail(email).unwrap();
      await supabase.auth.signOut();
      navigate('/');
    } catch (error) {
      const emailChangeError = error as AuthError;
      setErrorMessage(emailError(emailChangeError.message));
      close();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMessage(null);
    setEmail(e.target.value);
  }

  return (
    <form onSubmit={confirmEmail}>
      <h3>Update Email Address</h3>
      <TextInput name="email" required value={email} onChange={handleChange} />
      <FeedbackMessage type="error" message={errorMessage} />
      <Button onClick={confirmEmail} loading={isLoading} className={styles['margin-top']}>
        Update Email
      </Button>
    </form>
  );
}
