import RungDragOverlay from '@/features/RoutineEditor/components/RungDragOverlay';
import Simulation from '@/features/RoutineEditor/components/Simulation';
import { useAppDispatch } from '@/store';
import { selectRunSimulation, selectTagsAreUnassigned } from '@/store/base/selectors';
import { setRunSimulation } from '@/store/base/slice';
import { selectRungIds } from '@/store/routine/selectors';
import { RiPlayLine, RiStopLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import styles from '../styles/RoutineEditor.module.css';

export default function RoutineEditor() {
  const dispatch = useAppDispatch();
  const runSimulation = useSelector(selectRunSimulation);
  const rungIds = useSelector(selectRungIds);
  const tagsAreUnassigned = useSelector(selectTagsAreUnassigned);

  function toggleSimulation() {
    const setSimulation = !runSimulation && !tagsAreUnassigned;
    dispatch(setRunSimulation(setSimulation));
  }

  return (
    <main className={styles['routine-editor']}>
      <div className={styles['simulation-control-wrapper']}>
        <div
          className={styles['simulation-control-background']}
          onClick={toggleSimulation}
          style={{ background: runSimulation ? '#FF3F3F' : 'lime' }}
        >
          {runSimulation ? (
            <>
              <RiStopLine
                size="1.4em"
                className={styles['stop-simulation']}
                title="Stop Simulation"
              />
              <Simulation />
            </>
          ) : (
            <RiPlayLine
              size="1.4em"
              className={styles['start-simulation']}
              title="Start Simulation"
            />
          )}
        </div>
      </div>
      {rungIds.map((rungId, i) => {
        return <RungDragOverlay key={rungId} rungNumber={i + 1} rungId={rungId} />;
      })}
    </main>
  );
}
