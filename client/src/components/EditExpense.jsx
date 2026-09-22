import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function EditExpense({
    expense,
    onCancel,
    onExpenseUpdated
}) {

    const [formData, setFormData] = useState({
        title: expense.title || "",
        amount: expense.amount || "",
        category: expense.category || "",
        description: expense.description || "",
        expense_date: expense.expense_date
            ? expense.expense_date.substring(0, 10)
            : ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.title || !formData.amount) {
            alert("Title and amount are required");
            return;
        }

        if (Number(formData.amount) <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                `${API_URL}/expenses/${expense.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            await onExpenseUpdated();

        } catch (error) {

            alert("Server error");

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">

            <h2 className="text-2xl font-semibold mb-4">
                Edit Expense
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />

                <input
                    type="date"
                    name="expense_date"
                    value={formData.expense_date}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2"
                />

                <div className="flex gap-3">

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
                    >
                        {loading ? "Updating..." : "Update Expense"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );
}

export default EditExpense;