import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import Option from "./Option";
import Vote from "./Vote";

@Entity()
class TodayOption extends DefaultColumns {
  @Column()
  date: Date;

  @ManyToOne(() => Code, (code) => code.todayOptions)
  code: Code;

  @ManyToOne(() => Option)
  option: Option;

  @OneToMany(() => Vote, (vote) => vote.todayOption)
  votes: Vote[];
}

export default TodayOption;
