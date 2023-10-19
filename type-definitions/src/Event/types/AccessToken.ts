export interface EventAccessToken {
    /**
     * An object for holding Custom Claims.
     */
    customClaims: { [key: string]: string },
    /**
     * The scopes in the Access Token to be issued.
     */
    scope: Array<string>
}