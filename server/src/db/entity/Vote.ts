import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Option from "./Option";

@Entity()
class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  user: string;

  @ManyToOne(() => Option)
  option: Option;
}

export default Vote;
