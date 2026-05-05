import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");
    const [taskType, setTaskType] = useState("");
    const [taskPriority, setTaskPriority] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const navigate = useNavigate();



    const calculateDays = () => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = end - start;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return diffDays >= 0 ? diffDays : 0;
    };

    const handleAdd = async () => {


        if (new Date(endDate) < new Date(startDate)) {
            alert("End date cannot be before start date");
            return;
        }

        const estimatedDays = calculateDays();
        if (estimatedDays <= 0) {
            alert("Invalid date range");
            return;
        }

        await API.post("/todos", {
            title,
            description,
            taskType,
            status: "pending",
            priority: taskPriority,
            startDate,
            endDate,
            estimatedDays
        });

        navigate("/todo");
    };

    return (
        <div className="h-screen flex items-start justify-center mt-4">
  <div className="bg-white p-4 rounded-lg shadow w-80">

    <h2 className="text-lg font-semibold mb-3 text-center">Add Task</h2>

    {/* Task Type */}
    <select
      className="border p-2 w-full mb-2 text-sm"
      value={taskType}
      onChange={(e) => setTaskType(e.target.value)}
    >
      <option value="" disabled>Select task type</option>
      <option value="daily">Daily</option>
      <option value="work">Work / Study</option>
      <option value="personal">Personal</option>
      <option value="health">Health & Fitness</option>
    </select>

    {/* Title */}
    <input
      className="border p-2 w-full mb-2 text-sm"
      placeholder="Task"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    {/* Description */}
    <textarea
      className="border p-2 w-full mb-2 text-sm resize-none"
      placeholder="Task description"
      rows={2}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />

    {/* Dates  */}
    <div className="grid grid-cols-2 gap-2 mb-2">
      <div>
        <label className="text-xs">Start Date</label>
        <input
          type="date"
          className="border p-2 w-full text-sm"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="text-xs">End Date</label>
        <input
          type="date"
          className="border p-2 w-full text-sm"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
    </div>

   
    <div className="grid grid-cols-2 gap-2">
      <select
        className="border p-2 text-sm"
        value={taskPriority}
        onChange={(e) => setTaskPriority(e.target.value)}
      >
        <option value="" disabled>Priority</option>
        <option value="high">High</option>
        <option value="moderate">Moderate</option>
        <option value="low">Low</option>
      </select>

      <button
        onClick={handleAdd}
        className="bg-blue-500 text-white text-sm px-3 py-2 rounded"
      >
        Add
      </button>
    </div>

  </div>
</div>
    );
}