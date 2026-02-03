import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"

import Login from "./pages/Login"
import SearchPage from "./pages/SearchPage"
import Customer360 from "./pages/Customer360"
import EmployeeList from "./pages/EmployeeList";
import Employees from "./pages/Employees";
import Add from "./pages/Add"
import EmployeeAdd from "./pages/EmployeeAdd";

function App() {
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login />
          }
        />
        <Route path="/"
          element={
            user ? <SearchPage /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/customers/:customerId"
          element={
            user ? <Customer360 /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
        <Route
          path="/customers/:customerId/employeeList"
          element={
            user ? <EmployeeList /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/customers/:customerId/employees/add"
          element={<EmployeeAdd />}
        />
        <Route
          path="/customers/:customerId/employeeId/employees"
          element={
            user ? <Employees /> : <Navigate to="/login" replace />
          }
        />
        <Route path="/add"
          element={
            user ? <Add /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
