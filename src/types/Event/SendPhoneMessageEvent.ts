import { EventClient, EventConnection, EventMessage, EventRequest, EventTenant, EventUser } from "./types";

export type EventRequestSPM = Omit<EventRequest, "query">;
export type EventUserSPM = Omit<EventUser, "enrolledFactors">;
export interface SendPhoneMessageEvent {
  /**
   * Details about the Connection that was used to authenticate the user.
   */
  connection: EventConnection;
  /**
   * Information about the Client with which this login transaction was initiated.
   */
  client: EventClient;
  /**
   * Details about the message that is sent to the user.
   */
  message_options: EventMessage;
  /**
   * Details about the request that initiated the transaction.
   */
  request: EventRequestSPM;
  /**
   * Details about the Tenant associated with the current transaction.
   */
  tenant: EventTenant;
  /**
   * An object describing the user on whose behalf the current transaction was initiated.
   */
  user: EventUserSPM;
  /**
   * An object containing the secrets set in the Auth0 Management Dashboard.
   */
  secrets: { [key: string]: string };
  //There's multiple undocumented objects within event
  [key: string]: any;
}
