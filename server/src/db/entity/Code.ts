import { Column, Entity, Index, ManyToOne, OneToMany, Unique } from "typeorm";
import History from "./History";
import OptionList from "./OptionList";
import TodayOption from "./TodayOption";
import AppUser from "./AppUser";
import { DefaultColumns } from "./DefaultColumns";
import Vote from "./Vote";

@Entity()
@Unique(["code"])
class Code extends DefaultColumns {
  @Index()
  @Column()
  code: string;

  @Column({
    default: true,
    nullable: true,
  })
  allowGuestEdit: boolean;

  @ManyToOne(() => AppUser, (user) => user.codes)
  owner: AppUser;

  @ManyToOne(() => OptionList, (optionList) => optionList.code)
  optionList: OptionList;

  @OneToMany(() => TodayOption, (option) => option.code)
  todayOptions: TodayOption[];

  @OneToMany(() => Vote, (option) => option.code)
  votes: Vote[];

  @OneToMany(() => History, (history) => history.code)
  history: History[];
}

export default Code;
