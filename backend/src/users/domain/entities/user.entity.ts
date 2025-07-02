import { Role } from './role.enum';

export class User {
  constructor(
    private id: number,
    private username: string,
    private password: string,
    private role: Role,
    private isMaster: boolean = false,
    private createdAt: Date = new Date(),
    private updatedAt: Date = new Date(),
  ) {}

  public getId(): number {
    return this.id;
  }

  public getUsername(): string {
    return this.username;
  }

  public getPassword(): string {
    return this.password;
  }

  public getRole(): Role {
    return this.role;
  }

  public isMasterUser(): boolean {
    return this.isMaster;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public setRole(role: Role): void {
    this.role = role;
  }

  public setMaster(isMaster: boolean): void {
    this.isMaster = isMaster;
  }

  public setCreatedAt(createdAt: Date): void {
    this.createdAt = createdAt;
  }

  public setUpdatedAt(updatedAt: Date): void {
    this.updatedAt = updatedAt;
  }
}
