import { AppDispatch, useAppDispatch } from '@/store';
import { selectRunSimulation } from '@/store/base/selectors';
import { state as emptyState } from '@/store/premade-states/emptyState';
import { loadStateAction } from '@/store/thunks/loadStateAction';
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/ExampleTab.module.css';

const loadSample = async (dispatch: AppDispatch, sampleName: string) => {
  sampleName;
  let importedState;
  if (sampleName === 'emptyState') {
    importedState = emptyState;
  } else if (sampleName === 'motor') {
    const { state } = await import('@/store/premade-states/motor');
    importedState = state;
  } else if (sampleName === 'trafficLight') {
    const { state } = await import('@/store/premade-states/trafficLight');
    importedState = state;
  } else if (sampleName === 'widgets') {
    const { state } = await import('@/store/premade-states/widgets');
    importedState = state;
  } else {
    return;
  }

  const nextState = structuredClone(importedState);
  dispatch(loadStateAction(nextState));
  window.dispatchEvent(new Event('resize'));
};

export default function ExampleTab() {
  const [opened, { open, close }] = useDisclosure(false);
  const [sampleName, setSampleName] = useState<string>('emptyState');
  const [modalMessage, setModalMessage] = useState('');
  const runSimulation = useSelector(selectRunSimulation);
  const dispatch = useAppDispatch();

  const openModal = (caller: string) => {
    if (caller === 'emptyState') setModalMessage('Clearing the routine will discard your work.');
    else setModalMessage('Loading this sample routine will discard your work.');

    setSampleName(caller);
    open();
  };

  const proceed = () => {
    loadSample(dispatch, sampleName);
    close();
  };

  return (
    <>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('motor')}
        disabled={runSimulation}
      >
        Motor
      </Button>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('trafficLight')}
        disabled={runSimulation}
      >
        Traffic Light
      </Button>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('widgets')}
        disabled={runSimulation}
      >
        Widgets
      </Button>
      <Button
        classNames={{ label: styles.label }}
        color="orange.4"
        onClick={() => openModal('emptyState')}
        disabled={runSimulation}
      >
        Clear Routine
      </Button>
      <Modal opened={opened} onClose={close} title="Overwrite routine?">
        <p>{modalMessage}</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'right',
            gap: 20,
            marginTop: 20,
          }}
        >
          <Button classNames={{ label: styles.label }} color="orange.4" onClick={proceed}>
            Proceed
          </Button>
          <Button
            classNames={{ label: styles.label }}
            variant="outline"
            color="dark"
            onClick={close}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
