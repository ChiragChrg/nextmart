import { Schema, model, models } from "mongoose";

const addressSchema = new Schema({
    doorNo: String,
    address1: String,
    address2: String,
    city: String,
    state: String,
    country: String,
    zipCode: String,
});

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    hashedPassword: String,
    image: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    address: [addressSchema],
    emailVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: { type: Date }
});

const User = models.User || model("User", UserSchema)

export default User