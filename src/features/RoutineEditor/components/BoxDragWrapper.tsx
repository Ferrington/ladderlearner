import clsx from 'clsx';
import { ReactNode } from 'react';
import styles from '../styles/BoxDragWrapper.module.css';

type Props = {
  destructive: boolean;
  children?: ReactNode;
};

export default function BoxDragWrapper({ destructive, children }: Props) {
  return (
    <div className={clsx(styles.wrapper, { [styles.destructive]: destructive })}>{children}</div>
  );
}
