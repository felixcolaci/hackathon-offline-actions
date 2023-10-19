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
