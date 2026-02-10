import { Page } from '@playwright/test';

export function createRegisterLocators(page: Page) {
    return {
        firstNameInput: page.locator('#customer\\.firstName'),
        lastNameInput: page.locator('#customer\\.lastName'),
        addressStreetInput: page.locator('#customer\\.address\\.street'),
        addressCityInput: page.locator('#customer\\.address\\.city'),
        addressStateInput: page.locator('#customer\\.address\\.state'),
        addressZipCodeInput: page.locator('#customer\\.address\\.zipCode'),
        phoneNumberInput: page.locator('#customer\\.phoneNumber'),
        ssnInput: page.locator('#customer\\.ssn'),
        usernameInput: page.locator('#customer\\.username'),
        passwordInput: page.locator('#customer\\.password'),
        repeatedPasswordInput: page.locator('#repeatedPassword'),
        registerButton: page.getByRole('button', { name: 'Register' }),
        userAlreadyExistsErrorMessage: page.locator('#customer\\.username\\.errors'),
        welcomeHeading: page.locator('h1'),
        successPanel: page.locator('#rightPanel'),
    };
}

export type RegisterLocators = ReturnType<typeof createRegisterLocators>;
