import NoMatch from '@/base/components/NoMatch';
import RequireAuth from '@/base/components/RequireAuth';
import AboutPage from '@/features/AboutPage/AboutPage';
import AccountManager from '@/features/AccountManager/components/AccountManager';
import InstructionPalette from '@/features/InstructionPalette/components/InstructionPalette';
import RoutineEditor from '@/features/RoutineEditor/components/RoutineEditor';
import { useAuth } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store';
import { setShowLogin } from '@/store/auth/slice';
import { RiAccountBoxLine, RiBookOpenLine, RiInformationLine } from 'react-icons/ri';
import { NavLink, Route, Routes } from 'react-router-dom';
import styles from '../styles/Workspace.module.css';

export default function Workspace() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  return (
    <div className={styles['route-wrapper']}>
      <Routes>
        <Route path="*" element={<NoMatch />} />
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
        <Route
          path="/account"
          element={
            <RequireAuth>
              <AccountManager />
            </RequireAuth>
          }
        />
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
          <li>
            {user != null ? (
              <NavLink to="/account">
                <RiAccountBoxLine size="1.25em" />
                Account
              </NavLink>
            ) : (
              <span onClick={() => dispatch(setShowLogin(true))}>
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
