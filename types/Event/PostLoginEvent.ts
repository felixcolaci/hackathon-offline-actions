import { EventAuthentication } from "./Objects/Authentication"
import { PostLoginEventRequest as EventRequest } from "./Objects/Request"
import { PostLoginEventTransaction as EventTransaction } from "./Objects/Transaction"
import { PostLoginEventUser as EventUser } from "./Objects/User"

export interface PostLoginEvent {
    authentication: EventAuthentication,
    authorization: EventAuthorization | undefined,
    client: EventClient,
    connection: EventConnection,
    organization: EventOrganization | undefined,
    request: EventRequest,
    resource_server: EventResourceServer | undefined,
    stats: EventStats,
    tenant: EventTenant,
    transaction: EventTransaction,
    user: EventUser
}

interface EventTenant {
    id: String
}

interface EventStats {
    logins_count: number
}

interface EventResourceServer {
    identifier: String
}

interface EventOrganization {
    display_name: String,
    id: String,
    name: String,
    metadata: { [key: string]: string }
}

interface EventConnection {
    id: String,
    metadata: { [key: string]: String },
    name: String,
    strategy: String
}

interface EventClient {
    client_id: String,
        metadata: { [key: string]: String },
        name: String
}

interface EventAuthorization {
    roles: Array<string>
}