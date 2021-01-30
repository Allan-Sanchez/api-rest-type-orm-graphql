import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Field,
  InputType,
  Int,
} from "type-graphql";
import { User } from "../entity/User";

@InputType()
class inputUser {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  age: number;
}

@InputType()
class inputUserUpdate {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field(() => Int, { nullable: true })
  age: number;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg("variables") variables: inputUser) {
    const newUser = User.create(variables);
    return newUser.save();
  }

  @Mutation(() => String)
  async removeUser(@Arg("id", () => Int) id: number) {
    await User.delete(id);
    return "user deleted successfully";
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id", () => Int) id: number,
    @Arg("fields", () => inputUserUpdate) fields: inputUserUpdate
  ) {
    await User.update({ id }, fields);
    return User.findOne(id);
  }

  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  @Query(() => User)
  async getUser(@Arg("id", () => Int) id: number) {
    const respose = await User.findOne(id);
    return respose;
  }
}
