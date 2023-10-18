import { EventClient } from "@auth0-testing/types/Event/types/Client";
import { faker } from "@faker-js/faker/locale/de";

interface NewMockClientProperties {
  clientId?: string;
  name?: string;
  metadata?: { [key: string]: string };
}

export class MockClient {
  private _client: EventClient;

  constructor(props?: Partial<NewMockClientProperties>) {
    this._client = {
      client_id: props?.clientId || faker.string.uuid(),
      metadata: props?.metadata || {},
      name: props?.name || "Default Client",
    };
  }
  withMetadata(metadata: { [key: string]: string }): MockClient {
    this._client.metadata = metadata;
    return this;
  }

  build() {
    Object.freeze(this);
    return this._client;
  }
}
