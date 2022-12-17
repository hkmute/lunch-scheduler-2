import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import OptionList from "./OptionList";
import TodayOption from "./TodayOption";

@Entity()
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
