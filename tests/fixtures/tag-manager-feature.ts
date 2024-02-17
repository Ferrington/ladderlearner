import { Page } from '@playwright/test';

export class TagManagerFeature {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/');
  }

  async addTag(name: string, type: string) {
    if (await this.page.getByTestId('show-menu-button').isVisible()) {
      await this.page.getByTestId('show-menu-button').click();
    }
    await this.page.getByTestId('tag-name').click();
    await this.page.getByTestId('tag-name').fill(name);
    await this.page.getByTestId('tag-type').click();
    await this.page.getByRole('option', { name: type }).click();
    await this.page.getByTestId('create-tag-button').click();
  }

  async deleteTag(name: string) {
    const tagRow = this.page.getByRole('button', { name });
    await tagRow.hover();
    await tagRow.getByTestId('delete-tag-button').click();
  }

  async deleteAllTags() {
    const tagRows = this.page.getByTestId('tag-row');
    while ((await tagRows.count()) > 0) {
      await tagRows.first().hover();
      await tagRows.first().getByTestId('delete-tag-button').click();
    }
  }
}
