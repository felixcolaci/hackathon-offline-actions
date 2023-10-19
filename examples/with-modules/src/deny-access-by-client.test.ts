import { MockClient } from "@felixcolaci/auth0-testing";
import { denyAccess } from "./deny-access-by-client";

describe("deny access for certain clients", () => {
  it("should return false for a non denied client", async () => {
    const mockClient = new MockClient().build();
    const denied = denyAccess(mockClient);
    expect(denied).toBe(false);
  });
  it("should return true for a denied client", async () => {
    const mockClient = new MockClient({ name: "my-web-app" }).build();
    const denied = denyAccess(mockClient);
    expect(denied).toBe(true);
  });
});
