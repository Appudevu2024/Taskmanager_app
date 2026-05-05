import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estimatedDays, setEstimatedDays] = useState(0);

  const fetchTask = async () => {
    const res = await API.get("/todos");
    const task = res.data.find((t) => t._id === id);

    if (task) {
      setTitle(task.title);
      setStatus(task.status || 'pending');
      setStartDate(task.startDate);
      setEndDate(new Date(task.endDate).toISOString().split("T")[0]);
    }
  };

  
  useEffect(() => {
    fetchTask();
    
  }, []);


  useEffect(() => {
  if (!startDate || !endDate) return;

  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0,0,0,0);
  end.setHours(0,0,0,0);

  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  setEstimatedDays(diffDays >= 0 ? diffDays : 0);
}, [startDate, endDate]);

  const updateTask = async () => {

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date");
      return;
    }
    
    if (estimatedDays <= 0) {
      alert("Invalid date range");
      return;
    }


    await API.put(`/todos/${id}`, {
      title,
      endDate,
      status,
      estimatedDays
    });

    navigate("/todo");
  };

  return (
    <div className="min-h-screen flex items-start justify-center mt-6 bg-gray-100">

      <div className="bg-white p-8 rounded-xl shadow w-96">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Edit Task
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <label className="block mb-1 text-sm font-medium">
           End Date
        </label>

        <input
          type="date"
          className="border p-2 w-full mb-3 text-gray-400"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}

        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        >
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <button
          onClick={updateTask}
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Update Task
        </button>

      </div>

    </div>
  );
}