export interface EventClient {
    /**
     * The client id of the application the user is logging in to.
     */
    client_id: String,
    /**
     * An object for holding other application properties.
     */
    metadata: { [key: string]: String },
    /**
     * The name of the application (as defined in the Dashboard).
     */
    name: String
}