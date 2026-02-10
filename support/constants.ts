/**
 * Application routes and paths
 */
export const Routes = {
    INDEX: 'index.htm',
    REGISTER: 'register.htm',
} as const;

/**
 * Account related constants
 */
export const AccountTypes = {
    CHECKING: '0',
    SAVINGS: '1',
    MONEY_MARKET: '2',
    CERTIFICATE_OF_DEPOSIT: '3',
} as const;

/**
 * UI messages and text content
 */
export const Messages = {
    TRANSFER_SUCCESS: (amount: string) => `$${amount}.00 has been transferred from account`,
    REGISTRATION_SUCCESS: 'Your account was created successfully. You are now logged in.',
    USER_ALREADY_EXISTS: 'This username already exists.',
    ACCOUNT_OPENED: 'Account Opened!',
    TRANSFER_COMPLETE: 'Transfer Complete!',
} as const;

/**
 * Form and validation constants
 */
export const FormConstraints = {
    SSN_LENGTH: 9,
} as const;

/**
 * Authentication related constants
 */
export const Auth = {
    AUTH_FILE: 'playwright/.auth/user.json',
    MAX_REGISTRATION_RETRIES: 3,
} as const;

/**
 * Test data defaults
 */
export const Amounts = {
    DEFAULT_TRANSFER: '10',
} as const;
