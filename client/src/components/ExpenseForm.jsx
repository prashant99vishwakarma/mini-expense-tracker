import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function ExpenseForm({ onExpenseAdded }) {

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        category: "",
        description: "",
        expense_date: ""
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

            const response = await fetch(`${API_URL}/expenses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error);
                return;
            }

            setFormData({
                title: "",
                amount: "",
                category: "",
                description: "",
                expense_date: ""
            });

            await onExpenseAdded();

        } catch (error) {

            alert("Server error");

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="bg-white p-6 rounded-lg shadow-md">

            <h2 className="text-xl font-semibold mb-4">
                Add Expense
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

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                >
                    {loading ? "Adding..." : "Add Expense"}
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;