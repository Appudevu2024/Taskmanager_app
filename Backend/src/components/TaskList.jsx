import { useState, useEffect, useRef } from "react";
import API from "../api";
import { FaTrash, FaEdit } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function TaskList({ tasks, title, onRowClick, fetchTodos, setTodos }) {


  const [listTitle, setListTitle] = useState("All Tasks");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const navigate = useNavigate();

  const confirmDelete = async () => {
    await API.delete(`/todos/${selectedTaskId}`);
    if (typeof setTodos === "function") {
      setTodos(prev => prev.filter(t => t._id !== selectedTaskId));
    }
    setShowDeleteModal(false);
    setSelectedTaskId(null)
    toast.success("Task deleted successfully");
    if (typeof fetchTodos === "function") {
      fetchTodos();
    }

  };



  return (
    <>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <div className="p-3 md:p-6">
            <div className="bg-white rounded-xl shadow">
              {tasks.length === 0 ? (
                <div className="p-3 md:p-6 text-center text-gray-500">
                  No Tasks Found
                </div>
              ) : (
                <>

                  <h2 className=" text-xl font-semibold mb-4 text-blue-400">{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
                  {/* HEADER */}
                  <div className="grid grid-cols-8 bg-gray-100 p-4 text-sm font-semibold">
                    <div>Task</div>
                    <div className="ml-6">Workflow</div>
                    <div>Category</div>
                    <div>Priority</div>
                    <div>Created Date</div>
                    <div>Deadline</div>
                    <div>Estimated Days</div>
                    <div className="text-center">Actions</div>
                  </div>

                  {/* BODY */}
                  {tasks.map((task) => {
                    const isCompleted = task.status?.toLowerCase() === "completed";
                    console.log(task)
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const end = new Date(task.endDate);
                    end.setHours(0, 0, 0, 0);
                    const isOverdue =
                      (task.status === "pending" || task.status === "inprogress") &&
                      end < today;


                    return (
                      <div
                        key={task._id}
                        onClick={() => onRowClick(task)}
                        className={`grid grid-cols-8 p-4 border-t cursor-pointer text-sm ${isOverdue ? "bg-red-100 text-red-600 font-semibold" : ""}`}
                      // className="grid grid-cols-7 p-4 border-t text-sm"

                      >
                        <div>{task.title}</div>
                        <div className="ml-6">{task.status}</div>
                        <div>{task.taskType}</div>
                        <div>{task.priority}</div>
                        <div>{new Date(task.startDate).toLocaleDateString()}</div>
                        <div>{new Date(task.endDate).toLocaleDateString()}
                        </div>
                        <div>{task.estimatedDays}</div>
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (isCompleted) return;
                              navigate(`/edittask/${task._id}`);
                            }}
                            disabled={isCompleted}
                            className={`px-4 py-2 rounded-md text-sm md:text-base transition  sm:w-auto ${isCompleted
                              ? " text-gray-500 cursor-not-allowed"
                              : "text-blue-500 hover:bg-blue-600 hover:text-white"
                              }`}
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTaskId(task._id);
                              setShowDeleteModal(true);

                            }}

                            className="w-full sm:w-auto text-red-500 hover:text-red-700px-4 transition py-2 rounded-md text-sm md:text-base transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                    );
                  })}


                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-[350px] text-center">

            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this task?
            </h2>

            <div className="flex justify-center gap-4">
              {/* Cancel */}
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedTaskId(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>

              {/* OK */}
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}


