import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { RoomEntity } from "./room-entity";
import { UserEntity } from "./user-entity";

@Index("chat_message_pkey", ["id"], { unique: true })
@Entity("chat_message", { schema: "public" })
export class ChatMessageEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id: number;

  @Column("text", { name: "message" })
  message: string;

  @Column("timestamp with time zone", { name: "created_at" })
  created_at: Date;

  @ManyToOne(
    () => RoomEntity,
    RoomEntity => RoomEntity.chat_messages,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "room_id", referencedColumnName: "id" }])
  room: RoomEntity;

  @ManyToOne(
    () => UserEntity,
    UserEntity => UserEntity.chat_messages,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([{ name: "sender_id", referencedColumnName: "id" }])
  sender: UserEntity;
}
