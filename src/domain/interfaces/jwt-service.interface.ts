export interface JwtService {
  sign(payload: { uid: string }): string;
  signAccessToken(payload: { uid: string }): string;
  signRefreshToken(payload: { uid: string }): string;
}
