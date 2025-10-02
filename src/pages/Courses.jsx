import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import courses from "../data/courses";
import { useProgress } from "../context/ProgressContext";

function Courses() {
  const { getCompletedLessons } = useProgress();

  const computePercentage = (course) => {
    const total = course.lessons.length;
    const done = getCompletedLessons(course.id).length;
    return total === 0 ? 0 : Math.round((done / total) * 100);
  };

  // --- Expansion State (persisted) ---
  const loadExpandState = () => {
    try {
      const saved = localStorage.getItem("courseExpandState");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };

  const [expandState, setExpandState] = useState(loadExpandState);

  useEffect(() => {
    localStorage.setItem("courseExpandState", JSON.stringify(expandState));
  }, [expandState]);

  const toggleCourse = (courseId) => {
    setExpandState((prev) => ({
      ...prev,
      [courseId]: !prev[courseId],
    }));
  };

  // --- Search & Filter State ---
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const categories = ["all", ...new Set(courses.map((c) => c.category || "Uncategorized"))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || (course.category || "Uncategorized") === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Courses</h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        {/* Filter Dropdown */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
      </div>

      {/* Course List */}
      <ul className="space-y-4">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => {
            const percent = computePercentage(course);
            const completed = getCompletedLessons(course.id);
            const open = expandState[course.id] || false;

            return (
              <li
                key={course.id}
                className="border border-gray-200 p-4 rounded-lg shadow-sm"
              >
                {/* Top Row */}
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold">{course.title}</h2>
                    <p className="text-gray-600 text-sm">{course.description}</p>
                    {course.category && (
                      <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {course.category}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="mb-2 font-medium">{percent}%</div>
                    <Link
                      to={`/courses/${course.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View Course →
                    </Link>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="bg-blue-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-2">
                    {completed.length} of {course.lessons.length} lessons completed
                  </div>
                </div>

                {/* Collapse Toggle */}
                <button
                  onClick={() => toggleCourse(course.id)}
                  className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:underline focus:outline-none"
                >
                  <span>{open ? "Hide Lessons" : "Show Lessons"}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Lessons */}
                {open && (
                  <ul className="mt-4 space-y-1 text-sm">
                    {course.lessons.map((lesson) => (
                      <li key={lesson.id} className="flex items-center">
                        <span
                          className={`mr-2 ${
                            completed.includes(lesson.id)
                              ? "text-green-600"
                              : "text-gray-400"
                          }`}
                        >
                          {completed.includes(lesson.id) ? "✅" : "⬜"}
                        </span>
                        <Link
                          to={`/courses/${course.id}/lesson/${lesson.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {lesson.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })
        ) : (
          <p className="text-gray-500">No courses found.</p>
        )}
      </ul>
    </div>
  );
}

export default Courses;
