import { test } from '../support/fixtures';
import { Routes, AccountTypes, Amounts, Messages } from '../support/constants';

test.describe('Operations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(Routes.INDEX);
    });

    test('Open New Bank Account', async ({ openNewAccountPage }) => {
        await openNewAccountPage.openAccountWithType(AccountTypes.SAVINGS);
    });

    test('Transfer Funds between accounts', async ({ page, openNewAccountPage, transferFundsPage }) => {
        const newAccountNumber = await openNewAccountPage.openAccountWithType(AccountTypes.SAVINGS);

        await transferFundsPage.openTransferFunds();
        await transferFundsPage.fillTransferAmount(Amounts.DEFAULT_TRANSFER);
        await transferFundsPage.selectFromAccount(newAccountNumber);
        await transferFundsPage.submitForm();
        await transferFundsPage.verifyTransferComplete();
        await transferFundsPage.verifyTransferMessage(Messages.TRANSFER_SUCCESS(Amounts.DEFAULT_TRANSFER));
        await page.close();
    });
});
