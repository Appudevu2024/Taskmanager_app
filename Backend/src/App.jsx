import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Todo";
import AddTask from "./components/AddTask";
import EditTask from "./components/EditTask";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
        <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Register */}
        <Route path="/register" element={<Register />} />

        {/* Todo (protected) */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Dashboard />
             
            </ProtectedRoute>
          }
        />
        <Route
          path="/addtask"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edittask/:id"
          element={
            <ProtectedRoute>
              <EditTask />
            </ProtectedRoute>
          }
        />
      </Routes>

    </BrowserRouter>
  );
}