import styles from '@/App.module.css';
import '@/assets/base.css';
import Workspace from '@/base/components/Workspace';
import WorkspaceDndWrapper from '@/base/components/WorkspaceDndWrapper';
import { JoyrideState, initialJoyrideState } from '@/config/onboarding';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useState } from 'react';
import Joyride, { CallBackProps } from 'react-joyride';
import TagManager from './features/TagManager/components/TagManager';

export default function App() {
  const [{ run, stepIndex, steps }, setState] = useState<JoyrideState>(initialJoyrideState);

  function joyride(data: CallBackProps) {
    console.log(data);
  }

  return (
    <div className={styles['app-container']}>
      <MantineProvider theme={{ fontFamily: 'Roboto, sans-serif' }}>
        <WorkspaceDndWrapper>
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
        </WorkspaceDndWrapper>
      </MantineProvider>
      <Joyride
        run={run}
        steps={steps}
        stepIndex={stepIndex}
        showSkipButton={true}
        callback={joyride}
      />
    </div>
  );
}
