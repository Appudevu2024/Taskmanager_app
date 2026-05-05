import { useState } from "react";

export default function LeftsideMenu({
  sidebarOpen,
  setSidebarOpen,
  setPriorityFilter,
  setStatusFilter,
  setCategoryFilter,
  setListTitle
}) {
  const [tasksOpen, setTasksOpen] = useState(false);
  const [priority, setPriority] = useState(false);
  const [workflow, setWorkflow] = useState(false);
  const [category, setCategory] = useState(false);

  return (
    <>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/*  Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-screen  z-50
          bg-white border-r border-gray-200 text-gray-700
          w-64 p-5
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
           
        `}
      >
        <ul className="space-y-3">

          {/* Dashboard */}
          <li
            onClick={() => {
              setPriorityFilter(null);
              setStatusFilter(null);
              setCategoryFilter(null);
              setListTitle("All Tasks");
              setSidebarOpen(false);
            }}
            className="hover:bg-gray-100 p-2 rounded cursor-pointer">
            Dashboard
          </li>

          {/* Tasks */}
          <li
            onClick={() => setTasksOpen(!tasksOpen)}
            className="flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer font-semibold"
          >
            <span>Tasks</span>
            <svg
              className={`w-4 h-4 transition-transform ${tasksOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </li>

          {tasksOpen && (
            <div className="ml-2 space-y-2">

              {/* Priority */}
              <li
                onClick={() => setPriority(!priority)}
                className="flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <span>Priority</span>
                <svg className={`w-4 h-4 ${priority ? "rotate-180" : ""}`} viewBox="0 0 24 24">
                  <path strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </li>

              {priority && (
                <div className="pl-4 text-sm space-y-2">
                  {["high", "moderate", "low"].map((p) => (
                    <button
                      key={p}
                      className="block hover:text-blue-500"
                      onClick={() => {
                        setPriorityFilter(p);
                        setStatusFilter(null);
                        setCategoryFilter(null);
                        setListTitle(`${p} priority tasks`);

                        setSidebarOpen(false);
                      }}
                    >
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {/* Workflow */}
              <li
                onClick={() => setWorkflow(!workflow)}
                className="flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <span>Workflow</span>
                <svg className={`w-4 h-4 ${workflow ? "rotate-180" : ""}`} viewBox="0 0 24 24">
                  <path strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </li>

              {workflow && (
                <div className="pl-4 text-sm space-y-2">
                  {["completed", "inprogress", "pending"].map((s) => (
                    <button
                      key={s}
                      className="block hover:text-blue-500"
                      onClick={() => {
                        setStatusFilter(s);
                        setPriorityFilter(null);
                        setCategoryFilter(null);
                        setListTitle(`${s} Tasks`);

                        setSidebarOpen(false);
                      }}
                    >
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              {/* Category */}
              <li
                onClick={() => setCategory(!category)}
                className="flex justify-between items-center hover:bg-gray-100 p-2 rounded cursor-pointer"
              >
                <span>Category</span>
                <svg className={`w-4 h-4 ${category ? "rotate-180" : ""}`} viewBox="0 0 24 24">
                  <path strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </li>

              {category && (
                <div className="pl-4 text-sm space-y-2">
                  {["daily", "work", "personal", "health"].map((c) => (
                    <button
                      key={c}
                      className="block hover:text-blue-500"
                      onClick={() => {
                        setCategoryFilter(c);
                        setPriorityFilter(null);
                        setStatusFilter(null);
                        setListTitle(`${c} Tasks`);

                        setSidebarOpen(false);
                      }}
                    >
                      {c.charAt(0).toUpperCase() + c.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings */}
          <li className="hover:bg-gray-100 p-2 rounded cursor-pointer">
            Settings
          </li>

        </ul>
      </div>
    </>
  );
}