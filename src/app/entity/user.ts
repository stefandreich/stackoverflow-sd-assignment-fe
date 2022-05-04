export class User {
  userId!: number;

  constructor(
    public username: string,
    public email: string,
    public password: string
  ) {}
}
