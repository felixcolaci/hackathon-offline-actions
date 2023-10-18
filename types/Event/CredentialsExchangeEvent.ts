import { EventAccessToken } from "./types/AccessToken"
import { EventClient } from "./types/Client"
import { EventRequest } from "./types/Request"
import { EventResourceServer } from "./types/ResourceServer"
import { EventTenant } from "./types/Tenant"
import { EventTransaction } from "./types/Transaction"


export type EventRequestCC = Omit<EventRequest, 'query' >;
export type EventTransactionCC = Pick<EventTransaction, 'requested_scopes' >;
export interface CredentialsExchangeEvent {
    /**
     * Information about the access token to be issued.
     */
    accessToken: EventAccessToken | undefined,
    /**
     * Information about the Client with which this login transaction was initiated.
     */
    client: EventClient,
    /**
     * Details about the request that initiated the transaction.
     */
    request: EventRequestCC,
    /**
     * Details about the resource server to which the access is being requested.
     */
    resource_server: EventResourceServer | undefined,
    /**
     * Details about the Tenant associated with the current transaction.
     */
    tenant: EventTenant,
    /**
     * Details about the current transaction.
     */
    transaction: EventTransactionCC | undefined,
    /**
     * An object containing the secrets set in the Auth0 Management Dashboard. 
     */
    secrets: {[key:string]:String},
    //There's multiple undocumented objects within event
    [key:string]:any
}













