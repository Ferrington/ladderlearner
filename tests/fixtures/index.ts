import { test as baseTest } from '@playwright/test';
import { RoutineEditorFeature } from './routine-editor-feature';
import { TagManagerFeature } from './tag-manager-feature';

type MyFixtures = {
  tagManager: TagManagerFeature;
  routineEditor: RoutineEditorFeature;
};

export const test = baseTest.extend<MyFixtures>({
  async tagManager({ page }, use) {
    const tagManager = new TagManagerFeature(page);
    await tagManager.goto();

    await use(tagManager);

    await tagManager.deleteAllTags();
  },
  async routineEditor({ page }, use) {
    const routineEditor = new RoutineEditorFeature(page);
    await routineEditor.goto();

    await use(routineEditor);

    await routineEditor.deleteAllRungs();
  },
});

export { expect } from '@playwright/test';
