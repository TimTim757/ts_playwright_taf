import { Locator, Page, expect } from '@playwright/test';

// await page.getByRole('link', { name: 'Transfer Funds' }).click();
// // await page.locator('#amount').click();
// await page.locator('#amount').fill('10');
// await page.locator('#fromAccountId').selectOption('23889');
// await page.getByRole('button', { name: 'Transfer' }).click();
// await page.getByRole('heading', { name: 'Transfer Complete!' }).click();
// await expect(page.locator('#showResult')).toContainText('Transfer Complete!');
// await expect(page.locator('#showResult')).toContainText('$10.00 has been transferred from account');
 


export class TrunsferFundsPage {
    readonly page: Page;

   readonly transferFundsLink: Locator;
   readonly amountInput: Locator;
   readonly fromAccountIdSelect: Locator;
   readonly toAccountIdSelect: Locator;
   readonly transferButton: Locator;
   readonly transferCompleteHeading: Locator;
   readonly successMessage: Locator;
//    readonly transferMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.transferFundsLink = page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' });
        this.amountInput = page.locator('#amount');
        this.fromAccountIdSelect = page.locator('#fromAccountId');
        this.toAccountIdSelect = page.locator('#toAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.transferCompleteHeading = page.getByRole('heading', { name: 'Transfer Complete!' });
        this.successMessage = page.getByText(/has been transferred from account/);
        // this.transferMessage = page.locator('#showResult');
   
    }

    async goto() {
        await this.page.waitForLoadState('networkidle');
        await this.transferFundsLink.click();
    }

    async fillTransferAmount(amount: string) {
        await this.amountInput.fill(amount);
    }

    async selectFromAccount(fromAccount: string) {
        await this.fromAccountIdSelect.waitFor({state: 'visible'});
        await this.fromAccountIdSelect.selectOption(fromAccount);
    }   

    // async selectToAccount(toAccount: string) {
    //     await this.toAccountIdSelect.selectOption(toAccount);
    // }

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
