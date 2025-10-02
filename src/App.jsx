import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProgressProvider } from "./context/ProgressContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Lesson from "./pages/Lesson";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <ProgressProvider>
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
          <Navbar />

          <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/courses/:id/lesson/:lessonId" element={<Lesson />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </ProgressProvider>
    </Router>
  );
}

export default App;
