import { EventAuthentication } from "./types/Authentication"
import { PostLoginEventRequest as EventRequest } from "./types/Request"
import { PostLoginEventTransaction as EventTransaction } from "./types/Transaction"
import { PostLoginEventUser as EventUser } from "./types/User"

export interface PostLoginEvent {
    authentication: EventAuthentication | undefined,
    authorization: EventAuthorization | undefined,
    client: EventClient,
    connection: EventConnection,
    organization: EventOrganization | undefined,
    request: EventRequest,
    resource_server: EventResourceServer | undefined,
    stats: EventStats,
    tenant: EventTenant,
    transaction: EventTransaction | undefined,
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