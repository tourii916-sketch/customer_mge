import { BrowserRouter, Routes, Route } from "react-router-dom"

import SearchPage from "./pages/SearchPage"
import Customer360 from "./pages/Customer360"
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/customers/:customerId" element={<Customer360 />} />
        <Route
          path="/customers/:customerId/employeeList"
          element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
