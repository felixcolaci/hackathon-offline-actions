import { User } from "./model/User";

export interface IPostLoginEvent {
  user?: User | undefined;

  connection: Connection | undefined;

  authenticationMethod: AuthenticationMethod | undefined;
}

export abstract class ActionsEvent {}

export class PostLoginEvent extends ActionsEvent {
  private user?: User | undefined;

  private connection: Connection | undefined;

  private authenticationMethod: AuthenticationMethod | undefined;

  byUser(user: User): PostLoginEvent {
    this.user = user;
    return this;
  }

  loginWith(connection: Connection): PostLoginEvent {
    this.connection = connection;
    return this;
  }

  withMfa(method: AuthenticationMethod): PostLoginEvent {
    this.authenticationMethod = method;
    return this;
  }

  build(): IPostLoginEvent {
    return {
      user: this.user,
      authenticationMethod: this.authenticationMethod,
      connection: this.connection,
    };
  }
}

export class AuthenticationMethod {
  name: string | undefined;
}

export class Connection {
  connection_id: string | undefined;
  name: string | undefined;
  strategy: string | undefined;
}
