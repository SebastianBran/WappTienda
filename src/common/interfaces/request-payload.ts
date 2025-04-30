export interface RequestPayload {
  username: string;
  sub: number;
  iat?: number;
  exp?: number;
}
