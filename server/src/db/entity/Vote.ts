import { Column, Entity, ManyToOne } from "typeorm";
import { DefaultColumns } from "./DefaultColumns";
import Option from "./Option";

@Entity()
class Vote extends DefaultColumns {
  @Column()
  date: Date;

  @Column()
  user: string;

  @ManyToOne(() => Option)
  option: Option;
}

export default Vote;
