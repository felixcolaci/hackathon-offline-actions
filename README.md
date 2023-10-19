# DEVELOP / TEST / DEBUG Actions locally

Disclaimer: Currently in progress at a hackathon. Not officially supported by Okta or Auth0

## Develop

## Test

```
Currently supported frameworks: jest
```

Before writing unit test you will want to create test data. You can use the developer friendly api to recreate any scenario you may encounter in your Auth0 tenant.

**Start by creating a mock user for your tests:**

```javascript
const mockUser = MockUser.fromFacebook({ email: "i-am-not-generated@atko.email" })
  // add a linked account
  .addIdentity(MockUser.fromGoogle().identity)
  // overwrite metadata
  .setUserMetadata({ foo: "bar" })
  // enroll with mfa
  .addFactorEnrollment({ type: "email", options: {} })
  // lock object
  .build();
```

Assuming you want to test a `post-login-action` create the matching event object.

```javascript
// with reasonable defaults
new MockPostLoginEvent(mockUser).build();
// or with specifics to your use-case
const client = new MockClient({ name: "my-client" }).build();
new MockPostLoginEvent(mockUser).fromClient(client).build();
```

After you have create the necessary mock-data go ahead and use them in your integration test.

```javascript
it("should add claim foo with value bar to the access token", async () => {
  // setup
  const user = MockUser.fromDatabase().build();
  const mockEvent = new MockPostLoginEvent(user).build();
  const mockApi = new MockPostLoginApi();

  // test
  await onExecutePostLogin(mockEvent, mockApi);

  // assert
  expect(mockApi.accessToken.setCustomClaim).toBeCalledWith("foo", "bar");
});
```

## Debug

Since this library is based on the nodejs tooling you are used to you can automagically use the debugger integrated in your development environment of choice - no magic wand needed!
