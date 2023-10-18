export interface EventOrganization {
    /**
     * The friendly name of the Organization.
     */
    display_name: String,
    /**
     * The Organization identifier.
     */
    id: String,
    /**
     * The name of the Organization.
     */
    name: String,
    /**
     * Metadata associated with the Organization.
     */
    metadata: { [key: string]: string }
}