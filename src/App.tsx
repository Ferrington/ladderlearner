import styles from '@/App.module.css';
import '@/assets/base.css';
import Workspace from '@/base/components/Workspace';
import WorkspaceDndWrapper from '@/base/components/WorkspaceDndWrapper';
import { joyrideLocale, joyrideStyles, steps } from '@/config/onboarding';
import TagManager from '@/features/TagManager/components/TagManager';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import Joyride, { CallBackProps } from 'react-joyride';

export default function App() {
  // const [{ run, stepIndex, steps }, setState] = useState<JoyrideState>(initialJoyrideState);

  function joyride(data: CallBackProps) {
    console.log(data);
  }

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
        run={false}
        steps={steps}
        continuous={true}
        disableCloseOnEsc={true}
        disableOverlayClose={true}
        hideCloseButton={true}
        showSkipButton={true}
        showProgress={true}
        callback={joyride}
        styles={joyrideStyles}
        locale={joyrideLocale}
      />
    </div>
  );
}
