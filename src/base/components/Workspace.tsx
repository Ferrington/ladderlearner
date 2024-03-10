import { supabase } from '@/config/supabase';
import AboutPage from '@/features/AboutPage/AboutPage';
import InstructionPalette from '@/features/InstructionPalette/components/InstructionPalette';
import RoutineEditor from '@/features/RoutineEditor/components/RoutineEditor';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { setShowLogin } from '@/store/auth/slice';
import {
  RiAccountBoxLine,
  RiBookOpenLine,
  RiInformationLine,
  RiLogoutBoxRLine,
} from 'react-icons/ri';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from '../styles/Workspace.module.css';

export default function Workspace() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  async function handleClick() {
    if (user != null) {
      await supabase.auth.signOut();
    } else {
      dispatch(setShowLogin(true));
    }
  }

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
          <li>
            <NavLink to="/exercises">
              <RiBookOpenLine size="1.25em" />
              Exercises
            </NavLink>
          </li>
          <li className={styles['push-right']}>
            <NavLink to="/about">
              <RiInformationLine size="1.25em" />
              About
            </NavLink>
          </li>
          <li onClick={handleClick}>
            {user != null ? (
              <span>
                <RiLogoutBoxRLine size="1.25em" />
                <span className={styles['auth-action-text']}>Log Out</span>
              </span>
            ) : (
              <span>
                <RiAccountBoxLine size="1.25em" />
                <span className={styles['auth-action-text']}>Log In</span>
              </span>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
