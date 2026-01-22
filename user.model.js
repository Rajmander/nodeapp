import mongoose from "mongoose";

const ROLES = ["admin", "superadmin", "manager", "customer"];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 120,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    roles: {
      type: String,
      enum: ROLES,
      default: "customer",
    },
    salary: {
      type: Number,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    deletedAt: {
      type: Date, // null = Active Record Date = Soft Deleted
      default: null,
    },
    salary: {
      type: Number,
      min: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    strict: "throw",
  },
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ mobile: 1 }, { unique: true });

export default mongoose.model("User", userSchema, "users");
