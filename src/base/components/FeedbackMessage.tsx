import clsx from 'clsx';
import { RiCheckboxCircleLine, RiErrorWarningLine } from 'react-icons/ri';
import styles from '../styles/FeedbackMessage.module.css';

type Props = {
  type: 'error' | 'success';
  message: string | null;
};

export default function FeedbackMessage({ type, message }: Props) {
  return message ? (
    <div
      className={clsx({ [styles.error]: type === 'error', [styles.success]: type === 'success' })}
    >
      <span>
        {type === 'error' ? (
          <RiErrorWarningLine size="1.5rem" />
        ) : (
          <RiCheckboxCircleLine size="1.5rem" />
        )}
      </span>
      <span>{message}</span>
    </div>
  ) : null;
}
