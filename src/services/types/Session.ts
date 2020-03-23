export interface Session {
  validToken: boolean;
  signUpSuccessful: boolean;
  wrongPassword: boolean;
  token: string;
  tokenExpirationDate: number;
  user: User;
}

export interface User {
  id: number;
  username: string;
  registeredUser: boolean;
  fullName: string;
}
