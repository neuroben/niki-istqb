import ProgressBar from "./components/ProgressBar";
import QuizCard from "./components/QuizCard";
import { useState } from "react";
import { loadQuestions } from "./script/getQuestions.ts";
import { useEffect } from "react";
import type { Question, MultiQuestion } from "./types/questionTypes";
import Counter from "./components/Counter.tsx";
import EndQuiz from "./components/EndQuiz.tsx";
import { useSearchParams } from "react-router-dom";

function Quiz() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answer, setAnswers] = useState<boolean[]>([]);
  const [searchParams] = useSearchParams();
  let maxStatementNumber = Number(searchParams.get("count")) || 5;

  useEffect(() => {
    loadQuestions(maxStatementNumber).then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, []);

  const handleNextQuestion = (wasCorrect: boolean) => {
    setAnswers((prev) => [...prev, wasCorrect]);
    setProgress((prev) => prev + 1);
  };

  const parseQuestionOptions = (question: Question | string[]) => {
    if ("options" in question) {
      return (question as MultiQuestion).options;
    } else if ("correct_answer" in question) {
      return [
        {
          text: "Igaz",
          correct: question.correct_answer == "Igaz" ? true : false,
        },
        {
          text: "Hamis",
          correct: question.correct_answer == "Hamis" ? true : false,
        },
      ];
    }
    return [];
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div
          className="col-md-10 mx-auto"
          style={{ maxWidth: "500px", width: "100%" }}
        >
          {loading ? (
            <div className="text-center py-5">
              <h4>Betöltés...</h4>
            </div>
          ) : questions.length > 0 && progress < questions.length ? (
            <>
              <QuizCard
                statement={questions[progress].statement}
                options={parseQuestionOptions(questions[progress])}
                onNext={handleNextQuestion}
              />
              <Counter
                counter={progress}
                maxStaementNumber={maxStatementNumber}
              />
            </>
          ) : (
            <EndQuiz answers={answer} />
          )}
        </div>
      </div>

      <ProgressBar
        classN="progress-fixed-bottom"
        statementNumber={maxStatementNumber}
        progress={progress}
        answer={answer}
      />
    </div>
  );
}

export default Quiz;
