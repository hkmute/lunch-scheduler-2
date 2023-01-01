import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Code from "./Code";
import Option from "./Option";
import AppUser from "./AppUser";
import { DefaultColumns } from "./DefaultColumns";

@Entity()
class OptionList extends DefaultColumns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => AppUser, (user) => user.optionLists)
  owner: AppUser;

  @OneToMany(() => Code, (code) => code.optionList)
  code: Code[];

  @ManyToMany(() => Option, (option) => option.optionLists, {
    cascade: ["insert"],
  })
  @JoinTable({
    name: "option_in_list",
  })
  options: Option[];
}

export default OptionList;
