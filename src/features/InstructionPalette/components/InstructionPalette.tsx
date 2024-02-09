import BitTab from '@/features/InstructionPalette/components/BitTab';
import InstructionSpecialPrimitive from '@/features/InstructionPalette/components/InstructionSpecialPrimitive';
import { useDroppable } from '@dnd-kit/core';
import { Tabs } from '@mantine/core';
import styles from '../styles/InstructionPalette.module.css';

const TABS = ['Bit', 'Compare', 'Math', 'Count/Time', 'Examples'] as const;

const rungsAndBranches = ['Rung', 'Branch', 'Branch Level'];

export default function InstructionPalette() {
  const { setNodeRef } = useDroppable({
    id: 'instructionPalette',
    // disabled: whichDraggingRung != null,
  });

  return (
    <aside className={styles['instruction-palette-container']}>
      <div ref={setNodeRef}>
        <Tabs
          color="orange.4"
          defaultValue="Bit"
          classNames={{ panel: styles.panel, list: styles.tabslist }}
        >
          <Tabs.List justify="center">
            {TABS.map((tab) => (
              <Tabs.Tab key={tab} value={tab}>
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="Bit">
            <BitTab />
          </Tabs.Panel>

          <Tabs.Panel value="Compare">
            {/* <CompareTab /> */}
            Compare
          </Tabs.Panel>

          <Tabs.Panel value="Math">
            {/* <MathTab /> */}
            Math
          </Tabs.Panel>

          <Tabs.Panel value="Count/Time">
            {/* <TimeCountTab /> */}
            TimeCount
          </Tabs.Panel>

          <Tabs.Panel value="Examples">
            Examples
            {/* <ExampleTab /> */}
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className={styles['rungs-branches']}>
        {rungsAndBranches.map((instruction) => {
          // const dragOverlay = <InstructionSpecialPrimitive instructionId={instruction} />;

          return (
            // <PrimSpecialDragWrapper
            //   key={instruction}
            //   instructionId={instruction}
            //   dragOverlay={dragOverlay}
            // >
            <InstructionSpecialPrimitive key={instruction} instructionId={instruction} />
            // </PrimSpecialDragWrapper>
          );
        })}
      </div>
    </aside>
  );
}
