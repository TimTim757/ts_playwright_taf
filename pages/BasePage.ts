import { Locator, Page, expect } from '@playwright/test';
import { ElementInteractionError } from '../support/errors';
import { camelToTitleCase } from '../support/utils';

export abstract class BasePage {
    readonly page: Page;
    protected abstract readonly pageName: string;

    constructor(page: Page) {
        this.page = page;
    }

    protected async goto(path: string) {
        try {
            await this.page.goto(path);
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                `route: ${path}`,
                'navigate to',
                error as Error
            );
        }
    }

    protected async click(locator: Locator, locatorName?: string) {
        const elementDescription = locatorName ? camelToTitleCase(locatorName) : 'element';
        try {
            await locator.click();
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                elementDescription,
                'click',
                error as Error
            );
        }
    }

    protected async fill(locator: Locator, value: string, locatorName?: string) {
        const elementDescription = locatorName ? camelToTitleCase(locatorName) : 'input field';
        try {
            await locator.fill(value);
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                elementDescription,
                'fill',
                error as Error
            );
        }
    }

    protected async selectOption(locator: Locator, value: string, locatorName?: string) {
        const elementDescription = locatorName ? camelToTitleCase(locatorName) : 'select field';
        try {
            await locator.selectOption(value);
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                elementDescription,
                'select option from',
                error as Error
            );
        }
    }

    protected async getTextContent(locator: Locator, locatorName?: string): Promise<string> {
        const elementDescription = locatorName ? camelToTitleCase(locatorName) : 'element';
        try {
            const text = await locator.textContent();
            return (text ?? '').trim();
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                elementDescription,
                'get text content from',
                error as Error
            );
        }
    }

    protected async waitForVisible(locator: Locator, locatorName?: string) {
        const elementDescription = locatorName ? camelToTitleCase(locatorName) : 'element';
        try {
            await locator.waitFor({ state: 'visible' });
        } catch (error) {
            throw new ElementInteractionError(
                this.pageName,
                elementDescription,
                'wait for visibility of',
                error as Error
            );
        }
    }

    protected async expectVisible(locator: Locator) {
        await expect(locator).toBeVisible();
    }

    protected async expectToContainText(locator: Locator, text: string) {
        await expect(locator).toContainText(text);
    }

    protected async isVisible(locator: Locator): Promise<boolean> {
        return locator.isVisible();
    }

    async waitForNetworkIdle() {
        await this.page.waitForLoadState('networkidle');
    }

    async navigateTo(path: string) {
        await this.page.goto(path);
    }

    async closePage() {
        await this.page.close();
    }
}
