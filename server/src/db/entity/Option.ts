import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import OptionList from "./OptionList";
import TodayOption from "./TodayOption";

@Entity()
@Unique(["name"])
class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => OptionList, (optionList) => optionList.options)
  optionLists: OptionList[];

  @OneToMany(() => TodayOption, (todayOption) => todayOption.option)
  todayOptions: TodayOption[];
}

export default Option;
