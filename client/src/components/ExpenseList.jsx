import { useState } from "react";
import EditExpense from "./EditExpense";

const API_URL = import.meta.env.VITE_API_URL;

function ExpenseList({ expenses, onExpenseChanged }) {

    const [editingExpense, setEditingExpense] = useState(null);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this expense?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            const response = await fetch(
                `${API_URL}/expenses/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            await onExpenseChanged();

        } catch (error) {

            alert("Server error");

        }
    };


    if (editingExpense) {

        return (
            <EditExpense
                expense={editingExpense}
                onCancel={() => setEditingExpense(null)}
                onExpenseUpdated={() => {
                    setEditingExpense(null);
                    onExpenseChanged();
                }}
            />
        );

    }


    return (
        <div className="mt-8">

            <h2 className="text-2xl font-semibold mb-4">
                Your Expenses
            </h2>

            {expenses.length === 0 && (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    No expenses found.
                </div>
            )}

            <div className="space-y-4">

                {expenses.map((expense) => (

                    <div
                        key={expense.id}
                        className="bg-white p-4 rounded-lg shadow-md"
                    >

                        <div className="flex justify-between items-start gap-4">

                            <div>

                                <h3 className="text-lg font-semibold">
                                    {expense.title}
                                </h3>

                                <p className="text-blue-600 font-semibold">
                                    ₹{expense.amount}
                                </p>

                                <p>
                                    Category: {expense.category || "N/A"}
                                </p>

                                <p>
                                    {expense.description || "No description"}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {expense.expense_date || "No date"}
                                </p>

                            </div>

                            <div className="flex gap-2">

                                <button
                                    onClick={() => setEditingExpense(expense)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(expense.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}

export default ExpenseList;