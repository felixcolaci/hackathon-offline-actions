/**
 * 	
An object describing the user on whose behalf the current transaction was initiated.
 */
export interface EventUser {
  /**
   * Custom fields that store info about a user that influences the user's access, such as support plan, security roles, or access control groups.
   */
  app_metadata: { [key: string]: any };
  /**
   * Timestamp indicating when the user profile was first created.
   */
  created_at: string;
  /**
   * (Unique) User's email address.
   */
  email: string | undefined;
  /**
   * Indicates whether the user has verified their email address.
   */
  email_verified: boolean;
  /**
   * An an array of authentication factors that the user has enrolled.
   */
  enrolledFactors: Array<EventUserEnrolledFactor>;
  /**
   * User's family name.
   */
  family_name: string | undefined;
  /**
   * User's given name.
   */
  given_name: string | undefined;
  /**
   * Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider.
   */
  identities: Array<EventUserIdentity>;
  /**
   * Timestamp indicating the last time the user's password was reset/changed. At user creation, this field does not exist. This property is only available for Database connections.
   */
  last_password_reset: string | undefined;
  /**
   * List of multi-factor authentication (MFA) providers with which the user is enrolled. This array is updated when the user enrolls in MFA and when an administrator resets a user's MFA enrollments.
   */
  multifactor: Array<string> | undefined;
  /**
   * User's full name.
   */
  name: string | undefined;
  /**
   * User's nickname.
   */
  nickname: string | undefined;
  /**
   * User's phone number. Only valid for users with SMS connections.
   */
  phone_number: string | undefined;
  /**
   * Indicates whether the user has verified their phone number. Only valid for users with SMS connections.
   */
  phone_verified: boolean | undefined;
  /**
   * URL pointing to the user's {@link https://auth0.com/docs/users/change-user-picture profile picture}.
   */
  picture: string | undefined;
  /**
   * Timestamp indicating when the user's profile was last updated/modified.
   */
  updated_at: string;
  /**
   * User's unique identifier.
   */
  user_id: string;
  /**
   * Custom fields that store info about a user that does not impact what they can or cannot access, such as work address, home address, or user preferences.
   */
  user_metadata: { [key: string]: any };
  /**
   * User's username.
   */
  username: string | undefined;
}

export interface EventUserEnrolledFactor {
  /**
   * Additional options describing this instance of the enrolled factor.
   */
  options: { [key: string]: any } | undefined;
  /**
   * The type of authentication factor such as push-notification, phone, email, otp, webauthn-roaming and webauthn-platform.
   */
  type: "push-notification" | "phone" | "email" | "otp" | "webauthn-roaming" | "webauthn-platform" | String;
}

/**
 * Contains info retrieved from the identity provider with which the user originally authenticates. Users may also link their profile to multiple identity providers; those identities will then also appear in this array. The contents of an individual identity provider object varies by provider.
 */
export interface EventUserIdentity {
  /**
   * Name of the Auth0 connection used to authenticate the user.
   */
  connection: string | undefined;
  /**
   * Indicates whether the connection is a social one.
   */
  isSocial: boolean | undefined;
  /**
   * User information associated with the connection. When profiles are linked, it is populated with the associated user info for secondary accounts.
   */
  profileData: { [key: string]: any } | undefined;
  /**
   * Name of the entity that is authenticating the user, such as Facebook, Google, SAML, or your own provider.
   */
  provider: string | undefined;
  /**
   * User's unique identifier for this connection/provider.
   */
  user_id: string | undefined;
}
