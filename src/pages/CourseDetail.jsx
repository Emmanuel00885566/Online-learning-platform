import { useParams, Link } from "react-router-dom";
import courses from "../data/courses";
import { useProgress } from "../context/ProgressContext";

function CourseDetail() {
  const { id } = useParams();
  const course = courses.find((c) => c.id === id);
  const { getCompletedLessons, markLessonComplete, unmarkLesson, resetCourse } = useProgress();

  if (!course) return <h2>Course not found</h2>;

  const completed = getCompletedLessons(course.id);
  const completedCount = completed.length;
  const total = course.lessons.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <div>
      <h1>{course.title}</h1>
      <p>{course.description}</p>

      <div style={{ maxWidth: 600, marginTop: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ width: "60%" }}>
            <div style={{ background: "#e6eef6", height: 10, borderRadius: 6, overflow: "hidden" }}>
              <div style={{ width: `${percent}%`, height: "100%", background: "#10b981" }} />
            </div>
            <div style={{ fontSize: 12, marginTop: 6 }}>{percent}% complete — {completedCount}/{total} lessons</div>
          </div>

          <div>
            <button
              onClick={() => {
                if (window.confirm("Reset progress for this course?")) resetCourse(course.id);
              }}
              style={{ padding: "0.35rem 0.6rem", cursor: "pointer" }}
            >
              Reset course
            </button>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 20 }}>Lessons</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {course.lessons.map((lesson) => {
          const isDone = completed.includes(lesson.id);
          return (
            <li key={lesson.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.5rem 0", borderBottom: "1px solid #f3f4f6" }}>
              <div>
                <Link to={`/courses/${course.id}/lesson/${lesson.id}`} style={{ fontWeight: 500, textDecoration: "none", color: "#111827" }}>
                  {lesson.title}
                </Link>
                <div style={{ fontSize: 13, color: "#6b7280" }}>{isDone ? "Completed" : "Not completed"}</div>
              </div>

              <div>
                <button
                  onClick={() => (isDone ? unmarkLesson(course.id, lesson.id) : markLessonComplete(course.id, lesson.id))}
                  style={{ padding: "0.35rem 0.6rem", cursor: "pointer" }}
                >
                  {isDone ? "Undo" : "Mark complete"}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CourseDetail;
