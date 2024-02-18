import { MILLISECONDS_PER_CYCLE } from '@/config/constants';
import { useAppDispatch } from '@/store';
import { selectMainBranches } from '@/store/routine/selectors';
import { simulateRungAction } from '@/store/thunks/simulateRungAction';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Simulation() {
  const dispatch = useAppDispatch();
  const mainBranchIds = useSelector(selectMainBranches);

  useEffect(() => {
    const intervalId = setInterval(simulateRungs, MILLISECONDS_PER_CYCLE);

    function simulateRungs() {
      console.log('simulating');
      mainBranchIds.forEach((branchId) => dispatch(simulateRungAction(branchId)));
    }

    return () => {
      console.log('clean');
      console.log(intervalId);
      clearInterval(intervalId);
    };
  }, [dispatch, mainBranchIds]);

  return null;
}
