import { test } from '../support/fixtures';

test.describe('Operations', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('index.htm');
    });

    test('Open New Bank Account', async ({ page, openNewAccountPage }) => {
        await openNewAccountPage.goto();
        await openNewAccountPage.selectAccountType('1');
        await page.waitForLoadState('networkidle');
        await openNewAccountPage.submitForm();
        const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
        await openNewAccountPage.verifyAccountOpened(newAccountNumber);
    });

    test('Transfer Funds between accounts', async ({ page, openNewAccountPage, transferFundsPage }) => {
        await openNewAccountPage.goto();
        await openNewAccountPage.selectAccountType('1');
        await page.waitForLoadState('networkidle');
        await openNewAccountPage.submitForm();
        const newAccountNumber = await openNewAccountPage.getNewAccountNumber();
        await openNewAccountPage.verifyAccountOpened(newAccountNumber);

        await transferFundsPage.openTransferFunds();
        await transferFundsPage.fillTransferAmount('10');
        await transferFundsPage.selectFromAccount(newAccountNumber);
        await transferFundsPage.submitForm();
        await transferFundsPage.verifyTransferComplete();
        await transferFundsPage.verifyTransferMessage('$10.00 has been transferred from account');
        await page.close();
    });
});
