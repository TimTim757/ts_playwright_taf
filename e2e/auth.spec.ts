import { test } from '../support/fixtures';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';

const AUTH_FILE = path.join(process.cwd(), 'playwright/.auth/user.json');

test.describe('Auth', () => {
  test.beforeEach(async () => {
    if (fs.existsSync(AUTH_FILE)) {
      fs.writeFileSync(AUTH_FILE, JSON.stringify({}));
      console.log('Cleared existing auth state');
    }
  });

  test('Register a new user', async ({ page, registerPage }) => {
    const MAX_RETRIES = 3;
    const password = faker.internet.password();

    await registerPage.goto();
    for (let i = 0; i < MAX_RETRIES; i++) {
      console.log(`Attempt ${i + 1} of ${MAX_RETRIES}`);
      const username = faker.internet.username();
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
    await page.context().storageState({ path: AUTH_FILE });
    await page.close();
  });
});
