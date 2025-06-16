import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    accountNumber: "",
    introducer: ""
  });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:4000/anydesk/banking/promotion/create",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        toast.success("Record created successfully!");
        setTableData([...tableData, response.data.data]);
        setFormData({ accountNumber: "", introducer: "" });
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <Routes>
        <Route path="/" element={
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Bank Promotion System</h1>
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="number"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Introducer
                  </label>
                  <input
                    type="number"
                    name="introducer"
                    value={formData.introducer}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <button
                type="submit"
                className={`mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit'}
              </button>
            </form>

            {/* Table */}
            {tableData.length > 0 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Introducer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Beneficiary
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tableData.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.accountNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.introducer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {item.beneficiary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        } />
      </Routes>
    </main>
  );
}

export default App;
