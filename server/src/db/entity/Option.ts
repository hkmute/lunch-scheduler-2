import { Column, Entity, ManyToMany, OneToMany, Unique } from "typeorm";
import { DefaultColumns } from "./DefaultColumns";
import OptionList from "./OptionList";
import TodayOption from "./TodayOption";

@Entity()
@Unique(["name"])
class Option extends DefaultColumns {
  @Column()
  name: string;

  @ManyToMany(() => OptionList, (optionList) => optionList.options)
  optionLists: OptionList[];

  @OneToMany(() => TodayOption, (todayOption) => todayOption.option)
  todayOptions: TodayOption[];
}

export default Option;
