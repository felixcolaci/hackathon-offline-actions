import { faker } from "@faker-js/faker/locale/de";
import { PostLoginEvent } from "@auth0-testing/types/Event/PostLoginEvent";
import { EventAuthentication } from "@auth0-testing/types/Event/types/Authentication";
import { EventAuthorization } from "@auth0-testing/types/Event/types/Authorization";
import { EventClient } from "@auth0-testing/types/Event/types/Client";
import { EventConnection } from "@auth0-testing/types/Event/types/Connection";
import { EventOrganization } from "@auth0-testing/types/Event/types/Organization";
import { EventRequest } from "@auth0-testing/types/Event/types/Request";
import { EventResourceServer } from "@auth0-testing/types/Event/types/ResourceServer";
import { EventStats } from "@auth0-testing/types/Event/types/Stats";
import { EventTenant } from "@auth0-testing/types/Event/types/Tenant";
import { EventTransaction } from "@auth0-testing/types/Event/types/Transaction";
import { EventUser } from "@auth0-testing/types/Event/types/User";

export class MockPostLoginEvent implements PostLoginEvent {
  [key: string]: any;
  authentication: EventAuthentication | undefined;
  authorization: EventAuthorization | undefined;
  client: EventClient;
  connection: EventConnection;
  organization: EventOrganization | undefined;
  request: EventRequest;
  resource_server: EventResourceServer | undefined;
  stats: EventStats;
  tenant: EventTenant;
  transaction: EventTransaction | undefined;
  user: EventUser;
  secrets: { [key: string]: String };

  constructor(user: EventUser) {
    this.user = user;
    // TODO: extract to own factory
    this.client = {
      client_id: faker.string.uuid(),
      metadata: {},
      name: "Default Client",
    };
    this.secrets = {};
    // TODO: Extract to own factory
    this.request = {
      body: {},
      geoip: {},
      hostname: "test.auth0.com",
      ip: "0.0.0.0",
      language: "de",
      method: "POST",
      query: {},
      user_agent: "example-user-agent",
    };
    this.stats = {
      logins_count: 1,
    };
    this.tenant = {
      id: "test.auth0.com",
    };
    // TODO: extract to own factory
    this.connection = {
      id: faker.string.uuid(),
      name: "TestConnection",
      strategy: this.user.identities[0].provider || "auth0",
      metadata: {},
    };
  }

  fromClient(client: EventClient): MockPostLoginEvent {
    this.client = client;
    return this;
  }
  withConnection(connection: EventConnection): MockPostLoginEvent {
    this.connection = connection;
    return this;
  }
  withAuthentication(authentication: EventAuthentication): MockPostLoginEvent {
    this.authentication = authentication;
    return this;
  }
  withAuthorization(authorization: EventAuthorization): MockPostLoginEvent {
    this.authorization = authorization;
    return this;
  }
  withOrganization(organization: EventOrganization): MockPostLoginEvent {
    this.organization = organization;
    return this;
  }
  setSecret(key: string, value: string): MockPostLoginEvent {
    this.secrets[key] = value;
    return this;
  }
  setRequest(request: EventRequest): MockPostLoginEvent {
    this.request = request;
    return this;
  }
  setStats(stats: EventStats): MockPostLoginEvent {
    this.stats = stats;
    return this;
  }
}
