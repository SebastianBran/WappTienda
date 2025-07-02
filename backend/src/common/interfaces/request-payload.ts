import { Role } from 'src/users/domain/entities/role.enum';

export interface AuthRequestPayload {
  username: string;
  role: Role;
  sub: number;
  iat?: number;
  exp?: number;
}
