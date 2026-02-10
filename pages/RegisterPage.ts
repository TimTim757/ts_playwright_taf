import { BasePage } from './BasePage';
import { createRegisterLocators } from './locators/registerLocators';
import { Routes, Messages } from '../support/constants';

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    addressStreet: string;
    addressCity: string;
    addressState: string;
    addressZipCode: string;
    phoneNumber: string;
    ssn: string;
};

export class RegisterPage extends BasePage {
    protected readonly pageName = 'RegisterPage';
    private readonly locators = createRegisterLocators(this.page);

    async goto() {
        await super.goto(Routes.REGISTER);
    }

    async fillForm(data: RegisterFormData) {
        await this.waitForNetworkIdle();
        await this.waitForVisible(this.locators.firstNameInput);
        await this.fill(this.locators.firstNameInput, data.firstName);
        await this.fill(this.locators.lastNameInput, data.lastName);
        await this.fill(this.locators.addressStreetInput, data.addressStreet);
        await this.fill(this.locators.addressCityInput, data.addressCity);
        await this.fill(this.locators.addressStateInput, data.addressState);
        await this.fill(this.locators.addressZipCodeInput, data.addressZipCode);
        await this.fill(this.locators.phoneNumberInput, data.phoneNumber);
        await this.fill(this.locators.ssnInput, data.ssn);
    }

    async fillCredentials(username: string, password: string) {
        await this.fill(this.locators.usernameInput, username);
        await this.fill(this.locators.passwordInput, password);
        await this.fill(this.locators.repeatedPasswordInput, password);
    }

    async submitForm() {
        await this.click(this.locators.registerButton);
    }

    async verifyUserAlreadyExistsErrorMessage(): Promise<boolean> {
        return this.isVisible(this.locators.userAlreadyExistsErrorMessage);
    }

    async verifySuccessMessage() {
        await this.expectToContainText(this.locators.welcomeHeading, 'Welcome');
        await this.expectToContainText(this.locators.successPanel, Messages.REGISTRATION_SUCCESS);
    }
}
