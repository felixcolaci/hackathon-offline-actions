import { PostLoginAPI } from "../PostLoginAPI"

export interface ApiAuthentication {
    recordMethod(provider_url: String): PostLoginAPI,
        challengeWith(
            //TODO Check if there is anything else that can be specified for phone and push (per docs https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object) 
            factor: AuthenticationType,
            options: {
                additionalFactors: Array<AuthenticationType>
            }
        ): void,
        challengeWithAny(
            factors: Array<AuthenticationType>
        ): void
}

interface AuthenticationType {
    type: "otp" | "email" | "push-notification" | "phone" | "webauthn-platform" | "webauthn-roaming"
}