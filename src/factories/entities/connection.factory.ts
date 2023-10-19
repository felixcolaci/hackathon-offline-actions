import { EventConnection, EventUser } from "../../types/Event/types";
import { faker } from "@faker-js/faker/locale/de";

export class MockConnection {
  private _connection: EventConnection;

  constructor(props?: Partial<EventConnection>) {
    this._connection = {
      id: props?.id || faker.string.uuid(),
      strategy: props?.strategy || "auth0",
      name: props?.name || "Username-Password-Authentication",
      metadata: {},
    };
  }

  setMetadata(metadata: { [key: string]: string }): MockConnection {
    this._connection.metadata = metadata;
    return this;
  }

  deriveFromUser(user: EventUser): MockConnection {
    this._connection.strategy = user.identities[0].provider || "auth0";
    this._connection.name = user.identities[0].connection || "Username-Password-Authentication";
    return this;
  }

  build(): EventConnection {
    Object.freeze(this);
    return this._connection;
  }
}
