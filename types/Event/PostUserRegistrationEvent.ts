import { EventConnection, EventRequest, EventTenant, EventTransaction, EventUser } from "./types";

export type EventRequestPUR = Omit<EventRequest, "query">;
export type EventTransactionPUR = Pick<
  EventTransaction,
  "locale" | "acr_values" | "protocol" | "requested_scopes" | "ui_locales"
>;
export type EventUserPUR = Omit<EventUser, "enrolledFactors">;
export interface PostUserRegistrationEvent {
  /**
   * Details about the Connection that was used to authenticate the user.
   */
  connection: EventConnection;
  /**
   * Details about the request that initiated the transaction.
   */
  request: EventRequestPUR;
  /**
   * Details about the Tenant associated with the current transaction.
   */
  tenant: EventTenant;
  /**
   * Details about the current transaction.
   */
  transaction: EventTransactionPUR | undefined;
  /**
   * An object describing the user on whose behalf the current transaction was initiated.
   */
  user: EventUserPUR;
  /**
   * An object containing the secrets set in the Auth0 Management Dashboard.
   */
  secrets: { [key: string]: string };
  //There's multiple undocumented objects within event
  [key: string]: any;
}
