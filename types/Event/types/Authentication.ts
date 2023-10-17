export interface EventAuthentication {
    methods: Array<AuthenticationMethod>,
    riskAssessment: RiskAssessment | undefined,
    confidence: String,
    version: String
}

interface AuthenticationMethod {
    name: "federated" | "passkey" | "pwd" | "sms" | "email" | "mfa" | "mock" | any,
        timestamp: String,
        type: string | undefined
}

interface RiskAssessment {
    assessments: {
        ImpossibleTravel: ImpossibleTravelAssessment,
        NewDevice: NewDeviceAssessment,
        UntrustedIP: UntrustedIPAssessment | undefined
    }
}

interface ImpossibleTravelAssessment {
    code: String,
            confidence: String
}
interface NewDeviceAssessment {
    code: String,
            confidence: String,
            details: {
                device: String | undefined,
                useragent: String | undefined
            } | undefined
}
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