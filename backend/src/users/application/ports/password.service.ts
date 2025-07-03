export abstract class PasswordService {
  abstract hashPassword(password: string): Promise<string>;
}
