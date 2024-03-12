import { supabase } from '@/config/supabase';
import ChangeEmailForm from '@/features/AccountManager/components/ChangeEmailForm';
import { useAuth } from '@/hooks/useAuth';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
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
          <h2>Profile</h2>
          <ChangeEmailForm
            user={user}
            setModalTitle={setModalTitle}
            setModalContent={setModalContent}
            open={open}
            close={close}
          />
        </section>
        <section className={styles.section}>
          <h2>Log Out</h2>
          <Button onClick={() => supabase.auth.signOut()}>Log Out</Button>
        </section>
        <section className={styles.section}>
          <h2 className={styles.warning}>Delete Account</h2>
          <p className={styles.warning}>
            Warning! This will delete your account and all saved data. Your routines and exercise
            progress will be lost.
          </p>
        </section>
      </div>
      <Modal opened={opened} onClose={close} title={modalTitle}>
        {modalContent}
      </Modal>
    </main>
  );
}
