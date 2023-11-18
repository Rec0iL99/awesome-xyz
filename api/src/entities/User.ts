import { BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Field } from "type-graphql";

export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;
}
