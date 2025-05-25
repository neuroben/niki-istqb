interface Props {
  statementNumber: number;
  progress: number;
  answer: boolean[];
  classN?: string;
}

const COLORS = ["bg-success", "bg-danger"];

function ProgressBar({
  statementNumber,
  progress,
  answer,
  classN = "",
}: Props) {
  const width = 100 / statementNumber;
  console.log("answer tömb:", answer);
  return (
    <div className={`progress ${classN}`}>
      {Array.from({ length: progress }).map((_, idx) => (
        <div
          key={idx}
          className={`progress-bar progress-bar-striped ${
            COLORS[answer[idx] ? 0 : 1]
          }`}
          role="progressbar"
          style={{ width: `${width}%` }}
          aria-valuenow={width}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      ))}
    </div>
  );
}

export default ProgressBar;
