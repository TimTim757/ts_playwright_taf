import { Locator, Page, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressStreetInput: Locator;
    readonly addressCityInput: Locator;
    readonly addressStateInput: Locator;
    readonly addressZipCodeInput: Locator;
    readonly phoneNumberInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatedPasswordInput: Locator;
    readonly registerButton: Locator;
    readonly userAlreadyExistsErrorMessage: Locator;
    readonly welcomeHeading: Locator;
    readonly successPanel: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.locator('#customer\\.firstName');
        this.lastNameInput = page.locator('#customer\\.lastName');
        this.addressStreetInput = page.locator('#customer\\.address\\.street');
        this.addressCityInput = page.locator('#customer\\.address\\.city');
        this.addressStateInput = page.locator('#customer\\.address\\.state');
        this.addressZipCodeInput = page.locator('#customer\\.address\\.zipCode');
        this.phoneNumberInput = page.locator('#customer\\.phoneNumber');
        this.ssnInput = page.locator('#customer\\.ssn');
        this.usernameInput = page.locator('#customer\\.username');
        this.passwordInput = page.locator('#customer\\.password');
        this.repeatedPasswordInput = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.userAlreadyExistsErrorMessage = page.locator('#customer\\.username\\.errors');
        this.welcomeHeading = page.locator('h1');
        this.successPanel = page.locator('#rightPanel');
    }

    async goto() {
        await super.goto('register.htm');
    }

    async fillForm() {
        await this.page.waitForLoadState('networkidle');
        await this.firstNameInput.waitFor({ state: 'visible' });
        await this.firstNameInput.fill(faker.person.firstName());
        await this.lastNameInput.fill(faker.person.lastName());
        await this.addressStreetInput.fill(faker.location.streetAddress());
        await this.addressCityInput.fill(faker.location.city());
        await this.addressStateInput.fill(faker.location.state());
        await this.addressZipCodeInput.fill(faker.location.zipCode());
        await this.phoneNumberInput.fill(faker.phone.number());
        await this.ssnInput.fill(faker.string.numeric(9));
    }

    async fillCredentials(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.repeatedPasswordInput.fill(password);
    }

    async submitForm() {
        await this.registerButton.click();
    }

    async verifyUserAlreadyExistsErrorMessage() {
       return await this.userAlreadyExistsErrorMessage.isVisible();
    }

    async verifySuccessMessage() {
        await expect(this.welcomeHeading).toContainText('Welcome');
        await expect(this.successPanel).toContainText('Your account was created successfully. You are now logged in.');
    }

}