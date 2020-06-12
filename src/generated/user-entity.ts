import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import { ChatMessageEntity } from "./chat-message-entity";
import { RoomEntity } from "./room-entity";
import { UserRoomEntity } from "./user-room-entity";

@Index("user_pkey", ["id"], { unique: true })
@Index("user_name_key", ["name"], { unique: true })
@Entity("user", { schema: "public" })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("character varying", { name: "name", unique: true })
  name: string;

  @Column("character varying", { name: "password" })
  password: string;

  @Column("timestamp with time zone", {
    name: "created_at",
    default: () => "now()"
  })
  created_at: Date;

  @OneToMany(
    () => ChatMessageEntity,
    ChatMessageEntity => ChatMessageEntity.sender
  )
  chat_messages: ChatMessageEntity[];

  @OneToMany(
    () => RoomEntity,
    RoomEntity => RoomEntity.host
  )
  rooms: RoomEntity[];

  @OneToMany(
    () => UserRoomEntity,
    UserRoomEntity => UserRoomEntity.user
  )
  user_rooms: UserRoomEntity[];
}
