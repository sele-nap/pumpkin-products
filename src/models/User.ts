import { Schema, models, model, type Model, type InferSchemaType, Types } from 'mongoose';

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export type UserDoc = InferSchemaType<typeof UserSchema>;

export type UserLean = UserDoc & { _id: Types.ObjectId };

const UserModel = (models.User as Model<UserDoc>) || model<UserDoc>('User', UserSchema);

export default UserModel;
