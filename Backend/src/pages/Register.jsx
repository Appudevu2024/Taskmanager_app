import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
  try {
    const res = await API.post("/auth/register", {
      name,
      email,
      phone,
      password,
      confirmpassword
    });

    alert(res.data.message);
    navigate("/");
  } catch (error) {
    alert(error.response?.data?.error || "Registration failed");
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-80">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Register
        </h2>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="phone"
          onChange={(e) => setPhone(e.target.value)}
        />


        <input
          className="w-full p-2 border rounded mb-3"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-3"
          type="password"
          placeholder="Confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Register
        </button>

      </div>
    </div>
  );
}