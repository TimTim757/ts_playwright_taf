import { Page } from '@playwright/test';

export function createTransferFundsLocators(page: Page) {
    return {
        transferFundsLink: page.locator('#leftPanel').getByRole('link', { name: 'Transfer Funds' }),
        amountInput: page.locator('#amount'),
        fromAccountIdSelect: page.locator('#fromAccountId'),
        toAccountIdSelect: page.locator('#toAccountId'),
        transferButton: page.getByRole('button', { name: 'Transfer' }),
        transferCompleteHeading: page.getByRole('heading', { name: 'Transfer Complete!' }),
        successMessage: page.getByText(/has been transferred from account/),
    };
}

export type TransferFundsLocators = ReturnType<typeof createTransferFundsLocators>;
