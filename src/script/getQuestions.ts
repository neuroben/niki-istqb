import type { Question} from "../types/questionTypes";

// Feltételezzük, hogy van egy shuffle függvényed:
function shuffle<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export async function loadQuestions(count: number): Promise<Question[]> {
  try {
    const data = await fetch("/pet-project/data/Questions_save_cleaned.json").then((r) =>
      r.json()
    );
    const filtered = data.questions_full.filter(
      (q: any) =>
        q.statement &&
        (typeof q.correct_answer !== "undefined" || Array.isArray(q.options))
    );
    return shuffle(filtered)
      .slice(0, count)
      .map((q: any) => q as Question);
  } catch (e) {
    console.error("Hiba történt a kérdések betöltésekor:", e);
    alert("Nem sikerült betölteni a kérdésbankot! Nézd meg a konzolt a részletekért.");
    return [];
  }
}