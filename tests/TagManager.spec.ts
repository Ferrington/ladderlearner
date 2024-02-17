import { expect, test } from './fixtures';

test.describe('TagManager', () => {
  test('can reorder tags', async ({ tagManager, page }) => {
    await tagManager.addTag('Start', 'Boolean');
    await tagManager.addTag('Stop', 'Boolean');

    const tagRows = await page.getByTestId('tag-row').all();
    expect(tagRows).toHaveLength(2);
    expect(tagRows[0]).toContainText('Start');

    await page.getByRole('button', { name: 'Start False' }).hover();
    await page.getByRole('button', { name: 'Start False' }).getByTestId('drag-handle').hover();
    await page.mouse.down();
    await page.getByRole('button', { name: 'Stop False' }).hover();
    await page.mouse.up();

    // have to wait for sortable to delete drag overlay
    await page.waitForTimeout(300);

    const postTagRows = await page.getByTestId('tag-row').all();
    expect(postTagRows).toHaveLength(2);
    expect(postTagRows[0]).toContainText('Stop');
  });
});
