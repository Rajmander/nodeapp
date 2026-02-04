import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  netAmount: {
    type: Number,
    required: true,
  },

  // Payment Info
  payment: {
    provider: {
      type: String, // Stripe, razorpay
    },
    transactionId: {
      type: String,
    },
    method: { type: String }, // Card, Upi, Net Banking
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
    },
    paidAt: Date,
  },
  // Order Lifecycle
  status: {
    type: String,
    enum: ["CREATED", "CONFIRMED", "COMPLETED", "CANCELLED"],
    default: "CREATED",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

export default mongoose.model("Order", orderSchema);
