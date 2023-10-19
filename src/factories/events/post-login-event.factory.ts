import {
  EventAuthentication,
  EventAuthorization,
  EventClient,
  EventConnection,
  EventOrganization,
  EventRequest,
  EventStats,
  EventTenant,
  EventUser,
  PostLoginEvent,
} from "@auth0-testing/types/Event";
import { MockRequest } from "../entities";
import { MockClient } from "../entities/client.factory";
import { MockConnection } from "../entities/connection.factory";

/**
 * TODO: implement risk score
 * TODO: implement mfa
 */
export class MockPostLoginEvent {
  private _event: PostLoginEvent;

  constructor(user: EventUser) {
    this._event = {
      user,
      client: new MockClient().build(),
      request: new MockRequest().build(),
      connection: new MockConnection().build(),
      stats: {
        logins_count: 1,
      },
      tenant: {
        id: "test",
      },
      secrets: {},
      authentication: undefined,
      authorization: undefined,
      organization: undefined,
      resource_server: undefined,
      transaction: undefined,
    };
  }

  fromClient(client: EventClient): MockPostLoginEvent {
    this._event.client = client;
    return this;
  }
  withConnection(connection: EventConnection): MockPostLoginEvent {
    this._event.connection = connection;
    return this;
  }
  withAuthentication(authentication: EventAuthentication): MockPostLoginEvent {
    this._event.authentication = authentication;
    return this;
  }
  withAuthorization(authorization: EventAuthorization): MockPostLoginEvent {
    this._event.authorization = authorization;
    return this;
  }
  withOrganization(organization: EventOrganization): MockPostLoginEvent {
    this._event.organization = organization;
    return this;
  }
  setSecret(key: string, value: string): MockPostLoginEvent {
    this._event.secrets[key] = value;
    return this;
  }
  setRequest(request: EventRequest): MockPostLoginEvent {
    this._event.request = request;
    return this;
  }
  setStats(stats: EventStats): MockPostLoginEvent {
    this._event.stats = stats;
    return this;
  }
  setTenant(tenant: EventTenant): MockPostLoginEvent {
    this._event.tenant = tenant;
    return this;
  }
  build(): PostLoginEvent {
    Object.freeze(this);
    return this._event;
  }
}
