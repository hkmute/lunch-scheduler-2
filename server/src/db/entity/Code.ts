import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import History from "./History";
import TodayOption from "./TodayOption";
import User from "./User";

@Entity()
class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => User, (user) => user.codes)
  owner: User;

  @OneToMany(() => TodayOption, (option) => option.code)
  todayOptions: TodayOption[];

  @OneToMany(() => History, (history) => history.code)
  history: History[];
}

export default Code;
