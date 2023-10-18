export interface EventOrganization {
  /**
   * The friendly name of the Organization.
   */
  display_name: string;
  /**
   * The Organization identifier.
   */
  id: string;
  /**
   * The name of the Organization.
   */
  name: string;
  /**
   * Metadata associated with the Organization.
   */
  metadata: { [key: string]: string };
}
