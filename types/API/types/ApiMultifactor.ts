export interface ApiMultifactor {
    enable(provider: "any" | "duo" | "google-authenticator" | "guardian" | "none", options: {
        allowRememberBrowser: boolean | undefined,
        providerOptions: {
            host: String,
            ikey: String,
            skey: String,
            username: String | undefined
        } | undefined
    }):void
}