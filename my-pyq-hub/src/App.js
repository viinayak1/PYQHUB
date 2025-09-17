import React, { useState, useEffect } from "react";
import './App.css';

function App() {
  const [semester, setSemester] = useState(1);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  const fetchSubjects = async (sem) => {
    try {
      setError(null);
      const res = await fetch(`http://localhost:5000/api/semesters/${sem}/subjects`);
      if (!res.ok) throw new Error("Failed to fetch subjects");
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      setError(err.message);
      setSubjects([]);
    }
  };

  useEffect(() => {
    fetchSubjects(semester);
  }, [semester]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <nav className="nav">
          <button onClick={() => scrollToSection("home")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("pyqhub")}>PYQ Hub</button>

          {/* Internships Dropdown */}
          <div className="dropdown">
            <button>Internships ▼</button>
            <div className="dropdown-content">
              <a href="https://unstop.com/" target="_blank" rel="noreferrer">Unstop</a>
              <a href="https://glassdoor.co.in/Internship" target="_blank" rel="noreferrer">Glassdoor</a>
              <a href="https://internshala.com/" target="_blank" rel="noreferrer">Internshala</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="section home">
        <h1 className="main-title">Welcome to PYQ Hub</h1>
        <p>Your previous year question papers are just a click away.</p>
        <button className="scroll-btn" onClick={() => scrollToSection("pyqhub")}>
          Explore PDFs
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="section about">
        <h2>About This Site</h2>
        <p>
          Hi, I am Vinayak Sharma, a final year Computer Science student.  
          I faced real-world challenges during my first year in college,  
          so I created PYQ HUB for my fellow juniors.  
          This full-stack project shows previous year question papers  
          semester-wise for easy access.
        </p>
      </section>

      {/* PyQ Hub Section */}
      <section id="pyqhub" className="section pyqhub">
        <h2>PYQ Hub - Semester {semester}</h2>

        <div className="semester-buttons">
          {[1, 2, 3, 4, 5, 6].map((sem) => (
            <button
              key={sem}
              onClick={() => setSemester(sem)}
              className={`semester-btn ${semester === sem ? "active" : ""}`}
            >
              Semester {sem}
            </button>
          ))}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {subjects.length > 0 ? (
          <div className="subject-buttons">
            {subjects.map((subject) => (
              <button key={subject._id} className="subject-btn">
                <a href={subject.pdfUrl} target="_blank" rel="noreferrer">
                  {subject.name}
                </a>
              </button>
            ))}
          </div>
        ) : (
          <p>No subjects found for this semester.</p>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 PyQ Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
