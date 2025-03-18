import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { BASE_URL, API_PATHS } from "../utils/apiPaths"; // Import API paths
import InfoCard from "./cards/InfoCard";
import moment from "moment";

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      // Get token from local storage (or another auth state management)
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };

        const [incomeResponse, expenseResponse] = await Promise.all([
          fetch(`${BASE_URL}${API_PATHS.INCOME.GET_ALL_INCOME}`, { headers }),
          fetch(`${BASE_URL}${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`, { headers }),
        ]);

        if (!incomeResponse.ok || !expenseResponse.ok) {
          throw new Error("Failed to fetch data. Check your credentials.");
        }

        const income = await incomeResponse.json();
        const expense = await expenseResponse.json();

        const incomeData = income.incomes || [];
        const expenseData = expense.expenses || [];

        setData([...incomeData, ...expenseData]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isOpen]);

  // Filter results based on user input
  useEffect(() => {
    if (!searchQuery) {
      setFilteredResults([]);
      return;
    }

    const results = data.filter(
      (item) =>
        (item.source &&
          item.source.toLowerCase().includes(searchQuery.toLowerCase())) || // Income search
        (item.category &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase())) // Expense search
    );

    setFilteredResults(results);
  }, [searchQuery, data]);

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full bg-opacity-50 flex justify-center items-center z-100">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full min-h-screen z-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Search</h2>
            <button onClick={onClose}>
              <FaTimes className="text-xl cursor-pointer" />
            </button>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border rounded mt-3"
          />

          {/* Loading & Error Handling */}
          {loading && <p className="mt-3 text-gray-500">Loading...</p>}
          {error && <p className="mt-3 text-red-500">{error}</p>}

          {/* Results */}
          {filteredResults.length > 0 ? (
            <ul className="mt-3 pt-2">
              {filteredResults.map((result, index) => (
                <li key={index} className="py-2">
                  <InfoCard
                    icon={result.icon}
                    label={result.category || result.source}
                    value={result.amount}
                    date={moment(result.date).format("DD MM YYYY")}
                  />
                </li>
              ))}
            </ul>
          ) : searchQuery ? (
            <p className="mt-3 text-gray-500">No results found.</p>
          ) : null}
        </div>
      </div>
    )
  );
};

export default SearchModal;
