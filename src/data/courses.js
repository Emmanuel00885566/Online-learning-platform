const courses = [
  {
    id: "react-basics",
    title: "React Basics",
    category: "Web Development",
    description: "Learn the fundamentals of React, including components, props, and state.",
    lessons: [
      { id: "1", title: "Introduction to React", content: "React is a library for building user interfaces..." },
      { id: "2", title: "Components & Props", content: "Components let you split the UI into independent pieces..." },
      { id: "3", title: "State & Events", content: "State allows components to create and manage their own data..." }
    ]
  },
  {
    id: "ui-ux",
    title: "UI/UX Design Fundamentals",
    category: "Design",
    description: "Understand the principles of creating beautiful and usable designs.",
    lessons: [
      { id: "1", title: "What is UI/UX?", content: "UI is the look, UX is the feel..." },
      { id: "2", title: "Typography Basics", content: "Typography helps in readability and user experience..." }
    ]
  },
  {
    id: "javascript-advanced",
    title: "Advanced JavaScript",
    category: "Programming",
    description: "Deep dive into closures, async programming, and ES6+ features.",
    lessons: [
      { id: "1", title: "Closures Explained", content: "A closure is a function that remembers its lexical scope..." },
      { id: "2", title: "Async/Await", content: "Async functions let you write promise-based code as if it were synchronous..." },
      { id: "3", title: "ES6 Features", content: "Modern JavaScript includes arrow functions, destructuring, spread/rest..." }
    ]
  }
];

export default courses;
