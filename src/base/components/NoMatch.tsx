import { RiErrorWarningLine } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';
import styles from '../styles/NoMatch.module.css';

export default function NoMatch() {
  return (
    <div className={styles.wrapper}>
      <RiErrorWarningLine size="3rem" />
      <div>You appear to be lost!</div>
      <NavLink to="/">Return to safety</NavLink>
    </div>
  );
}
