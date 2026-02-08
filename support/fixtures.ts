import { test as base, expect } from '@playwright/test';
import { RegisterPage } from '../pages/RegisterPage';
import { OpenNewAccountPage } from '../pages/OpenNewAccountPage';
import { TransferFundsPage } from '../pages/TransferFundsPage';

export const test = base.extend<{
    registerPage: RegisterPage;
    openNewAccountPage: OpenNewAccountPage;
    transferFundsPage: TransferFundsPage;
}>({
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    openNewAccountPage: async ({ page }, use) => {
        await use(new OpenNewAccountPage(page));
    },
    transferFundsPage: async ({ page }, use) => {
        await use(new TransferFundsPage(page));
    },
});

export { expect };
