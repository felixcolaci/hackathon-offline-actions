import { EventUser, PostLoginAPI, PostLoginEvent } from "@felixcolaci/auth0-actions-type-definitions";
import { MockClient, MockPostLoginApi, MockPostLoginEvent, MockUser } from "@felixcolaci/auth0-testing";

const { onExecutePostLogin } = require("./action");

describe("test-action", () => {
  describe("basic tests", () => {
    let mockApi: PostLoginAPI;
    let mockEvent: PostLoginEvent;

    beforeEach(() => {
      const user = MockUser.fromDatabase().build();
      mockEvent = new MockPostLoginEvent(user).build();
      mockApi = new MockPostLoginApi();
    });

    it("should add claim foo with value bar to the access token", async () => {
      await onExecutePostLogin(mockEvent, mockApi);
      expect(mockApi.accessToken.setCustomClaim).toBeCalledWith("foo", "bar");
    });

    it("access should not be revoked", async () => {
      await onExecutePostLogin(mockEvent, mockApi);
      expect(mockApi.access.deny).not.toBeCalled();
    });
  });

  describe("client based access", () => {
    let mockApi: PostLoginAPI;
    let mockUser: EventUser;

    beforeEach(() => {
      mockUser = MockUser.fromDatabase().build();
      mockApi = new MockPostLoginApi();
    });

    it("should allow access if client is not web-app", async () => {
      const mockEvent = new MockPostLoginEvent(mockUser).build();
      await onExecutePostLogin(mockEvent, mockApi);
      expect(mockApi.access.deny).not.toBeCalled();
    });

    it("should deny access if client is web-app", async () => {
      const mockEvent = new MockPostLoginEvent(mockUser)
        .fromClient(new MockClient({ name: "my-web-app" }).build())
        .build();
      await onExecutePostLogin(mockEvent, mockApi);
      expect(mockApi.access.deny).toBeCalled();
      expect(mockApi.access.deny).toHaveBeenCalledWith("unallowed client");
    });
  });
});
