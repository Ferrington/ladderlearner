import BranchAnd from '@/features/RoutineEditor/components/BranchAnd';
import InstructionDropArea from '@/features/RoutineEditor/components/InstructionDropArea';
import RungDropArea from '@/features/RoutineEditor/components/RungDropArea';
import useWindowSize from '@/hooks/useWindowSize';
import { RootState, useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import {
  makeSelectExtraLandingPadLocation,
  selectBranchById,
  selectRungById,
} from '@/store/routine/selectors';
import { deleteRung, editRungComment } from '@/store/routine/slice';
import { Button, Modal, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import clsx from 'clsx';
import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { RiDeleteBinLine, RiFileListLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styles from '../styles/Rung.module.css';

type Props = {
  rungId: string;
  rungNumber: number;
  beingDragged?: boolean;
  dragAttributes?: object;
  dragListeners?: object;
};

const Rung = memo(function Rung({
  rungId,
  rungNumber,
  beingDragged,
  dragAttributes,
  dragListeners,
}: Props) {
  const isNotDragOverlay = dragListeners;

  const [mainRungWidth, setMainRungWidth] = useState(0);
  const [showInteractOutline, setShowInteractOutline] = useState(false);
  const [isDeletable, setIsDeletable] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const dispatch = useAppDispatch();
  const windowSize = useWindowSize();

  const codeRef = useRef<HTMLDivElement>(null);

  const runSimulation = useSelector(selectRunSimulation);
  const rung = useSelector(selectRungById(rungId));
  const child = useSelector(selectBranchById(rung.child));
  const [comment, setComment] = useState(rung.comment ?? '');

  const selectExtraLandingPadLocation = useMemo(makeSelectExtraLandingPadLocation, []);
  const extraLandingPadLoc = useSelector((state: RootState) =>
    selectExtraLandingPadLocation(state, rung.child),
  );

  let cursor;
  if (runSimulation) {
    cursor = 'default';
  } else {
    cursor = isNotDragOverlay ? 'grab' : 'grabbing';
  }

  useLayoutEffect(() => {
    if (codeRef.current != null) setMainRungWidth(codeRef.current.offsetWidth - 30);
  }, [windowSize]);

  function lookClickable() {
    if (runSimulation) return;

    setShowInteractOutline(true);
  }

  function handleMouseOver() {
    if (runSimulation) return;

    setIsDeletable(true);
  }

  function dontLookClickable() {
    setShowInteractOutline(false);
    setIsDeletable(false);
  }

  function handleDelete() {
    if (runSimulation) return;

    dispatch(deleteRung(rung));
  }

  function commitComment() {
    dispatch(editRungComment({ rung, comment }));
    close();
  }

  function closeComment() {
    close();
    setComment(rung.comment ?? '');
  }

  return (
    <div
      className={clsx(styles.rung, { [styles['interact-outline']]: showInteractOutline })}
      data-onboardingid="rung"
      data-testid="rung"
    >
      {rungNumber === 1 && <RungDropArea rungIndex={0} />}
      {isNotDragOverlay && <RungDropArea rungIndex={rungNumber} />}
      <div
        className={styles['rung-number']}
        style={{ cursor, opacity: beingDragged ? 0.5 : 1 }}
        onMouseOver={handleMouseOver}
        onMouseLeave={dontLookClickable}
        {...dragListeners}
        {...dragAttributes}
      >
        {isNotDragOverlay && (
          <>
            <div
              className={clsx(styles['delete'], {
                [styles.deletable]: isDeletable,
              })}
            >
              <RiDeleteBinLine
                className={styles['delete-icon']}
                onMouseOver={lookClickable}
                onMouseLeave={dontLookClickable}
                onClick={handleDelete}
                size="1.25em"
                style={{ background: 'white' }}
                title="Delete Rung"
                data-testid="delete-rung"
              />
            </div>
            <div
              className={clsx(styles['edit-comment'], {
                [styles.deletable]: isDeletable,
              })}
            >
              <RiFileListLine
                className={styles['comment-icon']}
                onClick={open}
                size="1.25em"
                style={{ background: 'white' }}
                title="Edit Comment"
              />
            </div>
          </>
        )}
        {rungNumber}
      </div>
      <div
        className={styles.comment}
        style={{
          whiteSpace: 'pre-wrap',
          paddingTop: rung.comment ? 10 : 0,
          opacity: beingDragged ? 0.5 : 1,
        }}
      >
        {rung.comment}
        <Modal opened={opened} onClose={closeComment} title="Edit Comment">
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.currentTarget.value)}
            data-autofocus
            autosize
          ></Textarea>
          <div
            style={{
              display: 'flex',
              justifyContent: 'right',
              gap: 20,
              marginTop: 20,
            }}
          >
            <Button
              classNames={{ label: styles['button-label'] }}
              color="orange.4"
              onClick={commitComment}
            >
              Proceed
            </Button>
            <Button
              classNames={{ label: styles['button-label'] }}
              variant="outline"
              color="dark"
              onClick={closeComment}
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
      <div className={styles.code} ref={codeRef} style={{ opacity: beingDragged ? 0.5 : 1 }}>
        <div className={styles['main-rung']} style={{ minWidth: `${mainRungWidth}px` }}>
          <div className={styles.line}></div>
          <div className={styles['instruction-wrapper']}>
            {extraLandingPadLoc === 0 && (
              <InstructionDropArea parent={child.id} index={0} extra={extraLandingPadLoc} />
            )}
            <InstructionDropArea parent={child.id} index={child.children.length} />
            <BranchAnd branchId={rung.child} extraLandingPadLoc={extraLandingPadLoc} />
          </div>
        </div>
      </div>
    </div>
  );
});

export default Rung;
