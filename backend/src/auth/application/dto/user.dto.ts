export enum Role {
  ADMIN = 'ADMIN',
  WRITER = 'WRITER',
  READER = 'READER',
}

export class UserDto {
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
}
