import { EventClient } from "@auth0-testing/types/Event";

const denyListedClients = ["my-web-app"];

export const denyAccess = (client: EventClient): boolean => {
  return denyListedClients.includes(client.name);
};
