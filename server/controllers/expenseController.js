import db from "../config/db.js";

export const createExpense = async (req, res) => {
    try {
        const {
            title,
            amount,
            category,
            description,
            expense_date
        } = req.body;

        if (!title || !amount || !category || !expense_date) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields",
            });
        }

        const sql = `
            INSERT INTO expenses
            (title, amount, category, description, expense_date)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            title,
            amount,
            category,
            description || null,
            expense_date
        ]);

        res.status(201).json({
            success: true,
            message: "Expense added successfully",
            expenseId: result.insertId,
        });

    } catch (error) {
        console.error("Create expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to add expense",
        });
    }
};