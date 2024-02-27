import BitTab from '@/features/InstructionPalette/components/BitTab';
import CompareTab from '@/features/InstructionPalette/components/CompareTab';
import CountTimeTab from '@/features/InstructionPalette/components/CountTimeTab';
import ExampleTab from '@/features/InstructionPalette/components/ExampleTab';
import InstructionSpecialPrimitive from '@/features/InstructionPalette/components/InstructionSpecialPrimitive';
import MathTab from '@/features/InstructionPalette/components/MathTab';
import PrimSpecialDragWrapper from '@/features/InstructionPalette/components/PrimSpecialDragWrapper';
import { useDroppable } from '@dnd-kit/core';
import { Tabs } from '@mantine/core';
import styles from '../styles/InstructionPalette.module.css';

const TABS = ['Bit', 'Compare', 'Math', 'Count/Time', 'Examples'] as const;

const rungsAndBranches = ['Rung', 'Branch', 'Branch Level'];

export default function InstructionPalette() {
  const { setNodeRef } = useDroppable({
    id: 'instruction-palette',
  });

  return (
    <aside
      id="instruction-palette"
      ref={setNodeRef}
      className={styles['instruction-palette-container']}
    >
      <div>
        <Tabs
          color="orange.4"
          defaultValue="Bit"
          classNames={{ panel: styles.panel, list: styles.tabslist }}
        >
          <Tabs.List justify="center">
            {TABS.map((tab) => (
              <Tabs.Tab key={tab} value={tab} data-onboardingid="instruction-palette-tab">
                {tab}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="Bit">
            <BitTab />
          </Tabs.Panel>

          <Tabs.Panel value="Compare">
            <CompareTab />
          </Tabs.Panel>

          <Tabs.Panel value="Math">
            <MathTab />
          </Tabs.Panel>

          <Tabs.Panel value="Count/Time">
            <CountTimeTab />
          </Tabs.Panel>

          <Tabs.Panel value="Examples">
            <ExampleTab />
          </Tabs.Panel>
        </Tabs>
      </div>
      <div className={styles['rungs-branches']}>
        {rungsAndBranches.map((instruction) => {
          const dragOverlay = <InstructionSpecialPrimitive abbreviation={instruction} />;

          return (
            <PrimSpecialDragWrapper
              key={instruction}
              abbreviation={instruction}
              dragOverlay={dragOverlay}
            >
              <InstructionSpecialPrimitive key={instruction} abbreviation={instruction} />
            </PrimSpecialDragWrapper>
          );
        })}
      </div>
    </aside>
  );
}
