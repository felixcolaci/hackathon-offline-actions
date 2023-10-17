import { AuthenticationMethod, PostLoginEvent } from "../src";
import { User } from "../src/model/User";

const mockUser = User.fromFacebook({ email: "i-am-not-generated@atko.email" })
  .addIdentity(User.fromGoogle().identity)
  .setUserMetadata({ foo: "bar" })
  .addFactorEnrollment({ type: "email", options: {} });

console.log(JSON.stringify(mockUser, null, 2));

const event = new PostLoginEvent().byUser(mockUser).withMfa(new AuthenticationMethod()).build();
