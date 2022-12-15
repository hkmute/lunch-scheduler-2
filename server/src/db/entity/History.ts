import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Code from "./Code";
import Option from "./Option";

@Entity()
class History {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(() => Code, (code) => code.history)
  code: Code;

  @ManyToOne(() => Option)
  option: Option;
}

export default History;
