import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Code from "./Code";
import OptionList from "./OptionList";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  displayName: string;

  @OneToMany(() => Code, (code) => code.owner)
  codes: Code[];
  
  @OneToMany(() => OptionList, (optionList) => optionList.owner)
  optionLists: OptionList[];
}

export default User;
