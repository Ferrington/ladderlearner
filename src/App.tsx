import styles from '@/App.module.css';
import '@/assets/base.css';
import Workspace from '@/base/components/Workspace';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import TagManager from './features/TagManager/components/TagManager';

export default function App() {
  return (
    <div className={styles['app-container']}>
      <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
        <div className={styles['logo-corner']}>
          <img
            className={styles['site-logo']}
            src="/logo.svg"
            alt="Ladder Learner Logo"
            width={160}
          />
        </div>
        <div className={styles['workspace']}>
          <Workspace />
        </div>
        <TagManager />
      </MantineProvider>
    </div>
  );
}
