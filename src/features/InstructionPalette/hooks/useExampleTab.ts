import { useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import { stateStr as emptyState } from '@/store/premade-states/emptyState';
import { loadStateAction } from '@/store/thunks/loadStateAction';
import { decompressState } from '@/utils/decompressState';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export function useExampleTab() {
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(false);
  const [sampleName, setSampleName] = useState<string>('emptyState');
  const [modalMessage, setModalMessage] = useState('');
  const runSimulation = useSelector(selectRunSimulation);

  function openModal(caller: string) {
    if (caller === 'emptyState') setModalMessage('Clearing the routine will discard your work.');
    else setModalMessage('Loading this sample routine will discard your work.');

    setSampleName(caller);
    open();
  }

  function proceed() {
    loadSample(sampleName);
    close();
  }

  async function loadSample(sampleName: string) {
    let importedState;
    if (sampleName === 'emptyState') {
      importedState = decompressState(emptyState);
    } else if (sampleName === 'motor') {
      const { stateStr } = await import('@/store/premade-states/motor');
      importedState = decompressState(stateStr);
    } else if (sampleName === 'trafficLight') {
      const { stateStr } = await import('@/store/premade-states/trafficLight');
      importedState = decompressState(stateStr);
    } else if (sampleName === 'widgets') {
      const { stateStr } = await import('@/store/premade-states/widgets');
      importedState = decompressState(stateStr);
    } else {
      return;
    }

    const nextState = structuredClone(importedState);
    dispatch(loadStateAction(nextState));
    window.dispatchEvent(new Event('resize'));
  }

  return {
    runSimulation,
    opened,
    openModal,
    close,
    proceed,
    modalMessage,
  };
}
