import { MockClient, MockPostLoginApi, MockPostLoginEvent, MockUser } from "@felixcolaci/auth0-testing";
import { EventUser, PostLoginAPI } from "@felixcolaci/auth0-actions-type-definitions";

const { onExecutePostLogin } = require("./action");
jest.mock("./src/deny-access-by-client.ts", () => {
  return {
    denyAccess: jest
      .fn()
      .mockImplementationOnce(() => true)
      .mockImplementationOnce(() => false),
  };
});
describe("complex action", () => {
  let mockApi: PostLoginAPI;
  let user: EventUser;
  beforeEach(() => {
    user = MockUser.fromDatabase().build();
    mockApi = new MockPostLoginApi();
  });
  it("should fail authentication for a denied client", async () => {
    const mockEvent = new MockPostLoginEvent(user).fromClient(new MockClient({ name: "my-web-app" }).build()).build();

    await onExecutePostLogin(mockEvent, mockApi);

    expect(mockApi.access.deny).toHaveBeenCalled();
  });
  it("should not fail authentication for a denied client", async () => {
    const mockEvent = new MockPostLoginEvent(user).build();

    await onExecutePostLogin(mockEvent, mockApi);

    expect(mockApi.access.deny).not.toHaveBeenCalled();
  });
  afterAll(() => {
    jest.clearAllMocks();
  });
});
