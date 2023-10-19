import {
  EventUser,
  EventUserEnrolledFactor,
  EventUserIdentity,
  EventUserMetadata,
} from "@felixcolaci/auth0-actions-type-definitions";
import { faker } from "@faker-js/faker/locale/de";

export class InternalMockUser implements EventUser {
  app_metadata: { [key: string]: any };
  created_at: string;
  email: string | undefined;
  email_verified: boolean;
  enrolledFactors: EventUserEnrolledFactor[];
  family_name: string | undefined;
  given_name: string | undefined;
  identities: EventUserIdentity[];
  last_password_reset: string | undefined;
  multifactor: string[] | undefined;
  name: string | undefined;
  nickname: string | undefined;
  phone_number: string | undefined;
  phone_verified: boolean | undefined;
  picture: string | undefined;
  updated_at: string;
  user_id: string;
  user_metadata: { [key: string]: any };
  username: string | undefined;

  constructor(user_id?: string) {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
    this.app_metadata = {};
    this.user_metadata = {};
    this.user_id = user_id || faker.string.uuid();
    this.identities = [];
    this.email_verified = false;
    this.enrolledFactors = [];
  }

  get identity(): EventUserIdentity {
    return this.identities[0];
  }

  /**
   * add an identity to an existing profile to mock a linked account
   *
   * @param identity
   * @returns
   */
  addIdentity(identity: EventUserIdentity): InternalMockUser {
    if (!this.identities) {
      this.identities = [identity];
    } else {
      this.identities.push(identity);
    }
    return this;
  }

  /**
   * remove a ser identity so mock unlinking of an account
   * @param identity
   * @returns
   */
  removeIdentity(identity: EventUserIdentity): InternalMockUser {
    this.identities = this.identities.filter((id) => id.user_id === identity.user_id);
    return this;
  }

  /**
   * provide user metadata
   * @param metadata
   * @returns
   */
  setUserMetadata(metadata: EventUserMetadata): InternalMockUser {
    this.user_metadata = metadata;
    return this;
  }

  /**
   * provide app metadata
   * @param metadata
   * @returns
   */
  setAppMetadata(metadata: EventUserMetadata): InternalMockUser {
    this.app_metadata = metadata;
    return this;
  }
  /**
   * mock a user enrolled in an mfa factor
   * @param factor
   * @returns
   */
  addFactorEnrollment(factor: EventUserEnrolledFactor): InternalMockUser {
    if (!this.enrolledFactors) {
      this.enrolledFactors = [factor];
    } else {
      this.enrolledFactors.push(factor);
    }
    return this;
  }

  /**
   * Lock and return user
   */
  build(): EventUser {
    Object.freeze(this);
    return this as EventUser;
  }
}
