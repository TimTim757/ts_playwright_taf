import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
    readonly transferFundsLink: Locator;
    readonly amountInput: Locator;
    readonly fromAccountIdSelect: Locator;
    readonly toAccountIdSelect: Locator;
    readonly transferButton: Locator;
    readonly transferCompleteHeading: Locator;
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.transferFundsLink = page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountIdSelect = page.locator('#fromAccountId');
        this.toAccountIdSelect = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.transferCompleteHeading = page.getByRole('heading', { name: 'Transfer Complete!' });
        this.successMessage = page.getByText(/has been transferred from account/);
    }

    async openTransferFunds() {
        await this.page.waitForLoadState('networkidle');
        await this.transferFundsLink.click();
    }

    async fillTransferAmount(amount: string) {
        await this.amountInput.fill(amount);
    }

    async selectFromAccount(fromAccount: string) {
        await this.fromAccountIdSelect.waitFor({ state: 'visible' });
        await this.fromAccountIdSelect.selectOption(fromAccount);
    }

    async selectToAccount(toAccount: string) {
        await this.toAccountIdSelect.selectOption(toAccount);
    }

    async submitForm() {
        await this.transferButton.click();
    }

    async verifyTransferComplete() {
        await expect(this.transferCompleteHeading).toBeVisible();
        await expect(this.successMessage).toBeVisible();
    }

    async verifyTransferMessage(message: string) {
        await expect(this.successMessage).toContainText(message);
    }
}
