import ProgressBar from "./components/ProgressBar";
import QuizCard from "./components/QuizCard";
import { useState, useCallback } from "react";
import { loadQuestions } from "./script/getQuestions.ts";
import { useEffect } from "react";
import type {
  Question,
  MultiOption,
} from "./types/questionTypes";
import Counter from "./components/Counter.tsx";
import EndQuiz from "./components/EndQuiz.tsx";
import { useSearchParams } from "react-router-dom";

/**
 * Custom hook to manage quiz state
 * @param maxStatementNumber Maximum number of questions to load
 * @returns Quiz state and state updaters
 */
function useQuizState(maxStatementNumber: number) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    loadQuestions(maxStatementNumber).then((qs) => {
      setQuestions(qs);
      setLoading(false);
    });
  }, [maxStatementNumber]);

  return { loading, progress, setProgress, questions, answers, setAnswers };
}

/**
 * Quiz component that displays questions, tracks progress and manages answers
 */
function Quiz() {
  const [searchParams] = useSearchParams();
  const maxStatementNumber = Number(searchParams.get("count")) || 5;
  const { loading, progress, setProgress, questions, answers, setAnswers } =
    useQuizState(maxStatementNumber);

  const handleNextQuestion = (wasCorrect: boolean) => {
    setAnswers((prev) => [...prev, wasCorrect]);
    setProgress((prev) => prev + 1);
  };

  // A feldolgozó függvény memorizálása a szükségtelen újraszámítások elkerülése érdekében
  const parseQuestionOptions = useCallback(
    (question: Question): MultiOption[] => {
      if ("options" in question && "correctAnswers" in question) {
        // Ez az új ExamQuestion formátum
        const options = question.options.map((text, index) => ({
          text,
          correct: question.correctAnswers.includes(index),
        }));
        
        return options;
      } else if ("options" in question && Array.isArray(question.options) && question.options.length > 0 && typeof question.options[0] === "object") {
        // Ez a régi MultiQuestion formátum
        const options = question.options as MultiOption[];
        
        return options;
      } else if ("correct_answer" in question) {
        // Ez a régi SimpleQuestion formátum
        return [
          { text: "Igaz", correct: question.correct_answer === "Igaz" },
          { text: "Hamis", correct: question.correct_answer === "Hamis" },
        ];
      }
      return [];
    },
    []
  );

  // Segédfüggvény annak ellenőrzésére, hogy több helyes válasz van-e
  const hasMultipleCorrectAnswers = useCallback((question: Question): boolean => {
    if ("options" in question && "correctAnswers" in question) {
      return question.correctAnswers.length > 1;
    } else if ("options" in question && Array.isArray(question.options) && question.options.length > 0 && typeof question.options[0] === "object") {
      const options = question.options as MultiOption[];
      return options.filter(opt => opt.correct).length > 1;
    }
    return false;
  }, []);

  // Segédfüggvény a kérdés szövegének lekérdezéséhez
  const getQuestionText = (question: Question): string => {
    if ("questionText" in question) {
      return question.questionText;
    } else if ("statement" in question) {
      return question.statement;
    }
    return "";
  };

  // Komplex JSX kiemelése az olvashatóság javítása érdekében
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-5">
          <h4>Betöltés...</h4>
        </div>
      );
    }

    if (questions.length > 0 && progress < questions.length) {
      return (
        <>
          <QuizCard
            statement={getQuestionText(questions[progress])}
            options={parseQuestionOptions(questions[progress])}
            isMultiple={hasMultipleCorrectAnswers(questions[progress])}
            onNext={handleNextQuestion}
          />
          <Counter counter={progress} maxStaementNumber={maxStatementNumber} />
        </>
      );
    }

    return <EndQuiz answers={answers} />;
  };

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center">
      <div className="row">
        <div
          className="col-md-10 mx-auto"
          style={{ maxWidth: "2000px", width: "100%" }}
        >
          {renderContent()}
        </div>
      </div>

      <ProgressBar
        classN="progress-fixed-bottom"
        statementNumber={maxStatementNumber}
        progress={progress}
        answer={answers}
      />
    </div>
  );
}

export default Quiz;
