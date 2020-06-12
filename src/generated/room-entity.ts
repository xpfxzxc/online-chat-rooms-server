import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ChatMessageEntity } from "./chat-message-entity";
import { UserEntity } from "./user-entity";
import { UserRoomEntity } from "./user-room-entity";

@Index("room_pkey", ["id"], { unique: true })
@Entity("room", { schema: "public" })
export class RoomEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("text", { name: "introduction" })
  introduction: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()"
  })
  created_at: Date;

  @OneToMany(
    () => ChatMessageEntity,
    ChatMessageEntity => ChatMessageEntity.room
  )
  chat_messages: ChatMessageEntity[];

  @ManyToOne(
    () => UserEntity,
    UserEntity => UserEntity.rooms,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "host_id", referencedColumnName: "id" }])
  host: UserEntity;

  @OneToMany(
    () => UserRoomEntity,
    UserRoomEntity => UserRoomEntity.room
  )
  user_rooms: UserRoomEntity[];
}
