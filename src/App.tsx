import { useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [questionCount, setQuestionCount] = useState(5);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#181a1b" }}
    >
      <div
        className="card p-4 shadow"
        style={{ minWidth: 320, background: "#23272b" }}
      >
        <h2 className="text-center text-light mb-4">Kvíz</h2>
        <label className="form-label text-light" htmlFor="questionCount">
          Kérdések száma:
        </label>
        <input
          id="questionCount"
          type="number"
          min={1}
          max={100}
          className="form-control mb-4 bg-light text-light"
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        />
        <Link
          to={`/quiz?count=${questionCount}`}
          className="btn btn-outline-light btn-lg px-5 py-3 fw-bold shadow"
          style={{ fontSize: "2rem", borderRadius: "2rem" }}
        >
          Start
        </Link>
      </div>
    </div>
  );
}

export default App;
