import { NavLink } from "react-router-dom";
import { useProgress } from "../context/ProgressContext";

function Navbar() {
  const { progress, clearAll } = useProgress();

  // total completed lessons across all courses
  const completedCount = Object.values(progress).reduce(
    (acc, arr) => acc + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white">
      <div className="flex items-center gap-6">
        <h2 className="text-lg font-semibold">📚 Online Learning</h2>

        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-2 py-1 rounded transition-colors ${
              isActive ? "text-blue-400" : "text-white hover:text-blue-300"
            }`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `px-2 py-1 rounded transition-colors ${
              isActive ? "text-blue-400" : "text-white hover:text-blue-300"
            }`
          }
        >
          Courses
        </NavLink>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">✅ {completedCount} completed</span>
        <button
          onClick={() => {
            if (window.confirm("Reset all progress?")) clearAll();
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Reset progress
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
