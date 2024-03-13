import { supabase } from '@/config/supabase';
import ChangeEmailForm from '@/features/AccountManager/components/ChangeEmailForm';
import ChangePasswordForm from '@/features/AccountManager/components/ChangePasswordForm';
import DeleteAccount from '@/features/AccountManager/components/DeleteAccount';
import { useAuth } from '@/hooks/useAuth';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { RiLogoutBoxRLine } from 'react-icons/ri';
import styles from '../styles/AccountManager.module.css';

export default function AccountManager() {
  const { user } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);

  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);

  return (
    <main className={styles.wrapper}>
      <h1>Account Manager</h1>
      <div className={styles['section-wrapper']}>
        <section className={styles.section}>
          <h2>Account Information</h2>
          <div className={styles['form-wrapper']}>
            <ChangeEmailForm
              user={user}
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              open={open}
              close={close}
            />
            <ChangePasswordForm
              setModalTitle={setModalTitle}
              setModalContent={setModalContent}
              open={open}
              close={close}
            />
          </div>
        </section>
        <section className={styles.section}>
          <h2>Log Out</h2>
          <Button
            classNames={{ label: styles['button-label'] }}
            color="orange.4"
            onClick={() => supabase.auth.signOut()}
            leftSection={<RiLogoutBoxRLine color="black" size="1.5rem" />}
          >
            Log Out
          </Button>
        </section>
        <section className={styles.section}>
          <h2 className={styles.warning}>Delete Account</h2>
          <DeleteAccount
            user={user}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            open={open}
            close={close}
          />
        </section>
      </div>
      <Modal opened={opened} onClose={close} title={modalTitle}>
        {modalContent}
      </Modal>
    </main>
  );
}
