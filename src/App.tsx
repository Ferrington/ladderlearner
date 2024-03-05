import styles from '@/App.module.css';
import '@/assets/base.css';
import Workspace from '@/base/components/Workspace';
import WorkspaceDndWrapper from '@/base/components/WorkspaceDndWrapper';
import {
  joyrideCallback,
  joyrideLocale,
  joyrideStyles,
  onboardingComplete,
  steps,
} from '@/config/onboarding';
import TagManager from '@/features/TagManager/components/TagManager';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Joyride from 'react-joyride';

export default function App() {
  return (
    <div className={styles['app-container']} id="app">
      <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
        <WorkspaceDndWrapper>
          <div className={styles['logo-corner']} id="logo">
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
        </WorkspaceDndWrapper>
      </MantineProvider>
      <Joyride
        run={!onboardingComplete}
        steps={steps}
        continuous={true}
        disableCloseOnEsc={true}
        disableOverlayClose={true}
        hideCloseButton={true}
        showSkipButton={true}
        showProgress={true}
        styles={joyrideStyles}
        locale={joyrideLocale}
        callback={joyrideCallback}
      />
    </div>
  );
}
