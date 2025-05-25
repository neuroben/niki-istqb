import { Link } from "react-router-dom";

interface Props {
  answers: boolean[];
}

function EndQuiz({ answers }: Props) {
  const correctAnswers = answers.filter((i) => i === true).length;
  const percent = correctAnswers / answers.length;

  const success = percent >= 0.6;

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        {success ? (
          <div
            className="card border-success mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header text-center">Eredmény</div>
            <div className="card-body rounded-bottom text-success">
              <h5 className="card-title text-center">Sikeres kvíz!</h5>
              <p className="card-text">
                Helyes válaszok: {correctAnswers} / {answers.length} (
                {(percent * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        ) : (
          <div
            className="card border-danger mb-3"
            style={{ maxWidth: "18rem" }}
          >
            <div className="card-header text-center">Eredmény</div>
            <div className="card-body rounded-bottom text-danger">
              <h5 className="card-title text-center">Nem sikerült</h5>
              <p className="card-text ">
                Helyes válaszok: {correctAnswers} / {answers.length} (
                {(percent * 100).toFixed(1)}%)
              </p>
            </div>
          </div>
        )}
        <Link to="/" type="button" className="btn btn-outline-light mt-2">
          Restart
        </Link>
      </div>
    </div>
  );
}

export default EndQuiz;
