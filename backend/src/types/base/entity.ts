export class Entity {
  private _id = '';

  public set id(value: string) {
    this._id = value;
  }

  public get id(): string {
    return this._id;
  }

}
