import { EventClient } from "@felixcolaci/auth0-testing";

const denyListedClients = ["my-web-app"];

export const denyAccess = (client: EventClient): boolean => {
  return denyListedClients.includes(client.name);
};
