import { faker } from "@faker-js/faker/locale/de";
import {
  EventUser,
  EventUserEnrolledFactor,
  EventUserIdentity,
  EventUserMetadata,
} from "@auth0-testing/types/Event/types/User";
import { InternalMockUser } from "../internal/user";

/**
 * TODO: implement mfa methods
 * TODO: implement some smart ass stuff to generate more connection specific users
 */
export class MockUser {
  private _user: InternalMockUser;

  constructor(user_id: string) {
    this._user = new InternalMockUser(user_id);
  }

  /**
   * internally used to populate user profile
   * if certain profile attributes are omitted we generate mock data
   * @param user
   */
  private applyProfileOrAddRandomData(user?: Partial<EventUser>) {
    this._user.email_verified = user?.email_verified || true;
    this._user.username = user?.username || this._user.email;
    this._user.family_name = user?.family_name || faker.person.lastName();
    this._user.given_name = user?.given_name || faker.person.firstName();
    this._user.name =
      user?.name || faker.person.fullName({ firstName: this._user.given_name, lastName: this._user.family_name });
    this._user.email =
      user?.email ||
      faker.internet.exampleEmail({ firstName: this._user.given_name, lastName: this._user.family_name });
    this._user.phone_number = user?.phone_number || faker.phone.number();
    this._user.phone_verified = user?.phone_verified || true;
  }

  /**
   * Mock a database user
   *
   * @param options
   * @returns
   */
  static fromDatabase(user?: Partial<EventUser>, connectionName?: string): MockUser {
    const u = new MockUser(`auth0|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(user);
    u._user.identities = [
      {
        provider: "auth0",
        user_id: u._user.user_id,
        connection: connectionName || "Username-Password-Authentication",
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
  static fromFacebook(user?: Partial<EventUser>, connectionName?: string): MockUser {
    const u = new MockUser(`facebook|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(user);
    u._user.identities = [
      {
        provider: "facebook",
        user_id: u._user.user_id,
        connection: connectionName || "facebook",
        isSocial: true,
        profileData: user,
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
  static fromGoogle(user?: Partial<EventUser>, connectionName?: string): MockUser {
    const u = new MockUser(`google-oauth2|${faker.string.uuid()}`);
    u.applyProfileOrAddRandomData(user);
    u._user.identities = [
      {
        provider: "google-oauth2",
        user_id: u._user.user_id,
        connection: connectionName || "google-oauth2",
        isSocial: true,
        profileData: user,
      },
    ];
    return u;
  }

  /**
   *
   *
   * Proxies
   *
   */

  get identity(): EventUserIdentity {
    return this._user.identity;
  }

  /**
   * add an identity to an existing profile to mock a linked account
   *
   * @param identity
   * @returns
   */
  addIdentity(identity: EventUserIdentity): MockUser {
    this._user = this._user.addIdentity(identity);
    return this;
  }

  /**
   * remove a ser identity so mock unlinking of an account
   * @param identity
   * @returns
   */
  removeIdentity(identity: EventUserIdentity): MockUser {
    this._user = this._user.removeIdentity(identity);
    return this;
  }

  /**
   * provide user metadata
   * @param metadata
   * @returns
   */
  setUserMetadata(metadata: EventUserMetadata): MockUser {
    this._user = this._user.setUserMetadata(metadata);
    return this;
  }

  /**
   * provide app metadata
   * @param metadata
   * @returns
   */
  setAppMetadata(metadata: EventUserMetadata): MockUser {
    this._user = this._user.setAppMetadata(metadata);
    return this;
  }
  /**
   * mock a user enrolled in an mfa factor
   * @param factor
   * @returns
   */
  addFactorEnrollment(factor: EventUserEnrolledFactor): MockUser {
    this._user = this._user.addFactorEnrollment(factor);
    return this;
  }

  /**
   * Lock and return user
   */
  build(): EventUser {
    return this._user.build();
  }
}
