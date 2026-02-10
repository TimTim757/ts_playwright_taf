import { BasePage } from './BasePage';
import { createTransferFundsLocators } from './locators/transferFundsLocators';

export class TransferFundsPage extends BasePage {
    protected readonly pageName = 'TransferFundsPage';
    private readonly locators = createTransferFundsLocators(this.page);

    async openTransferFunds() {
        await this.waitForNetworkIdle();
        await this.click(this.locators.transferFundsLink);
    }

    async fillTransferAmount(amount: string) {
        await this.fill(this.locators.amountInput, amount);
    }

    async selectFromAccount(fromAccount: string) {
        await this.waitForVisible(this.locators.fromAccountIdSelect);
        await this.selectOption(this.locators.fromAccountIdSelect, fromAccount);
    }

    async selectToAccount(toAccount: string) {
        await this.selectOption(this.locators.toAccountIdSelect, toAccount);
    }

    async submitForm() {
        await this.click(this.locators.transferButton);
    }

    async verifyTransferComplete() {
        await this.expectVisible(this.locators.transferCompleteHeading);
        await this.expectVisible(this.locators.successMessage);
    }

    async verifyTransferMessage(message: string) {
        await this.expectToContainText(this.locators.successMessage, message);
    }
}
