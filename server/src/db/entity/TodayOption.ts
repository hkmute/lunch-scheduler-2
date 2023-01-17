import { Column, Entity, ManyToOne } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import Option from "./Option";

@Entity()
class TodayOption extends DefaultColumns {
  @Column()
  date: Date;

  @ManyToOne(() => Code, (code) => code.todayOptions)
  code: Code;

  @ManyToOne(() => Option)
  option: Option;
}

export default TodayOption;
