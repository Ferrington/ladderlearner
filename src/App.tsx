import styles from '@/App.module.css';
import '@/assets/base.css';
import LoginModal from '@/base/components/LoginModal';
import Workspace from '@/base/components/Workspace';
import WorkspaceDndWrapper from '@/base/components/WorkspaceDndWrapper';
import {
  joyrideCallback,
  joyrideLocale,
  joyrideStyles,
  onboardingComplete,
  steps,
} from '@/config/onboarding';
import { supabase } from '@/config/supabase';
import RoutineManager from '@/features/RoutineManager/components/RoutineManager';
import TagManager from '@/features/TagManager/components/TagManager';
import { useAppDispatch } from '@/store';
import { setUser } from '@/store/auth/slice';
import { MantineProvider, Tabs } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect } from 'react';
import Joyride from 'react-joyride';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      dispatch(setUser(session?.user ?? null));
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setUser(session?.user ?? null));
    });
  }, [dispatch]);

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
          <div className={styles['left-panel']}>
            <Tabs
              classNames={{
                root: styles['mantine-root'],
                panel: styles['mantine-tabspanel'],
                list: styles['mantine-tabslist'],
              }}
              color="orange.4"
              defaultValue="TagManager"
              inverted
            >
              <Tabs.Panel value="TagManager">
                <TagManager />
              </Tabs.Panel>
              <Tabs.Panel value="RoutineManager">
                <RoutineManager />
              </Tabs.Panel>

              <Tabs.List grow>
                <Tabs.Tab value="TagManager">Tags</Tabs.Tab>
                <Tabs.Tab value="RoutineManager">Routines</Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </div>
          <LoginModal />
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
