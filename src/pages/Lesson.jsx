import { useParams, Link } from "react-router-dom";
import courses from "../data/courses";
import { useProgress } from "../context/ProgressContext";

function Lesson() {
  const { id, lessonId } = useParams(); // id = course id
  const course = courses.find((c) => c.id === id);
  const { getCompletedLessons, markLessonComplete } = useProgress();

  if (!course) return <h2 className="text-xl font-semibold">Course not found</h2>;

  const lesson = course.lessons.find((l) => l.id === lessonId);
  if (!lesson) return <h2 className="text-xl font-semibold">Lesson not found</h2>;

  const completed = getCompletedLessons(course.id);
  const isCompleted = lessonId ? completed.includes(lessonId) : false;

  const idx = course.lessons.findIndex((l) => l.id === lessonId);
  const prev = idx > 0 ? course.lessons[idx - 1] : null;
  const next = idx < course.lessons.length - 1 ? course.lessons[idx + 1] : null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p className="text-gray-700">{lesson.content}</p>

      {/* Manual Mark Button */}
      <button
        onClick={() => lessonId && markLessonComplete(course.id, lessonId)}
        disabled={isCompleted}
        className={`mt-4 px-4 py-2 rounded-md ${
          isCompleted
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isCompleted ? "Completed" : "Mark as Completed"}
      </button>

      <div className="mt-6 flex gap-4">
        {prev && (
          <Link
            to={`/courses/${course.id}/lesson/${prev.id}`}
            className="text-blue-600 hover:underline"
          >
            &larr; Previous
          </Link>
        )}
        <Link to={`/courses/${course.id}`} className="text-blue-600 hover:underline">
          Back to Course
        </Link>
        {next && (
          <Link
            to={`/courses/${course.id}/lesson/${next.id}`}
            className="text-blue-600 hover:underline"
          >
            Next &rarr;
          </Link>
        )}
      </div>
    </div>
  );
}

export default Lesson;
