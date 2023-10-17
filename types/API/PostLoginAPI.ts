export interface PostLoginAPI {
    access: {
        deny(reason: String): void
    },
    accessToken: {
        setCustomClaim(name: String, value: String): PostLoginAPI,
        addScope(scope: String): PostLoginAPI,
        removeScope(scope: String): PostLoginAPI
    },
    authentication: {
        recordMethod(provider_url: String): PostLoginAPI,
        challengeWith(
            //TODO Check if there is anything else that can be specified for phone and push (per docs https://auth0.com/docs/customize/actions/flows-and-triggers/login-flow/api-object) 
            factor: AuthenticationType,
            options: {
                additionalFactors: Array<AuthenticationType>
            }
        ):void,
        challengeWithAny(
            factors: Array<AuthenticationType>
        ):void
    },
    cache: {
        delete(key:String): {
            type: "success" | "error",
            code: any | undefined
        },
        get(key:String): {
            value: String,
            expires_at: number
        } | undefined,
        set(key:String, value:String, options: {
            expires_at: number | undefined,
            ttl: number | undefined
        } | undefined): {
            type: "success", "error"
        }
    },
    idToken: {
        setCustomClaim(name:String,value:any):PostLoginAPI
    },
    multifactor: {
        enable(provider: "any"|"duo"|"google-authenticator"|"guardian"|"none", options: {
            allowRememberBrowser: boolean | undefined,
            providerOptions: {
                host: String,
                ikey: String,
                skey: String,
                username: String | undefined
            } | undefined
        })
    },
    user: {
        setAppMetadata(name:String,value:any):PostLoginAPI,
        setUserMetadata(name:String,value:any):PostLoginAPI
    },
    redirect: {
        encodeToken(options: {
            expiresInSeconds: number,
            payload:{[key:string]:any},
            secret: String
        }):String,
        sendUserTo(url:String, options: {
            query:{[key:string]:String}
        }):PostLoginAPI,
        validateToken(options:{
            secret:String,
            tokenParameterName: String
        }):{[key:string]:any}
    },
    samlResponse: {
        //TODO
    }
}

interface AuthenticationType {
    type: "otp" | "email" | "push-notification" | "phone" | "webauthn-platform" | "webauthn-roaming"
}