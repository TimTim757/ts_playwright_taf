import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
    readonly openNewAccountLink: Locator;
    readonly accountTypeSelect: Locator;
    readonly openAccountButton: Locator;
    readonly newAccountNumber: Locator;
    readonly accountOpenedHeading: Locator;
    readonly successMessage: Locator;
    readonly newAccountMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.openNewAccountLink = page.getByRole('link', { name: 'Open New Account' });
        this.accountTypeSelect = page.locator('#type');
        this.openAccountButton = page.locator('input.button[value="Open New Account"]');
        this.newAccountNumber = page.locator('#newAccountId');
        this.accountOpenedHeading = page.getByRole('heading', { name: 'Account Opened!' });
        this.successMessage = page.getByText('Your new account number');
        this.newAccountMessage = page.locator('#openAccountResult');
    }

    async goto() {
        await this.openNewAccountLink.click();
    }

    async selectAccountType(accountType: string) {
        await this.accountTypeSelect.selectOption(accountType);
    }

    async submitForm() {
        await this.openAccountButton.click();
    }

    async getNewAccountNumber(): Promise<string> {
        await this.newAccountNumber.waitFor({ state: 'visible' });
        const text = await this.newAccountNumber.textContent();
        return (text ?? '').trim();
    }

    async verifyAccountOpened(newAccountNumber: string) {
        await expect(this.accountOpenedHeading).toBeVisible();
        await expect(this.successMessage).toBeVisible();
        await expect(this.newAccountMessage).toBeVisible();
        await expect(this.newAccountMessage).toContainText(newAccountNumber);
    }
}
