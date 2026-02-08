import { Page } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    protected async goto(path: string) {
        await this.page.goto(path);
    }
}
