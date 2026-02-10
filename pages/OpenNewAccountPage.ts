import { BasePage } from './BasePage';
import { createOpenNewAccountLocators } from './locators/openNewAccountLocators';

export class OpenNewAccountPage extends BasePage {
    protected readonly pageName = 'OpenNewAccountPage';
    private readonly locators = createOpenNewAccountLocators(this.page);

    async goto() {
        await this.click(this.locators.openNewAccountLink);
    }

    async selectAccountType(accountType: string) {
        await this.selectOption(this.locators.accountTypeSelect, accountType);
    }

    async submitForm() {
        await this.click(this.locators.openAccountButton);
    }

    async getNewAccountNumber(): Promise<string> {
        await this.waitForVisible(this.locators.newAccountNumber);
        return this.getTextContent(this.locators.newAccountNumber);
    }

    async verifyAccountOpened(newAccountNumber: string) {
        await this.expectVisible(this.locators.accountOpenedHeading);
        await this.expectVisible(this.locators.successMessage);
        await this.expectVisible(this.locators.newAccountMessage);
        await this.expectToContainText(this.locators.newAccountMessage, newAccountNumber);
    }

    /**
     * High-level method to open a new account of specified type and return the account number.
     * Handles all the steps: navigation, selection, submission, and verification.
     * @param accountType - The type of account to open (use AccountTypes constants)
     * @returns The newly created account number
     */
    async openAccountWithType(accountType: string): Promise<string> {
        await this.goto();
        await this.selectAccountType(accountType);
        await this.waitForNetworkIdle();
        await this.submitForm();
        const newAccountNumber = await this.getNewAccountNumber();
        await this.verifyAccountOpened(newAccountNumber);
        return newAccountNumber;
    }
}
