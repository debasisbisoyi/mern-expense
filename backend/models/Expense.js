import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    icon: {
      type: String,
      default: "💸", // Default icon if none provided
    },
    category: {
      type: String,
      required: [true, "Income source is required"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Income amount is required"],
      min: [0, "Amount cannot be negative"], // Ensures no negative income
    },
    date: {
      type: Date,
      default: () => new Date().toISOString().split("T")[0], // Stores only YYYY-MM-DD
    },
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
