import {
  EventAuthentication,
  EventAuthorization,
  EventClient,
  EventConnection,
  EventOrganization,
  EventRequest,
  EventResourceServer,
  EventStats,
  EventTenant,
  EventTransaction,
  EventUser,
} from "./types";

export type EventAuthenticationPRPC = Omit<EventAuthentication, "riskAssessment" | "confidence" | "version">;
export type EventTransactionPRPC = Pick<EventTransaction, "locale" | "login_hint" | "state" | "ui_locales">;
export interface PasswordResetPostChallengeEvent {
  /**
   * Details about authentication signals obtained during the login flow.
   */
  authentication: EventAuthenticationPRPC | undefined;
  /**
   * An object containing information describing the authorization granted to the user who is logging in.
   */
  authorization: EventAuthorization | undefined;
  /**
   * Information about the Client with which this login transaction was initiated.
   */
  client: EventClient;
  /**
   * Details about the Connection that was used to authenticate the user.
   */
  connection: EventConnection;
  /**
   * Details about the Organization associated with the current transaction.
   */
  organization: EventOrganization | undefined;
  /**
   * Details about the request that initiated the transaction.
   */
  request: EventRequest;
  /**
   * Details about the resource server to which the access is being requested.
   */
  resource_server: EventResourceServer | undefined;
  /**
   * Login statistics for the current user.
   */
  stats: EventStats;
  /**
   * Details about the Tenant associated with the current transaction.
   */
  tenant: EventTenant;
  /**
   * Details about the current transaction.
   */
  transaction: EventTransactionPRPC | undefined;
  /**
   * An object describing the user on whose behalf the current transaction was initiated.
   */
  user: EventUser;
  /**
   * An object containing the secrets set in the Auth0 Management Dashboard.
   */
  secrets: { [key: string]: String };
  //There's multiple undocumented objects within event
  [key: string]: any;
}
