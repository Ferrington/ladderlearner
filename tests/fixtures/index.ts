import { test as baseTest } from '@playwright/test';
import { TagManagerFeature } from './tag-manager-feature';

type MyFixtures = {
  tagManager: TagManagerFeature;
};

export const test = baseTest.extend<MyFixtures>({
  async tagManager({ page }, use) {
    const tagManager = new TagManagerFeature(page);
    await tagManager.goto();

    await use(tagManager);

    await tagManager.deleteAllTags();
  },
});

export { expect } from '@playwright/test';
