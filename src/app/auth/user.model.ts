export class User {
  constructor(
    public id: number,
    public tokenExpirationTime: any,
    private _token: string
  ) {}

  get token() {
    return this._token;
  }
}
