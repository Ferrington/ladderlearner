import FeedbackMessage from '@/base/components/FeedbackMessage';
import { authError } from '@/base/utils/authError';
import { useChangePasswordMutation } from '@/store/api/slice';
import { Button, PasswordInput } from '@mantine/core';
import { AuthError } from '@supabase/supabase-js';
import { FormEvent, useState } from 'react';
import { RiKeyLine } from 'react-icons/ri';
import styles from '../styles/AccountManager.module.css';

type Props = {
  setModalTitle: (title: string) => void;
  setModalContent: (content: React.ReactNode) => void;
  open: () => void;
  close: () => void;
};

export default function ChangePasswordForm({ setModalTitle, setModalContent, open, close }: Props) {
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  function confirmPassword(e: FormEvent) {
    e.preventDefault();

    if (newPassword !== newPasswordConfirm) {
      setErrorMessage('Your passwords do not match.');
      return;
    }

    openModal();
  }

  function openModal() {
    setModalTitle('Confirm Password Change');
    setModalContent(
      <div>
        <p>Are you sure you want to change your password?</p>
        <div className={styles['push-right']}>
          <Button
            classNames={{ label: styles['button-label'] }}
            color="orange.4"
            onClick={changePasswordHandler}
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

  async function changePasswordHandler() {
    try {
      await changePassword(newPassword).unwrap();
      setSuccessMessage('Password updated.');
      setNewPassword('');
      setNewPasswordConfirm('');
    } catch (error) {
      const passwordChangeError = error as AuthError;
      setErrorMessage(authError(passwordChangeError.message));
    } finally {
      close();
    }
  }

  return (
    <form onSubmit={confirmPassword} onChange={() => setErrorMessage(null)}>
      <h3>Change Password</h3>
      <PasswordInput
        name="newPassword"
        placeholder="Password"
        autoComplete="none"
        leftSection={<RiKeyLine color="black" size="1.5rem" />}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <PasswordInput
        name="newPasswordConfirm"
        placeholder="Confirm Password"
        autoComplete="none"
        leftSection={<RiKeyLine color="black" size="1.5rem" />}
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
        required
      />
      <Button
        type="submit"
        classNames={{ label: styles['button-label'] }}
        color="orange.4"
        loading={isLoading}
        className={styles['margin-top']}
      >
        Update Password
      </Button>
      <FeedbackMessage type="error" message={errorMessage} />
      <FeedbackMessage type="success" message={successMessage} />
    </form>
  );
}
