import AboutPage from '@/features/AboutPage/AboutPage';
// import InstructionPalette from '@/features/InstructionPalette/components/InstructionPalette';
import RoutineEditor from '@/features/RoutineEditor/components/RoutineEditor';
import styles from '../styles/Workspace.module.css';
// import { Tabs } from '@mantine/core';
// import { RiInformationLine } from 'react-icons/ri';
import InstructionPalette from '@/features/InstructionPalette/components/InstructionPalette';
import { NavLink, Route, Routes } from 'react-router-dom';

export default function Workspace() {
  return (
    <div className={styles['route-wrapper']}>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles['routine-editor-wrapper']}>
              <InstructionPalette />
              <RoutineEditor />
            </div>
          }
        />
        <Route path="/exercises" element={<div>Exercises</div>} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <nav className={styles.nav}>
        <ul className={styles['nav-list']}>
          <li>
            <NavLink to="/">
              <img src="imgs/ladder.svg" alt="Ladder Icon" width={10} />
              Sandbox
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/exercises">Exercises</NavLink>
          </li> */}
          <li className={styles['push-right']}>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
