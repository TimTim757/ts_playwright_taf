import { test } from '../support/fixtures';
import { faker } from '@faker-js/faker';
import path from 'path';
import fs from 'fs';
import { Auth, FormConstraints } from '../support/constants';

const AUTH_FILE = path.join(process.cwd(), Auth.AUTH_FILE);

test.describe('Auth', () => {
  test.beforeEach(async () => {
    if (fs.existsSync(AUTH_FILE)) {
      fs.writeFileSync(AUTH_FILE, JSON.stringify({}));
      console.log('Cleared existing auth state');
    }
  });

  test('Register a new user', async ({ page, registerPage }) => {
    const password = faker.internet.password();
    const formData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      addressStreet: faker.location.streetAddress(),
      addressCity: faker.location.city(),
      addressState: faker.location.state(),
      addressZipCode: faker.location.zipCode(),
      phoneNumber: faker.phone.number(),
      ssn: faker.string.numeric(FormConstraints.SSN_LENGTH),
    };

    await registerPage.goto();
    for (let i = 0; i < Auth.MAX_REGISTRATION_RETRIES; i++) {
      console.log(`Attempt ${i + 1} of ${Auth.MAX_REGISTRATION_RETRIES}`);
      const username = faker.internet.username();
      await registerPage.fillForm(formData);
      await registerPage.fillCredentials(username, password);
      await registerPage.submitForm();
      await registerPage.waitForNetworkIdle();

      if (await registerPage.verifyUserAlreadyExistsErrorMessage()) {
        continue;
      }
      break;
    }

    await registerPage.verifySuccessMessage();
    await page.context().storageState({ path: AUTH_FILE });
    await registerPage.closePage();
  });
});
