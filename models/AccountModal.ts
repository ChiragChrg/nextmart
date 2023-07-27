import { Schema, model, models } from "mongoose";

const AccountSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userEmail: {
        type: String,
    },
    provider: {
        type: String,
        unique: true
    },
    providerAccountId: {
        type: String,
        unique: true
    },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    scope: { type: String },
    id_token: { type: String },
});

const Account = models.Account || model("Account", AccountSchema)

export default Account
