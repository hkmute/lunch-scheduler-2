import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { DefaultColumns } from "./DefaultColumns";
import AppUser from "./AppUser";
import Code from "./Code";

@Entity()
class PushToken extends DefaultColumns {
  @Column()
  expoToken: string;

  @ManyToOne(() => AppUser, { nullable: true })
  user: AppUser;

  @ManyToOne(() => Code, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  code: Code;
}

export default PushToken;
