export class PageObjectError extends Error {
    constructor(message: string, public readonly pageName: string) {
        super(message);
        this.name = 'PageObjectError';
        Object.setPrototypeOf(this, PageObjectError.prototype);
    }
}

export class PageNotLoadedError extends PageObjectError {
    constructor(pageName: string, elementDescription: string) {
        super(
            `Page '${pageName}' is not properly loaded. Expected element '${elementDescription}' not found.`,
            pageName
        );
        this.name = 'PageNotLoadedError';
        Object.setPrototypeOf(this, PageNotLoadedError.prototype);
    }
}

export class ElementNotFoundError extends PageObjectError {
    constructor(pageName: string, elementDescription: string, action: string) {
        super(
            `Cannot ${action} on '${pageName}': Element '${elementDescription}' not found or not visible.`,
            pageName
        );
        this.name = 'ElementNotFoundError';
        Object.setPrototypeOf(this, ElementNotFoundError.prototype);
    }
}

export class ElementInteractionError extends PageObjectError {
    constructor(pageName: string, elementDescription: string, action: string, originalError: Error) {
        super(
            `Failed to ${action} on '${pageName}' element '${elementDescription}': ${originalError.message}`,
            pageName
        );
        this.name = 'ElementInteractionError';
        Object.setPrototypeOf(this, ElementInteractionError.prototype);
    }
}
