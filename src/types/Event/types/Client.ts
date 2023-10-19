export interface EventClient {
  /**
   * The client id of the application the user is logging in to.
   */
  client_id: string;
  /**
   * An object for holding other application properties.
   */
  metadata: { [key: string]: string };
  /**
   * The name of the application (as defined in the Dashboard).
   */
  name: string;
}
