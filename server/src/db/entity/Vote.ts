import { Column, Entity, ManyToOne, Unique } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import TodayOption from "./TodayOption";

export enum VoteType {
  UP = "up",
  DOWN = "down",
}

@Entity()
@Unique("day_vote", ["date", "voter", "code", "type"])
class Vote extends DefaultColumns {
  @Column()
  date: Date;

  @Column()
  voter: string;

  @Column({
    type: "enum",
    enum: VoteType,
    default: VoteType.UP,
  })
  type: VoteType;

  @ManyToOne(() => Code, (code) => code.votes)
  code: Code;

  @ManyToOne(() => TodayOption, (option) => option.votes)
  todayOption: TodayOption;
}

export default Vote;
