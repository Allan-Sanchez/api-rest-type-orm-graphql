import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BaseEntity} from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field( () =>Int)
    @PrimaryGeneratedColumn()
    id: number;
    
    @Field()
    @Column()
    firstName: string;

    @Field()
    @Column()
    lastName: string;

    @Field(() => Int)
    @Column("int",{default:25})
    age: number;

    @Field( () => String)
    @CreateDateColumn({type:"timestamp"})
    createdAt: string;    

}
