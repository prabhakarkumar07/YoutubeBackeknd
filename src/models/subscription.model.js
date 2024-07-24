import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    suscriber: {
      type: Schema.Types.ObjectId, //one who is subscribing
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId, //one to whome "subscriber is subscribeing"
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
