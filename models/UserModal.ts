import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: {
        type: String,
    },
    image: {
        type: String,
        default: null
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { type: Date },
    accounts: [{
        type: Schema.Types.ObjectId,
        ref: 'Account'
    }],
});

const User = models.User || model("User", UserSchema)

export default User