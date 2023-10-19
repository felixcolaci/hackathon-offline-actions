/**
 * Details about authentication signals obtained during the login flow.
 */
export interface EventAuthentication {
  /**
   * Contains the authentication methods a user has completed during their session.
   */
  methods: Array<AuthenticationMethod>;
  /**
   * Details about risk assessments obtained during the login flow.
   */
  riskAssessment: RiskAssessment | undefined;
  confidence: string;
  version: string;
}
/**
 * Contains the authentication methods a user has completed during their session.
 */
interface AuthenticationMethod {
  name: "federated" | "passkey" | "pwd" | "sms" | "email" | "mfa" | "mock" | any;
  timestamp: string;
  /**
   * A specific MFA factor. Only present when name is set to mfa.
   */
  type: string | undefined;
}

/**
 * Details about risk assessments obtained during the login flow.
 */
interface RiskAssessment {
  assessments: {
    /**
     * Determines if the user is logging in from a location signaling impossible travel.
     */
    ImpossibleTravel: ImpossibleTravelAssessment | undefined;
    /**
     * Determines if the user is logging in from a known device.
     */
    NewDevice: NewDeviceAssessment | undefined;
    /**
     * Shows if the IP was found in Auth0's repository of low reputation IPs.
     */
    UntrustedIP: UntrustedIPAssessment | undefined;
  };
}

/**
 * Determines if the user is logging in from a location signaling impossible travel.
 */
interface ImpossibleTravelAssessment {
  code: string;
  confidence: string;
}

/**
 * Determines if the user is logging in from a known device.
 */
interface NewDeviceAssessment {
  code: string;
  confidence: string;
  details:
    | {
        device: string | undefined;
        useragent: string | undefined;
      }
    | undefined;
}

/**
 * Shows if the IP was found in Auth0's repository of low reputation IPs.
 */
interface UntrustedIPAssessment {
  code: string;
  confidence: string;
  details:
    | {
        category: string | undefined;
        ip: string | undefined;
        matches: string | undefined;
        source: string | undefined;
      }
    | undefined;
}
