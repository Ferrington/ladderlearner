import Rung from '@/features/RoutineEditor/components/Rung';

type Props = {
  rungId: string;
  rungNumber: number;
};

export default function RungDragOverlay({ rungId, rungNumber }: Props) {
  return (
    <div>
      <Rung
        rungId={rungId}
        rungNumber={rungNumber}
        // beingDragged={beingDragged}
        // dragAttributes={attributes}
        // dragListeners={listeners}
      />
    </div>
  );
}
