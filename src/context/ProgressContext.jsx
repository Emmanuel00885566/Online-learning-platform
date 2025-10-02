import React, { createContext, useContext, useReducer, useEffect } from "react";

const ProgressContext = createContext();
const LOCAL_KEY = "olp_progress"; // localStorage key

function reducer(state, action) {
  switch (action.type) {
    case "LOAD":
      return action.payload || {};
    case "MARK": {
      const { courseId, lessonId } = action.payload;
      const existing = state[courseId] || [];
      if (existing.includes(lessonId)) return state;
      return { ...state, [courseId]: [...existing, lessonId] };
    }
    case "UNMARK": {
      const { courseId, lessonId } = action.payload;
      const existing = state[courseId] || [];
      const filtered = existing.filter((id) => id !== lessonId);
      return { ...state, [courseId]: filtered };
    }
    case "RESET_COURSE":
      return { ...state, [action.payload]: [] };
    case "CLEAR_ALL":
      return {};
    default:
      return state;
  }
}

export function ProgressProvider({ children }) {
  // lazy initializer reads from localStorage once
  const [state, dispatch] = useReducer(
    reducer,
    {},
    () => {
      try {
        const raw = localStorage.getItem(LOCAL_KEY);
        return raw ? JSON.parse(raw) : {};
      } catch (e) {
        console.warn("Failed to parse progress from localStorage:", e);
        return {};
      }
    }
  );

  // persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to save progress to localStorage:", e);
    }
  }, [state]);

  // actions
  const markLessonComplete = (courseId, lessonId) =>
    dispatch({ type: "MARK", payload: { courseId, lessonId } });

  const unmarkLesson = (courseId, lessonId) =>
    dispatch({ type: "UNMARK", payload: { courseId, lessonId } });

  const resetCourse = (courseId) =>
    dispatch({ type: "RESET_COURSE", payload: courseId });

  const clearAll = () => dispatch({ type: "CLEAR_ALL" });

  const getCompletedLessons = (courseId) => state[courseId] || [];

  return (
    <ProgressContext.Provider
      value={{
        progress: state,
        markLessonComplete,
        unmarkLesson,
        resetCourse,
        clearAll,
        getCompletedLessons,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};
