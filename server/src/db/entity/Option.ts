import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import OptionList from "./OptionList";

@Entity()
class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => OptionList, (optionList) => optionList.options)
  optionLists: OptionList[];
}

export default Option;
