import { Column, Entity, OneToMany } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import OptionList from "./OptionList";

@Entity()
class AppUser extends DefaultColumns {
  @Column()
  username: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  displayName: string;

  @OneToMany(() => Code, (code) => code.owner)
  codes: Code[];

  @OneToMany(() => OptionList, (optionList) => optionList.owner)
  optionLists: OptionList[];
}

export default AppUser;
