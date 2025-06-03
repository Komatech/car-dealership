import { BaseRepository } from "@app/helpers/database/repository";
import { UserDocument, UserModel } from "./models/user.model";
import { injectable } from "inversify";

@injectable()
export class UserService extends BaseRepository<UserDocument> {
  constructor() {
    super(UserModel);
  }

  public async getByEmail(email: string) {
    return this.model.findOne({email: email});
  }
}
