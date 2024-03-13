import FeedbackMessage from '@/base/components/FeedbackMessage';
import { authError } from '@/base/utils/authError';
import { supabase } from '@/config/supabase';
import { useDeleteAccountMutation } from '@/store/api/slice';
import { Button } from '@mantine/core';
import { AuthError, User } from '@supabase/supabase-js';
import { FormEvent, useState } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
import styles from '../styles/AccountManager.module.css';

type Props = {
  user: User | null | undefined;
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
  open: () => void;
  close: () => void;
};

export default function DeleteAccount({ setModalTitle, setModalContent, open, close }: Props) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  function confirmDelete(e: FormEvent) {
    e.preventDefault();

    openModal();
  }

  function openModal() {
    setModalTitle('Confirm Account Deletion');
    setModalContent(
      <div>
        <p>
          Are you sure you want to delete your account? You will lose your routines and exercise
          progress.
        </p>
        <div className={styles['push-right']}>
          <Button
            classNames={{ label: styles['button-label'] }}
            color="red"
            onClick={deleteAccountHandler}
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

  async function deleteAccountHandler() {
    try {
      await deleteAccount().unwrap();
      await supabase.auth.signOut();
    } catch (error) {
      const deleteAccountError = error as AuthError;
      setErrorMessage(authError(deleteAccountError.message));
    } finally {
      close();
    }
  }

  return (
    <form onSubmit={confirmDelete} onChange={() => setErrorMessage(null)}>
      <Button
        type="submit"
        classNames={{ label: styles['button-label'] }}
        color="red"
        leftSection={<RiErrorWarningLine color="black" size="1.5rem" />}
        loading={isLoading}
        className={styles['margin-top']}
      >
        Delete Account
      </Button>
      <FeedbackMessage type="error" message={errorMessage} />
    </form>
  );
}
