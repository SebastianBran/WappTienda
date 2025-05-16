import { Role } from 'src/users/entities/role.enum';

export interface AuthRequestPayload {
  username: string;
  role: Role;
  sub: number;
  iat?: number;
  exp?: number;
}
