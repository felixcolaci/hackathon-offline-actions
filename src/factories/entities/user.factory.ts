import { faker } from "@faker-js/faker/locale/de";
import { EventUser } from "@auth0-testing/types/Event/types/User";
import { InternalMockUser } from "./internal/user";

interface CreateMockUserOptions {
  user?: EventUser;
  connection?: string;
}

export class MockUser extends InternalMockUser {
  constructor(user_id: string) {
    super(user_id);
  }

  /**
   * internally used to populate user profile
   * if certain profile attributes are omitted we generate mock data
   * @param user
   */
  private applyProfileOrAddRandomData(user?: EventUser) {
    this.email_verified = user?.email_verified || true;
    this.username = user?.username || this.email;
    this.family_name = user?.family_name || faker.person.lastName();
    this.given_name = user?.given_name || faker.person.firstName();
    this.name = user?.name || faker.person.fullName({ firstName: this.given_name, lastName: this.family_name });
    this.email = user?.email || faker.internet.exampleEmail({ firstName: this.given_name, lastName: this.family_name });
    this.phone_number = user?.phone_number || faker.phone.number();
    this.phone_verified = user?.phone_verified || true;
  }

  /**
   * Mock a database user
   *
   * @param options
   * @returns
   */
  static fromDatabase(options?: CreateMockUserOptions): EventUser {
    const connection = options?.connection || "Username-Password-Authentication";
    const u = new MockUser(`auth0|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(options?.user);
    u.identities = [
      {
        provider: "auth0",
        user_id: u.user_id,
        connection: connection,
        isSocial: false,
      },
    ];
    return u;
  }

  /**
   * Mock a facebook user
   * @param options
   * @returns
   */
  static fromFacebook(options?: CreateMockUserOptions): EventUser {
    const connection = options?.connection || "facebook";
    const u = new MockUser(`facebook|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(options?.user);
    u.identities = [
      {
        provider: "facebook",
        user_id: u.user_id,
        connection: connection,
        isSocial: true,
        profileData: options?.user,
      },
    ];
    return u;
  }

  /**
   * Mock a google user
   *
   * @param options
   * @returns
   */
  static fromGoogle(options?: CreateMockUserOptions): EventUser {
    const connection = options?.connection || "google-oauth2";
    const u = new MockUser(`google-oauth2|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(options?.user);
    u.identities = [
      {
        provider: "google-oauth2",
        user_id: u.user_id,
        connection: connection,
        isSocial: true,
        profileData: options?.user,
      },
    ];
    return u;
  }
}
