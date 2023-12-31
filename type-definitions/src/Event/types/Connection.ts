export interface EventConnection {
  /**
   * The connection's unique identifier.
   */
  id: string;
  /**
   * Metadata associated with the connection.
   */
  metadata: { [key: string]: string } | undefined;
  /**
   * The name of the connection used to authenticate the user (such as twitter or some-g-suite-domain).
   */
  name: string;
  /**
   * The type of connection. For social connections, event.connection.strategy === event.connection.name. For enterprise connections, the strategy is waad (Windows Azure AD), ad (Active Directory/LDAP), auth0 (database connections), and so on.
   */
  strategy: string;
}
