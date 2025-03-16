import Income from "../models/Income.js";
import User from "../models/User.js";
import XLSX from "xlsx";


export const addIncome = async (req, res) => {
  try {
    const { icon, source, amount, date } = req.body;
    
    // Validate required fields
    if (!source || !amount) {
      return res
        .status(400)
        .json({ message: "Source and amount are required" });
    }

    // Ensure amount is positive
    if (amount <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be greater than zero" });
    }

    // Validate date format (optional, but recommended)
    const parsedDate = date ? new Date(date) : new Date();
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    // Use the default icon if none is provided
    const income = await Income.create({
      userId: req.user.id,
      icon: icon || "💰", // Uses default if icon is missing
      source,
      amount,
      date: parsedDate.toISOString().split("T")[0], // Stores date as YYYY-MM-DD
    });

    res.status(201).json({ message: "Income added successfully", income });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllIncome = async (req, res) => {
  try {
    // Check if the logged-in user is an admin
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Fetch all income records (sorted by date)
    const incomes = await Income.find()
      .populate("userId", "fullName email")
      .sort({ date: -1 });

    res.status(200).json({
      message: "All income records fetched successfully",
      incomes,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const downloadIncomeExcel = async (req, res) => {
  try {
    const incomes = await Income.find({ userId: req.user.id }).sort({ date: -1 });

    if (!incomes.length) {
      return res.status(404).json({ message: "No income records found" });
    }

    const incomeData = incomes.map((income) => ({
      ID: income._id.toString(),
      Icon: income.icon || "💰",
      Source: income.source,
      Amount: income.amount,
      Date: income.date.toISOString().split("T")[0],
      CreatedAt: income.createdAt.toISOString().split("T")[0],
    }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(incomeData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Income Records");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=income-records.xlsx");

    res.send(Buffer.from(excelBuffer));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params; // Get income ID from URL params

    // Find the income record
    const income = await Income.findById(id);
    if (!income) {
      return res.status(404).json({ message: "Income record not found" });
    }

    // Check if the logged-in user is the owner of this income record
    if (income.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this record" });
    }

    // Delete the income record
    await Income.findByIdAndDelete(id);

    res.status(200).json({ message: "Income record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
