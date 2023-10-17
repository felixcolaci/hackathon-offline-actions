export interface PostLoginEventUser {
    app_metadata: { [key: string]: any },
    created_at: String,
    email: String | undefined,
    email_verified: boolean,
    enrolledFactors: Array<PostLoginEventUserEnrolledFactor>,
    family_name: String | undefined,
    given_name: String | undefined,
    identities: Array<PostLoginEventUserIdentity>,
    last_password_reset: String | undefined,
    multifactor: Array<String> | undefined,
    name: String | undefined,
    nickname: String | undefined,
    phone_number: String | undefined,
    phone_verified: boolean | undefined,
    picture: String | undefined,
    updated_at: String,
    user_id: String,
    user_metadata: { [key: string]: any },
    username: String | undefined
}

interface PostLoginEventUserEnrolledFactor {
    options: { [key: string]: any } | undefined,
    type: "push-notification" | "phone" | "email" | "otp" | "webauthn-roaming" | "webauthn-platform" | String
}

interface PostLoginEventUserIdentity {
    connection: String | undefined,
        isSocial: boolean | undefined,
        profileData: { [key: string]: any } | undefined,
        provider: String | undefined,
        user_id: String | undefined
}