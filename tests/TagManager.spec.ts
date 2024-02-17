import { expect, test } from './fixtures';

test.describe('TagManager', () => {
  test('can add tags of all types', async ({ tagManager, page }) => {
    const boolTag = 'bool';
    await tagManager.addTag(boolTag, 'Boolean');
    await expect(page.getByRole('button', { name: boolTag })).toHaveText(/False/);

    const numberTag = 'number';
    await tagManager.addTag(numberTag, 'Number');
    await expect(page.getByRole('button', { name: numberTag })).toHaveText(/0/);

    const counterTag = 'counter';
    await tagManager.addTag(counterTag, 'Counter');
    await expect(page.getByRole('button', { name: counterTag })).toHaveText(/Counter/);

    const timerTag = 'timer';
    await tagManager.addTag(timerTag, 'Timer');
    await expect(page.getByRole('button', { name: timerTag })).toHaveText(/Timer/);
  });

  test('can toggle a boolean tag', async ({ tagManager, page }) => {
    const boolTag = 'bool';
    await tagManager.addTag(boolTag, 'Boolean');
    await page.getByRole('button', { name: boolTag }).getByTestId('tag-row-value').click();
    await expect(page.getByRole('button', { name: boolTag })).toHaveText(/True/);
  });

  test("can edit a tag's value", async ({ tagManager, page }) => {
    const numberTag = 'number';
    await tagManager.addTag(numberTag, 'Number');
    await page.getByRole('button', { name: numberTag }).getByTestId('tag-row-value').click();
    await page.getByRole('button', { name: numberTag }).getByRole('textbox').fill('42');
    await page.keyboard.press('Enter');
    await expect(page.getByRole('button', { name: numberTag })).toHaveText(/42/);
  });

  test('can expand a tag with properties', async ({ tagManager, page }) => {
    const counterTag = 'counter';
    await tagManager.addTag(counterTag, 'Counter');
    await page.getByRole('button', { name: counterTag }).getByTestId('expand-control').click();

    await expect(page.getByText(/\.pre/)).toBeVisible();
    await expect(page.getByText(/\.acc/)).toBeVisible();
    await expect(page.getByText(/\.dn/)).toBeVisible();
  });

  test('can reorder tags', async ({ tagManager, page }) => {
    const tag1 = 'Start';
    const tag2 = 'Stop';

    await tagManager.addTag(tag1, 'Boolean');
    await tagManager.addTag(tag2, 'Boolean');

    const tagRows = await page.getByTestId('tag-row').all();
    expect(tagRows).toHaveLength(2);
    expect(tagRows[0]).toContainText(tag1);

    await page.getByRole('button', { name: tag1 }).hover();
    await page.getByRole('button', { name: tag1 }).getByTestId('drag-handle').hover();
    await page.mouse.down();
    await page.getByRole('button', { name: tag2 }).hover();
    await page.mouse.up();

    // have to wait for sortable to delete drag overlay
    await page.waitForTimeout(300);

    const postTagRows = await page.getByTestId('tag-row').all();
    expect(postTagRows).toHaveLength(2);
    expect(postTagRows[0]).toContainText(tag2);
  });
});
