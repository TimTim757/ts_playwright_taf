import { test } from '@playwright/test';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { TrunsferFundsPage } from '../pages/TrunsferFundsPage';

let newAccountNumber;

test.beforeEach(async ({ page }) => {
    await page.goto('https://parabank.parasoft.com/parabank/index.htm');
});

test('Open New Bank Account', async ({ page }) => {
const accountPage = new OpenNewAccountPage(page);
await accountPage.goto();
await accountPage.selectAccountType('1');
await page.waitForLoadState('networkidle');
await accountPage.submitForm();
newAccountNumber = await accountPage.getNewAccountNumber();
console.log('New account number:', newAccountNumber);
await accountPage.verifyAccountOpened(newAccountNumber);
await page.close();

});

test('Transfer Funds between accounts', async ({ page }) => {
    test.skip(newAccountNumber === undefined || newAccountNumber === null, 'Transfer Funds between accounts skipped because no new account number was found');
    const transferPage = new TrunsferFundsPage(page);
    await transferPage.goto();
    await transferPage.fillTransferAmount('10');
    await transferPage.selectFromAccount(newAccountNumber);
    await transferPage.submitForm();
    await transferPage.verifyTransferComplete();
    await transferPage.verifyTransferMessage('$10.00 has been transferred from account');
    await page.close();

});
