import API from "../api";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TaskCard({ task, fetchTodos }) {
    if (!task) return null;

    const isCompleted = task.status?.toLowerCase() === "completed";
    const isInProgress = task.status?.toLowerCase() === "inprogress";
    const isPending = task.status?.toLowerCase() === "pending";
    const isHigh = task.priority?.toLowerCase() === "high";
    const isModerate = task.priority?.toLowerCase() === "moderate";
    const isLow = task.priority?.toLowerCase() === "low";

    const navigate = useNavigate();

    const deleteTask = async () => {
        await API.delete(`/todos/${task._id}`);
        fetchTodos();
    };

    return (
        <div className="bg-white p-4 mb-4 sm:p-5 rounded-xl  border border-blue-400 shadow-md hover:shadow-lg transition w-full">
         

            {/* BUTTONS */}
            <div className="flex flex-row justify-between items-center gap-3">
                <div>
                <h1 className="text-md sm:text-lg font-bold text-yellow-600 mb-2 uppercase">
                    {task.taskType}
                </h1>
                </div>
                <div>
                <button
                    onClick={() => {
                        if (isCompleted) return;
                        navigate(`/edittask/${task._id}`);
                    }}
                    disabled={isCompleted}
                    className={`px-4 py-2 rounded-md text-sm transition w-full sm:w-auto ${isCompleted
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "text-blue-500 hover:bg-blue-600 hover:text-white"
                        }`}
                >
                    <FaEdit />
                </button>

                <button
                    onClick={deleteTask}
                    className="w-full sm:w-auto text-red-500 hover:text-red-700px-4 transition py-2 rounded-md text-sm transition"
                >
                    <FaTrash />
                </button>

                </div>   

            </div>
            {/* TITLE */}
            <h3 className="text-base sm:text-lg font-semibold mb-3 break-words">
                {task.title}
            </h3>
            <p className="text-base sm:text-xs font-semibold mb-3 whitespace-pre-line ">
                {task.description}
            </p>

            {/* STATUS */}
            <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-center gap-2 sm:gap-3">
                <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm w-fit ${isCompleted
                        ? "bg-green-100 text-green-700"
                        : isInProgress
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {isCompleted
                        ? "Completed"
                        : isInProgress
                            ? "In Progress"
                            : "Pending"}
                </span>
                <span
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm w-fit ${isHigh
                        ? "bg-red-100 text-red-500"
                        : isModerate
                            ? "bg-yellow-100 text-yellow-500"
                            : "bg-green-100 text-green-500"
                        }`}
                >
                    {isHigh
                        ? "High"
                        : isModerate
                            ? "Moderate"
                            : "Low"}
                </span>
            </div>
            
        </div>
    );
}