import { DataSource, Repository } from "typeorm";
import AppUser from "../db/entity/AppUser";

class UserService {
  private userRepo: Repository<AppUser>;
  constructor(dataSource: DataSource) {
    this.userRepo = dataSource.getRepository(AppUser);
  }

  getUser = async (id: number) => {
    const user = await this.userRepo.findOneBy({ id });
    return user;
  };
}

export default UserService;
