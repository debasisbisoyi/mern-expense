import Expense from "../models/Expense.js"; // Expense model
import XLSX from "xlsx";
import User from "../models/User.js";

// ✅ Add Expense
export const addExpense = async (req, res) => {
  try {
    const { icon, category, amount, date } = req.body;

    // Validate required fields
    if (!category || !amount ) {
      return res
        .status(400)
        .json({ message: "Category and amount are required" });
    }

    // Ensure amount is positive
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be greater than zero" });
    }

    // Use the default icon if none is provided
    const expense = await Expense.create({
      userId: req.user.id,
      icon: icon || "💸", // Default expense icon
      category,
      amount,
      date: date || new Date().toISOString().split("T")[0], // Stores as YYYY-MM-DD
    });

    res.status(201).json({ message: "Expense added successfully", expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Expenses for Logged-in User
export const getAllExpense = async (req, res) => {
  try {
    // Check if the logged-in user exists
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch all expense records (sorted by date) and include user info
    const expenses = await Expense.find()
      .populate("userId", "fullName email") // Include user details
      .sort({ date: -1 });

    res.status(200).json({
      message: "All expense records fetched successfully",
      expenses,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Download Expense Records as Excel
export const downloadExpenseExcel = async (req, res) => {
  try {
    // Fetch only the logged-in user's expense records
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expense records found" });
    }

    // Convert expense records into an array of objects for XLSX
    const expenseData = expenses.map((expense) => ({
      ID: expense._id.toString(),
      Icon: expense.icon || "💸",
      Category: expense.category || "N/A",
      Amount: expense.amount || 0,
      Date: expense.date ? expense.date.toISOString().split("T")[0] : "N/A",
      CreatedAt: expense.createdAt ? expense.createdAt.toISOString().split("T")[0] : "N/A",
    }));

    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(expenseData);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Expense Records");

    // Generate the Excel file as a binary buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    // Set response headers for download
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=expense-records.xlsx");

    // Send the Excel buffer as a response
    res.status(200).send(Buffer.from(excelBuffer));
  } catch (error) {
    console.error("Error generating expense report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ✅ Delete an Individual Expense
export const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params; // Get expense ID from URL params

    // Find the expense record
    const expense = await Expense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense record not found" });
    }

    // Check if the logged-in user is the owner of this expense record
    if (expense.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this record" });
    }

    // Delete the expense record
    await Expense.findByIdAndDelete(id);

    res.status(200).json({ message: "Expense record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
