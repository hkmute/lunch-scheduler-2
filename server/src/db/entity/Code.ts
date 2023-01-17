import { Column, Entity, ManyToOne, OneToMany, Unique } from "typeorm";
import History from "./History";
import OptionList from "./OptionList";
import TodayOption from "./TodayOption";
import AppUser from "./AppUser";
import { DefaultColumns } from "./DefaultColumns";

@Entity()
@Unique(["code"])
class Code extends DefaultColumns {
  @Column()
  code: string;

  @ManyToOne(() => AppUser, (user) => user.codes)
  owner: AppUser;

  @ManyToOne(() => OptionList, (optionList) => optionList.code)
  optionList: OptionList;

  @OneToMany(() => TodayOption, (option) => option.code)
  todayOptions: TodayOption[];

  @OneToMany(() => History, (history) => history.code)
  history: History[];
}

export default Code;
