/**
 * Request changes to the authentication state of the current user's session.
 */
export interface ApiAuthentication {
  /**
     * Indicate that a custom authentication method has been completed in the current session. This method will then be available in the `event.authentication.methods` array in subsequent logins.

    Important: This API is only available from within the onContinuePostLogin function for PostLogin Actions. In other words, this may be used to record the completion of a custom authentication method after redirecting the user via api.redirect.sendUserTo().
     * @param provider_url A url representing the identity of the custom authenticated method that was completed.
* @returns Returns a reference to the api object.
     */
  recordMethod(provider_url: string): void;
  /**
     * Challenge the user with one or more specified multifactor authentication factors. This method presents the default challenge first, then allows the user to select a different option if additional factors have been supplied. If the user has not enrolled in any of the factors supplied (including both the default and any additional factors), the command fails.

    Note: This method overrides existing policies and rules that enable or disable MFA in a tenant.
     * @param factor An object containing the type field. type is a string used to specify the default MFA factor or factors used to challenge the user.
     * @param options An object containing the optional additionalFactors field. AdditionalFactors is an array used to specify other factors a user can choose from when completing the MFA challenge. Supports the same values as the type field.
     */
  challengeWith(
    factor: AuthenticationType,
    options: {
      additionalFactors: Array<AuthenticationType>;
    }
  ): void;
  /**
     * Trigger an MFA challenge and allow the user to select their preferred factor from the supplied list. This method presents a factor picker to the user rather than a specific challenge, in accordance with the following conditions:

    If two or more factors are specified, a factor picker displays to the user.
    If the user has only enrolled in one of the specified factors (or only one factor is specified), the factor picker is skipped.
    If the user has not enrolled in any of the specified factors, the challenge command fails.
    Note: This method overrides existing policies and rules that enable or disable MFA in a tenant.
     * @param factors An array of objects that includes the type field. type is a string used to specify an MFA factor the user can choose from when challenged.
     */
  challengeWithAny(factors: Array<AuthenticationType>): void;
}

/**
 * An object containing the type field. type is a string used to specify the default MFA factor or factors used to challenge the user.
 */
export interface AuthenticationType {
  type: "otp" | "email" | "push-notification" | "phone" | "webauthn-platform" | "webauthn-roaming";
}
