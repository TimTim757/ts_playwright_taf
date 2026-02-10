import { Page } from '@playwright/test';

export function createOpenNewAccountLocators(page: Page) {
    return {
        openNewAccountLink: page.getByRole('link', { name: 'Open New Account' }),
        accountTypeSelect: page.locator('#type'),
        openAccountButton: page.locator('input.button[value="Open New Account"]'),
        newAccountNumber: page.locator('#newAccountId'),
        accountOpenedHeading: page.getByRole('heading', { name: 'Account Opened!' }),
        successMessage: page.getByText('Your new account number'),
        newAccountMessage: page.locator('#openAccountResult'),
    };
}

export type OpenNewAccountLocators = ReturnType<typeof createOpenNewAccountLocators>;
