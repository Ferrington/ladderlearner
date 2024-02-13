import Rung from '@/features/RoutineEditor/components/Rung';
import { selectDraggingRungIndex, selectRunSimulation } from '@/store/base/selectors';
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';

type Props = {
  rungId: string;
  rungNumber: number;
};

export default function RungDragOverlay({ rungId, rungNumber }: Props) {
  const runSimulation = useSelector(selectRunSimulation);
  const draggingRungIndex = useSelector(selectDraggingRungIndex);
  const beingDragged = draggingRungIndex === rungNumber;

  const dragOverlay = <Rung rungId={rungId} rungNumber={rungNumber} beingDragged={beingDragged} />;
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: rungNumber,
    data: {
      rungNumber,
      dragOverlay,
    },
    disabled: runSimulation,
  });

  return (
    <div ref={setNodeRef}>
      <Rung
        rungId={rungId}
        rungNumber={rungNumber}
        beingDragged={beingDragged}
        dragAttributes={attributes}
        dragListeners={listeners}
      />
    </div>
  );
}
