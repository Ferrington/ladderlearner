import { Locator, Page } from '@playwright/test';

export class RoutineEditorFeature {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async insertIntoFirstRung(locator: Locator) {
    await locator.hover();
    await this.page.mouse.down();
    await this.page.mouse.move(0, 0);
    await this.page.getByTestId('rung').first().hover();
    await this.page.mouse.up();
  }

  async deleteFirstRung(rungs: Locator) {
    await rungs.first().getByRole('button').first().hover();
    await rungs.first().getByTestId('delete-rung').click();
  }

  async deleteAllRungs() {
    const rungs = this.page.getByTestId('rung');
    while ((await rungs.count()) > 1) {
      await this.deleteFirstRung(rungs);
    }
    await this.deleteFirstRung(rungs);
  }
}
