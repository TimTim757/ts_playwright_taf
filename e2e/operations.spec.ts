import { test } from '@playwright/test';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';

test.beforeEach(async ({ page }) => {
    await page.goto('index.htm');
});

test('Open New Bank Account', async ({ page }) => {
    const accountPage = new OpenNewAccountPage(page);
    await accountPage.goto();
    await accountPage.selectAccountType('1');
    await page.waitForLoadState('networkidle');
    await accountPage.submitForm();
    const newAccountNumber = await accountPage.getNewAccountNumber();
    await accountPage.verifyAccountOpened(newAccountNumber);
});

test('Transfer Funds between accounts', async ({ page }) => {
    const accountPage = new OpenNewAccountPage(page);
    await accountPage.goto();
    await accountPage.selectAccountType('1');
    await page.waitForLoadState('networkidle');
    await accountPage.submitForm();
    const newAccountNumber = await accountPage.getNewAccountNumber();
    await accountPage.verifyAccountOpened(newAccountNumber);

    const transferPage = new TransferFundsPage(page);
    await transferPage.openTransferFunds();
    await transferPage.fillTransferAmount('10');
    await transferPage.selectFromAccount(newAccountNumber);
    await transferPage.submitForm();
    await transferPage.verifyTransferComplete();
    await transferPage.verifyTransferMessage('$10.00 has been transferred from account');
    await page.close();
});
