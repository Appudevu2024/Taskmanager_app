import { useEffect, useState, useRef } from "react";
import API from "../api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import LeftsideMenu from "../components/LeftsideMenu";
import { CheckCircle, Clock, ListTodo } from "lucide-react";
import TaskModal from "../components/TaskModal";
import { ToastContainer, toast } from "react-toastify";
import TaskList from "../components/TaskList";
import logo from '../assets/logo.png';
import { Menu } from "lucide-react";

export default function Dashboard() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [listTitle, setListTitle] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const email = decoded?.email;

  const [priorityFilter, setPriorityFilter] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  const toastShownRef = useRef(false);

  const fetchTodos = async () => {
    try {
      const res = await API.get("/todos");
      const data = res.data || [];
      setTodos(data);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const overdueTasks = data.filter((task) => {
        const end = new Date(task.endDate);
        end.setHours(0, 0, 0, 0);
        return (task.status === 'pending' || task.status === 'inprogress') && end < today;
      })
      const dueTodayTasks = data.filter((task) => {
        const end = new Date(task.endDate);
        end.setHours(0, 0, 0, 0);
        return ["pending", "inprogress"].includes(task.status) && end.getTime() === today.getTime();
      });


      if (!toastShownRef.current) {
        if (overdueTasks.length > 0) {
          toast.error(`⚠️ ${overdueTasks.length} overdue tasks`, {
            toastId: "task-alert",
          });
        } else if (dueTodayTasks.length > 0) {
          toast.warn(`⏰ ${dueTodayTasks.length} tasks due today`, {
            toastId: "task-alert",
          });
        }

        toastShownRef.current = true;
      }


    } catch (err) {
      console.log(err);
      setTodos([]);
    }
  };

  useEffect(() => {
    fetchTodos();

  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const completedTasks = todos.filter((t) => t.status === "completed");
  const inProgressTasks = todos.filter((t) => t.status === "inprogress");
  const todoTasks = todos.filter((t) => t.status === "pending");

  const activeTasks = todos.filter((t) => t.status !== "completed").length;

  const totalTasks = todos.length;
  const completedCount = completedTasks.length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedCount / totalTasks) * 100);

  const filteredTasks = todos.filter((task) => {
    if (priorityFilter && task.priority?.toLowerCase() !== priorityFilter) return false;
    if (statusFilter && task.status?.toLowerCase() !== statusFilter) return false;
    if (categoryFilter && task.taskType?.toLowerCase() !== categoryFilter) return false;
    return true;
  });

  const sortedTasks = [...todos].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* NAVBAR */}
      <div className="bg-white border-b border-gray-200 text-gray-800 shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center justify-between w-full md:w-auto">
          <img className="h-10" src={logo} alt="taskorbit logo" />
          <button
            className="md:hidden text-gray-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* <h1 className=" absolute left-1/2 transform -translate-x-1/2 text-4xl font-bold text-center text-blue-600">TaskOrbit</h1> */}
        <h1 className="  text-2xl md:text-4xl font-bold text-center text-blue-600">TaskOrbit</h1>
        <div className="flex items-center justify-between   md:justify-end gap-4 w-full md:w-auto">
          <span className="text-sm md:text-base text-gray-700">Welcome {email}</span>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

      </div>


      {/* MAIN BODY */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* SIDEBAR */}
        <LeftsideMenu
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setPriorityFilter={setPriorityFilter}
          setStatusFilter={setStatusFilter}
          setCategoryFilter={setCategoryFilter}
          setListTitle={setListTitle}
        />


        {/* RIGHT CONTENT */}

        <div className="flex-1 bg-white">

          {/* HEADER */}
          <div className="flex justify-between items-center px-6 py-4">
            <div>
              <h2 className="text-xl font-bold text-blue-800">MY TASKS</h2>
              <p className="text-red-500">
                You have {activeTasks} active tasks today
              </p>
            </div>

            <button
              onClick={() => navigate("/addtask")}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              + New task
            </button>
          </div>

          {/* CARDS + PROGRESS */}
          <div className="flex flex-col md:flex-row  gap-6 px-4 md:px-6 mt-4">

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 flex-1">

              <div className="bg-green-100 rounded-xl text-center shadow p-5 border-l-4 border-green-400">
                <CheckCircle className="mx-auto text-green-400" />
                <h3>Completed</h3>
                <p className="text-2xl">{completedTasks.length}</p>
              </div>

              <div className="bg-blue-100 rounded-xl text-center shadow p-5 border-l-4 border-blue-400">
                <ListTodo className="mx-auto text-blue-500" />
                <h3>In Progress</h3>
                <p className="text-2xl">{inProgressTasks.length}</p>
              </div>

              <div className="bg-amber-100 rounded-xl text-center shadow p-5 border-l-4 border-yellow-400">
                <Clock className="mx-auto text-yellow-500" />
                <h3>Pending</h3>
                <p className="text-2xl">{todoTasks.length}</p>
              </div>

            </div>

            {/* PROGRESS CIRCLE */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center border-4 border-blue-100 w-72">

              <h3 className="text-gray-500 mb-2">Overall Progress</h3>

              <div className="relative w-32 h-32">
                <svg className="w-full md:w-72">

                  {/* Background Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    className="text-gray-200"
                  />

                  {/* Progress Circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="54"
                    stroke="currentColor"
                    strokeWidth="10"
                    fill="transparent"
                    strokeDasharray={339.292}
                    strokeDashoffset={339.292 - (339.292 * progress) / 100}
                    className="text-blue-500 transition-all duration-500"
                  />

                </svg>

                {/* Percentage Text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {progress}%
                  </span>
                </div>
              </div>

            </div>
          </div>
          {/* TABLE */}
          <div>

            <TaskList
              tasks={filteredTasks}
              title={listTitle}
              onRowClick={(task) => {
                setSelectedTask(task);
                setShowModal(true);

              }}
              fetchTodos={fetchTodos}
              setTodos={setTodos}
            />
          </div>


          {/* MODAL */}
          <TaskModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            task={selectedTask}
            fetchTodos={fetchTodos}
          />

        </div>
      </div>
    </div>
  );
}