import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
  @Prop({ required: true })
  userName: string;

  @Prop({ unique: true, required: true})
  accountNumber: number;

  @Prop({ unique: true, required: true})
  email: string;

  @Prop({ unique: true, required: true})
  identityNumber: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

