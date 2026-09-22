import express from "express";
import cors from "cors";
import expenseRoutes from "./routes/expenseRoutes.js";
import db from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/expenses", expenseRoutes);

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err.message);
    } else {
        console.log("MYSQL connected");
    }
});

// GET ALL EXPENSES
app.get("/expenses", (req, res) => {
    const sql = "SELECT * FROM expenses ORDER BY expense_date DESC";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to fetch expenses"
            });
        }

        res.json(results);
    });
});

// ADD EXPENSE
app.post("/expenses", (req, res) => {
    const {
        title,
        amount,
        category,
        description,
        expense_date
    } = req.body;

    if (!title || !amount) {
        return res.status(400).json({
            error: "Title and amount are required"
        });
    }

    if (Number(amount) <= 0) {
        return res.status(400).json({
            error: "Amount must be greater than 0"
        });
    }

    const sql = `
        INSERT INTO expenses
        (title, amount, category, description, expense_date)
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        title,
        amount,
        category || null,
        description || null,
        expense_date || null
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to add expense"
            });
        }

        res.status(201).json({
            message: "Expense added successfully",
            id: result.insertId
        });
    });
});

// UPDATE EXPENSE
app.put("/expenses/:id", (req, res) => {
    const id = req.params.id;

    const {
        title,
        amount,
        category,
        description,
        expense_date
    } = req.body;

    if (!title || !amount) {
        return res.status(400).json({
            error: "Title and amount are required"
        });
    }

    if (Number(amount) <= 0) {
        return res.status(400).json({
            error: "Amount must be greater than 0"
        });
    }

    const sql = `
        UPDATE expenses
        SET title = ?,
            amount = ?,
            category = ?,
            description = ?,
            expense_date = ?
        WHERE id = ?
    `;

    const values = [
        title,
        amount,
        category || null,
        description || null,
        expense_date || null,
        id
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to update expense"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        res.json({
            message: "Expense updated successfully"
        });
    });
});

// DELETE EXPENSE
app.delete("/expenses/:id", (req, res) => {
    const id = req.params.id;

    const sql = "DELETE FROM expenses WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: "Failed to delete expense"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        res.json({
            message: "Expense deleted successfully"
        });
    });
});

// TEST ROUTE
app.get("/", (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});