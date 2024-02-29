import { useExampleTab } from '@/features/InstructionPalette/hooks/useExampleTab';
import { Button, Modal } from '@mantine/core';
import styles from '../styles/ExampleTab.module.css';

export default function ExampleTab() {
  const { runSimulation, opened, openModal, close, proceed, modalMessage } = useExampleTab();

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
