import BranchAnd from '@/features/RoutineEditor/components/BranchAnd';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import RungLine from '@/features/RoutineEditor/components/RungLine';
import { useBranchOr } from '@/features/RoutineEditor/hooks/useBranchOr';
import clsx from 'clsx';
import { CSSProperties, ReactNode, memo } from 'react';
import styles from '../styles/BranchOr.module.css';

interface CSSPropertiesWithVars extends CSSProperties {
  '--line-height': string;
}

type Props = {
  branchId: string;
  destructive: boolean;
  children?: ReactNode;
};

const BranchOr = memo(function BranchOr({
  branchId,
  destructive,
  children: componentChildren,
}: Props) {
  const { orRef, children, parent, orHeight } = useBranchOr(branchId);

  return (
    <div
      ref={orRef}
      className={clsx(styles.or, { [styles['destructive']]: destructive })}
      style={{ '--line-height': `${orHeight}px` } as CSSPropertiesWithVars}
    >
      <InstructionDropArea parent={parent.id} index={parent.children.indexOf(branchId)} />
      {children.map((ele, i) => {
        if (ele.type !== 'AND') throw new Error(`Unexpected child of BranchOr: ${branchId}`);

        return (
          <div
            key={ele.id}
            className={clsx(styles.branch, 'rung--branch', {
              'last-branch': i === children.length - 1,
            })}
            data-testid="rung-branch"
          >
            {i > 0 && <RungLine branch={ele} />}
            <div className={styles['instruction-wrapper']}>
              <BranchAnd key={ele.id} branchId={ele.id} />
              <InstructionDropArea parent={ele.id} index={ele.children.length} />
            </div>
          </div>
        );
      })}
      {componentChildren}
    </div>
  );
});

export default BranchOr;
