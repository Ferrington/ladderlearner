import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import styles from '../styles/ExampleTab.module.css';

const loadSample = async (sampleName: string) => {
  sampleName;
  // let importedState;
  // if (sampleName === "motor") {
  //   const { state } = await import("store/preMadeStates/motor");
  //   importedState = state;
  // } else if (sampleName === "trafficLight") {
  //   const { state } = await import("store/preMadeStates/trafficLight");
  //   importedState = state;
  // } else if (sampleName === "widgets") {
  //   const { state } = await import("store/preMadeStates/widgets");
  //   importedState = state;
  // } else if (sampleName === "emptyState") {
  //   const { state } = await import("store/preMadeStates/emptyState");
  //   importedState = state;
  // } else {
  //   return;
  // }
  // const nextState = cloneDeep(importedState);
  // store.routine = nextState.routine as RoutineSlice;
  // store.tags = nextState.tags as TagSlice;
  // window.dispatchEvent(new Event("resize"));
};

export default function ExampleTab() {
  const [opened, { open, close }] = useDisclosure(false);
  const [sampleName, setSampleName] = useState<string>('emptyState');
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (caller: string) => {
    if (caller === 'emptyState') setModalMessage('Clearing the routine will discard your work.');
    else setModalMessage('Loading this sample routine will discard your work.');

    setSampleName(caller);
    open();
  };

  const proceed = () => {
    loadSample(sampleName);
    close();
  };

  return (
    <>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('motor')}
        // disabled={runSimulation}
      >
        Motor
      </Button>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('trafficLight')}
        // disabled={runSimulation}
      >
        Traffic Light
      </Button>
      <Button
        classNames={{ label: styles.label }}
        variant="outline"
        color="dark"
        onClick={() => openModal('widgets')}
        // disabled={runSimulation}
      >
        Widgets
      </Button>
      <Button
        classNames={{ label: styles.label }}
        color="orange.4"
        onClick={() => openModal('emptyState')}
        // disabled={runSimulation}
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
          <Button color="orange.4" onClick={proceed}>
            Proceed
          </Button>
          <Button variant="outline" color="dark" onClick={close}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
}
