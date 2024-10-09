export interface JwtPayload {
  sub: string;
  jti: string;
  UserId: string;
  Username: string;
  exp: number;
  iss: string;
  aud: string;
}
