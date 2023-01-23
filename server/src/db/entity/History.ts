import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Code from "./Code";
import { DefaultColumns } from "./DefaultColumns";
import Option from "./Option";

@Entity()
class History extends DefaultColumns {
  @Column()
  date: Date;

  @ManyToOne(() => Code, (code) => code.history)
  code: Code;

  @ManyToOne(() => Option)
  option: Option;
}

export default History;
