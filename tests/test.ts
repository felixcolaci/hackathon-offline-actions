import { MockPostLoginEvent, MockUser } from "../src/factories";

const mockUser = MockUser.fromFacebook({ email: "i-am-not-generated@atko.email" })
  // add a linked account
  .addIdentity(MockUser.fromGoogle().identity)
  // overwrite metadata
  .setUserMetadata({ foo: "bar" })
  // enroll with mfa
  .addFactorEnrollment({ type: "email", options: {} })
  // lock object
  .build();

console.log(JSON.stringify(mockUser, null, 2));

const event = new MockPostLoginEvent(mockUser).build();
