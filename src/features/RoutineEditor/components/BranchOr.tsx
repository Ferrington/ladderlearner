import BranchAnd from '@/features/RoutineEditor/components/BranchAnd';
import RungLine from '@/features/RoutineEditor/components/RungLine';
import { store } from '@/store';
import { selectBranchChildren } from '@/store/routine/routineSelectors';
import clsx from 'clsx';
import { CSSProperties, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/BranchOr.module.css';

interface CSSPropertiesWithVars extends CSSProperties {
  '--line-height': string;
}

type Props = {
  branchId: string;
  destructive: boolean;
  children?: ReactNode;
};

export default function BranchOr({ branchId, destructive, children: componentChildren }: Props) {
  const [orHeight, setOrHeight] = useState(0);
  const orRef = useRef<HTMLDivElement>(null);
  const [heightAdjust, setHeightAdjust] = useState(false);

  store.subscribe(() => {
    setHeightAdjust(!heightAdjust);
  });

  const children = useSelector(selectBranchChildren(branchId));

  useLayoutEffect(() => {
    if (!orRef.current) return;

    const children = orRef.current.querySelectorAll<HTMLDivElement>(
      `:scope > .rung--branch:not(.last-branch)`,
    );
    const height = [...children].reduce((sum, child) => sum + child.offsetHeight, 0);
    console.log(height);
    setOrHeight(height);
  }, [heightAdjust]);

  return (
    <div
      ref={orRef}
      className={clsx(styles.or, { [styles['destructive']]: destructive })}
      style={{ '--line-height': `${orHeight}px` } as CSSPropertiesWithVars}
    >
      {/* <InstructionDropArea parent={parent.id} index={parent.children.indexOf(branchId)} /> */}
      {children.map((ele, i) => {
        if (ele.type !== 'AND') throw new Error(`Unexpected child of BranchOr: ${branchId}`);

        return (
          <div
            key={ele.id}
            className={clsx(styles.branch, 'rung--branch', {
              'last-branch': i === children.length - 1,
            })}
          >
            {i > 0 && <RungLine branch={ele} />}
            <div className={styles['instruction-wrapper']}>
              <BranchAnd key={ele.id} branchId={ele.id} />
              {/* <InstructionDropArea parent={ele.id} index={ele.children.length} /> */}
            </div>
          </div>
        );
      })}
      {componentChildren}
    </div>
  );
}
