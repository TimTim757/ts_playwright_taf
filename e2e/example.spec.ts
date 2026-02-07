import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { faker } from '@faker-js/faker';

test('Register a new user', async ({ page }) => {
const MAX_RETRIES = 3;
const password = faker.internet.password();
const registerPage = new RegisterPage(page);

await registerPage.goto();
for (let i = 0; i < MAX_RETRIES; i++) {
  console.log(`Attempt ${i + 1} of ${MAX_RETRIES}`);
  let username = faker.internet.username();
    await registerPage.fillForm();
    await registerPage.fillCredentials(username, password);
    await registerPage.submitForm();
    await page.waitForLoadState('networkidle');

    if (await registerPage.verifyUserAlreadyExistsErrorMessage()) {
        continue;
    }
    break;
}

await registerPage.verifySuccessMessage();
await page.close();

});

// test('Open New Bank Account', async ({ page }) => {
// await page.getByRole('link', { name: 'Open New Account' }).click();
// await page.getByRole('button', { name: 'Open New Account' }).click();
// await expect(page.locator('#openAccountResult')).toContainText('Account Opened!');
// await expect(page.locator('#openAccountResult')).toContainText('Your new account number:');
// });

// test('Transfer Funds', async ({ page }) => {
// await page.getByRole('link', { name: 'Transfer Funds' }).click();
// // await page.locator('#amount').click();
// await page.locator('#amount').fill('10');
// await page.locator('#fromAccountId').selectOption('23889');
// await page.getByRole('button', { name: 'Transfer' }).click();
// await page.getByRole('heading', { name: 'Transfer Complete!' }).click();
// await expect(page.locator('#showResult')).toContainText('Transfer Complete!');
// await expect(page.locator('#showResult')).toContainText('$10.00 has been transferred from account');
 
// });
