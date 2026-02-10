/**
 * Converts camelCase or PascalCase string to Title Case with spaces.
 * Examples:
 *   'openNewAccountLink' -> 'Open New Account Link'
 *   'firstNameInput' -> 'First Name Input'
 *   'ssnInput' -> 'Ssn Input'
 */
export function camelToTitleCase(str: string): string {
    return str
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, (char) => char.toUpperCase())
        .trim();
}
