import { test, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

test.beforeEach(async () => {
  const authFilePath = path.join(process.cwd(), 'playwright/.auth/user.json');
  if (fs.existsSync(authFilePath)) {
    fs.writeFileSync(authFilePath, JSON.stringify({}));
    console.log('Cleared existing auth state');
  }
});

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
  await page.context().storageState({ path: authFile });
  await page.close();

});
