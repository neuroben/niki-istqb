export type SimpleQuestion = {
  id: number;
  statement: string;
  correct_answer: string;
};

export type MultiOption = {
  text: string;
  correct: boolean;
};

export type MultiQuestion = {
  id: number;
  statement: string;
  options: MultiOption[];
};

export type Question = SimpleQuestion | MultiQuestion;