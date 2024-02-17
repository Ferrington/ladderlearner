import { expect, test } from './fixtures';

test.describe('RoutineEditor', () => {
  test('can add special instruction', async ({ page, routineEditor }) => {
    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'Normally Open Normally Open' }),
    );

    await expect(page.getByRole('button', { name: 'XIC' })).toBeVisible();
  });

  test('can move special instruction', async ({ page, routineEditor }) => {
    await routineEditor.insertIntoFirstRung(page.getByRole('button', { name: 'Rung Rung' }));
    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'Normally Open Normally Open' }),
    );

    await page.getByRole('button', { name: 'XIC' }).hover();
    await page.mouse.down();
    await page.mouse.move(0, 0);
    await page.getByTestId('rung').nth(1).getByTestId('instruction-drop-area').first().hover();
    await page.mouse.up();

    await expect(
      page.getByTestId('rung').nth(1).getByRole('button', { name: 'XIC' }),
    ).toBeVisible();
  });

  test('can add box instruction', async ({ page, routineEditor }) => {
    await page.getByRole('tab', { name: 'Compare' }).click();

    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'A == B Equal A ? B ?' }),
    );

    await expect(page.getByRole('button', { name: /Assign Tag/ })).toBeVisible();
  });

  test('can move box instruction', async ({ page, routineEditor }) => {
    await page.getByRole('tab', { name: 'Compare' }).click();
    await routineEditor.insertIntoFirstRung(page.getByRole('button', { name: 'Rung Rung' }));

    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'A == B Equal A ? B ?' }),
    );

    await page.getByRole('button', { name: /Assign Tag/ }).hover();
    await page.mouse.down();
    await page.mouse.move(0, 0);
    await page.getByTestId('rung').nth(1).getByTestId('instruction-drop-area').first().hover();
    await page.mouse.up();

    await expect(
      page
        .getByTestId('rung')
        .nth(1)
        .getByRole('button', { name: /Assign Tag/ }),
    ).toBeVisible();
  });

  test('can add branches', async ({ page, routineEditor }) => {
    await routineEditor.insertIntoFirstRung(page.getByRole('button', { name: 'Branch Branch' }));

    expect(await page.getByTestId('rung-branch').all()).toHaveLength(2);

    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'Branch Level Branch Level' }),
    );

    expect(await page.getByTestId('rung-branch').all()).toHaveLength(3);
  });

  test('can add a rung', async ({ page, routineEditor }) => {
    await routineEditor.insertIntoFirstRung(page.getByRole('button', { name: 'Rung Rung' }));

    const rungs = await page.getByTestId('rung').all();
    expect(rungs).toHaveLength(2);
  });

  test('can move a rung', async ({ page, routineEditor }) => {
    await routineEditor.insertIntoFirstRung(page.getByRole('button', { name: 'Rung Rung' }));
    await routineEditor.insertIntoFirstRung(
      page.getByRole('button', { name: 'Normally Open Normally Open' }),
    );

    await page.getByTestId('rung').first().getByRole('button').first().hover();
    await page.mouse.down();
    await page.mouse.move(0, 0);
    await page.getByTestId('rung-drop-area').nth(1).hover();
    await page.mouse.up();

    await expect(
      page.getByTestId('rung').nth(1).getByRole('button', { name: 'XIC' }),
    ).toBeVisible();
  });
});
