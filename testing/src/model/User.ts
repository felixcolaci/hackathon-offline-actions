import { Factor, UserIdentity, UserIdentityUserId, UserProfile } from "auth0";
import { ProfileOptions } from "./profile-options";
import { faker } from "@faker-js/faker/locale/de";

type FACTOR_TYPE =
  | "push-notification"
  | "phone"
  | "email"
  | "email-verification"
  | "otp"
  | "webauthn-roaming"
  | "webauthn-platform"
  | "passkey";
type MULTIFACTOR_TYPE = "duo" | "none" | "guardian" | "google-authenticator" | "any";

interface Metadata {
  [key: string]: unknown;
}
interface EnrolledFactor {
  type: FACTOR_TYPE;
  options: Metadata;
}

export class User implements UserProfile {
  user_id: string;
  email?: string;
  email_verified?: boolean | undefined;
  name?: string | undefined;
  username?: string | undefined;
  given_name?: string | undefined;
  phone_number?: string | undefined;
  phone_verified?: boolean | undefined;
  family_name?: string | undefined;
  [key: string]: any | any;
  connection: string;
  enrolledFactors: EnrolledFactor[] = [];

  identities: UserIdentity[] = [];
  user_metadata: Metadata | undefined;
  app_metadata: Metadata | undefined;

  constructor(options: { connectionName: string; user_id: string }) {
    this.connection = options.connectionName;
    this.user_id = options.user_id;
  }

  private applyProfileOrAddRandomData(user?: UserProfile) {
    this.email_verified = user?.email_verified || true;
    this.username = user?.username || this.email;
    this.family_name = user?.family_name || faker.person.lastName();
    this.given_name = user?.given_name || faker.person.firstName();
    this.name = user?.name || faker.person.fullName({ firstName: this.given_name, lastName: this.family_name });
    this.email = user?.email || faker.internet.exampleEmail({ firstName: this.given_name, lastName: this.family_name });
    this.phone_number = user?.phone_number || faker.phone.number();
    this.phone_verified = user?.phone_verified || true;
  }

  static fromDatabase(user?: UserProfile, connection?: string): User {
    const u = new User({
      connectionName: connection || "Username-Password-Authentication",
      user_id: `auth0|${faker.string.uuid()}`,
    });
    u.applyProfileOrAddRandomData(user);
    u.identities = [
      {
        provider: "auth0",
        user_id: u.user_id,
        connection: u.connection,
        isSocial: false,
      },
    ];
    return u;
  }
  static fromFacebook(user?: UserProfile, connection?: string): User {
    const u = new User({
      connectionName: connection || "facebook",
      user_id: `facebook|${faker.string.uuid()}`,
    });
    u.applyProfileOrAddRandomData(user);
    u.identities = [
      {
        provider: "facebook",
        user_id: u.user_id,
        connection: u.connection,
        isSocial: true,
      },
    ];
    return u;
  }
  static fromGoogle(user?: UserProfile, connection?: string): User {
    const u = new User({
      connectionName: connection || "google-oauth2",
      user_id: `google-oauth2|${faker.string.uuid()}`,
    });
    u.applyProfileOrAddRandomData(user);
    u.identities = [
      {
        provider: "google-oauth2",
        user_id: u.user_id,
        connection: u.connection,
        isSocial: true,
      },
    ];
    return u;
  }

  get identity(): UserIdentity {
    return {
      user_id: this.user_id,
      connection: this.connection,
      isSocial: !this.user_id.includes("auth0"),
      profileData: this,
      provider: this.user_id.split("|")[0],
    };
  }

  addIdentity(identity: UserIdentity): User {
    if (!this.identities) {
      this.identities = [identity];
    } else {
      this.identities.push(identity);
    }
    return this;
  }

  removeIdentity(identity: UserIdentity): User {
    this.identities = this.identities.filter((id) => id.user_id === identity.user_id);
    return this;
  }
  setUserMetadata(metadata: Metadata): User {
    this.user_metadata = metadata;
    return this;
  }
  setAppMetadata(metadata: Metadata): User {
    this.app_metadata = metadata;
    return this;
  }
  addFactorEnrollment(factor: EnrolledFactor): User {
    if (!this.enrolledFactors) {
      this.enrolledFactors = [factor];
    } else {
      this.enrolledFactors.push(factor);
    }
    return this;
  }
}
