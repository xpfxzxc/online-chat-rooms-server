import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RoomEntity } from "./room-entity";
import { UserEntity } from "./user-entity";

@Index("user_room_pkey", ["room_id", "user_id"], { unique: true })
@Entity("user_room", { schema: "public" })
export class UserRoomEntity {
  @Column("integer", { primary: true, name: "user_id" })
  user_id: number;

  @Column("integer", { primary: true, name: "room_id" })
  room_id: number;

  @Column("timestamp with time zone", {
    name: "user_enter_at",
    default: () => "now()"
  })
  user_enter_at: Date;

  @Column("timestamp with time zone", {
    name: "user_last_typed",
    nullable: true
  })
  user_last_typed: Date | null;

  @Column("timestamp with time zone", {
    name: "user_last_reply",
    nullable: true
  })
  user_last_reply: Date | null;

  @ManyToOne(
    () => RoomEntity,
    RoomEntity => RoomEntity.user_rooms,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room: RoomEntity;

  @ManyToOne(
    () => UserEntity,
    UserEntity => UserEntity.user_rooms,
    { onDelete: "RESTRICT", onUpdate: "CASCADE" }
  )
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: UserEntity;
}
