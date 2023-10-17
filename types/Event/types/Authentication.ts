/**
 * Details about authentication signals obtained during the login flow.
 */
export interface EventAuthentication {
    /**
     * Contains the authentication methods a user has completed during their session.
     */
    methods: Array<AuthenticationMethod>,
    /**
     * Details about risk assessments obtained during the login flow.
     */
    riskAssessment: RiskAssessment | undefined,
    confidence: String,
    version: String
}
/**
 * Contains the authentication methods a user has completed during their session.
 */
interface AuthenticationMethod {
    name: "federated" | "passkey" | "pwd" | "sms" | "email" | "mfa" | "mock" | any,
    timestamp: String,
    /**
     * A specific MFA factor. Only present when name is set to mfa.
     */
    type: string | undefined
}

/**
 * Details about risk assessments obtained during the login flow.
 */
interface RiskAssessment {
    assessments: {
        /**
         * Determines if the user is logging in from a location signaling impossible travel.
         */
        ImpossibleTravel: ImpossibleTravelAssessment | undefined,
        /**
         * Determines if the user is logging in from a known device.
         */
        NewDevice: NewDeviceAssessment | undefined,
        /**
         * Shows if the IP was found in Auth0's repository of low reputation IPs.
         */
        UntrustedIP: UntrustedIPAssessment | undefined
    }
}

/**
 * Determines if the user is logging in from a location signaling impossible travel.
 */
interface ImpossibleTravelAssessment {
    code: String,
    confidence: String
}

/**
 * Determines if the user is logging in from a known device.
 */
interface NewDeviceAssessment {
    code: String,
    confidence: String,
    details: {
        device: String | undefined,
        useragent: String | undefined
    } | undefined
}

/**
 * Shows if the IP was found in Auth0's repository of low reputation IPs.
 */
interface UntrustedIPAssessment {
    code: String,
    confidence: String,
    details: {
        category: String | undefined,
        ip: String | undefined,
        matches: String | undefined,
        source: String | undefined
    } | undefined
}