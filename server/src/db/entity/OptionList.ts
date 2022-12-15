import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Option from "./Option";
import User from "./User";

@Entity()
class OptionList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.optionLists)
  owner: User;

  @ManyToMany(() => Option, (option) => option.optionLists)
  @JoinTable({
    name: "option_in_list",
  })
  options: Option[];
}

export default OptionList;
