import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`${API_URL}/expenses`);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setExpenses(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load expenses");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-[#1d2e54] p-4 md:p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white transition duration-200 hover:drop-shadow-lg">
        Expense Tracker
      </h1>

      <div className="max-w-2xl mx-auto">
        <ExpenseForm onExpenseAdded={fetchExpenses} />

        <ExpenseList expenses={expenses} onExpenseChanged={fetchExpenses} />
      </div>
    </div>
  );
}

export default App;
