
export default function TaskModal({ isOpen, onClose, task }) {
  if (!isOpen || !task) return null;


  const formattedDescription = task?.description
    ? task.description.split(/\n|,/).map(item => item.trim()).join(", ")
    : "";
  console.log(task?.description);



  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[400px]">

        <h2 className="text-xl font-bold mb-4">{task.title}</h2>

          <p className="mb-2"><strong>Description:</strong></p>
          <div className="ml-2 text-gray-700">
            {task?.description
              ?.split(/\n|,/)
              .map(item=>item.trim())
              .filter(item=>item.length>0)
              .map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
        </div>
        <p><strong>Status:</strong> {(task.status).charAt(0).toUpperCase()+task.status.slice(1)}</p>
        <p><strong>Priority:</strong> {(task.priority).charAt(0).toUpperCase()+task.priority.slice(1)}</p>
        <p><strong>Category:</strong> {(task.taskType).charAt(0).toUpperCase()+task.taskType.slice(1)}</p>
        <p><strong>Start Date:</strong> {new Date(task.startDate).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(task.endDate).toLocaleDateString()}</p>
        <p><strong>Duration:</strong> {task.estimatedDays} {`${'days'}`}</p>


        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>

      </div>
    </div>
  );
}