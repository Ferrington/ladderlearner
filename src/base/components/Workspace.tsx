import AboutPage from '@/features/AboutPage/AboutPage';
import InstructionPalette from '@/features/InstructionPalette/components/InstructionPalette';
import RoutineEditor from '@/features/RoutineEditor/components/RoutineEditor';
import { Tabs } from '@mantine/core';
import { RiInformationLine } from 'react-icons/ri';
import styles from '../styles/Workspace.module.css';

export default function Workspace() {
  return (
    <>
      <Tabs
        classNames={{
          root: styles['mantine-root'],
          list: styles['mantine-tabslist'],
          panel: styles['mantine-tabspanel'],
        }}
        keepMounted={false}
        defaultValue="RoutineEditor"
        color="orange.4"
        inverted
      >
        <Tabs.Panel value="RoutineEditor">
          <div className={styles['routine-editor-wrapper']}>
            <InstructionPalette />
            <RoutineEditor />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="Exercises">
          <div className={styles['routine-editor-wrapper']}>
            <InstructionPalette />
            <RoutineEditor />
          </div>
        </Tabs.Panel>
        <Tabs.Panel value="About">
          <AboutPage />
        </Tabs.Panel>

        <Tabs.List defaultValue="RoutineEditor">
          <Tabs.Tab
            value="RoutineEditor"
            leftSection={<img src="imgs/ladder.svg" alt="Ladder Icon" width={10} />}
          >
            Routine
          </Tabs.Tab>
          {/* <Tabs.Tab value="Exercises" leftSection={<RiBookOpenLine size="1.25em" />}>
            Exercises
          </Tabs.Tab> */}
          <Tabs.Tab value="About" leftSection={<RiInformationLine size="1.25em" />} ml="auto">
            About
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </>
  );
}
