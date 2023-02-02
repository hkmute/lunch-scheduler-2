import { Column, Entity, ManyToOne, Unique } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import TodayOption from "./TodayOption";

@Entity()
@Unique("day_vote", ["date", "voter", "code"])
class Vote extends DefaultColumns {
  @Column()
  date: Date;

  @Column()
  voter: string;

  @ManyToOne(() => Code, (code) => code.votes)
  code: Code;

  @ManyToOne(() => TodayOption, (option) => option.votes)
  todayOption: TodayOption;
}

export default Vote;
