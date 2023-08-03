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
    hashedPassword: {
        type: String,
        default: null
    },
    image: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    dob: {
        type: Date,
        default: null
    },
    address: {
        type: addressSchema,
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
    updatedAt: { type: Date }
});

const UserModel = models.User || model("User", UserSchema)

export default UserModel