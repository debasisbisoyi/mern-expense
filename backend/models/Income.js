import mongoose from "mongoose";

const IncomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      default: "💰",
    },
    source: {
      type: String,
      required: [true, "Income source is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Income amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    date: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Income = mongoose.model("Income", IncomeSchema);
export default Income;
