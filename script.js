// Quiz configuration
const QUIZ_CONFIG = {
  questionsPerRound: 5 // Number of questions per quiz round
};

// DOM elements
const screenError = document.getElementById("screen-error");
const errorMessage = document.getElementById("error-message");
const screenStart = document.getElementById("screen-start");

// Validate question data before the quiz runs
function validateData() {
  // Check if questions array exists and is not empty
  if (typeof QUIZ_QUESTIONS === "undefined" || !Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) {
    showError("Question bank (questions.js) is missing or empty.");
    return false;
  }

  // Check the structure of each question
  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const q = QUIZ_QUESTIONS[i];

    const isCategoryValid = typeof q.category === "string" && q.category.trim() !== "";
    const isQuestionValid = typeof q.question === "string" && q.question.trim() !== "";
    const areOptionsValid = Array.isArray(q.options) && q.options.length === 4 && q.options.every(opt => typeof opt === "string" && opt.trim() !== "");
    const isCorrectValid = Number.isInteger(q.correct) && q.correct >= 0 && q.correct <= 3;
    const isExplanationValid = typeof q.explanation === "string" && q.explanation.trim() !== "";

    if (!isCategoryValid || !isQuestionValid || !areOptionsValid || !isCorrectValid || !isExplanationValid) {
      showError(`Question at index ${i} has an invalid data structure.`);
      return false;
    }
  }

  return true;
}

// Display error card and halt quiz
function showError(message) {
  if (screenStart) {
    screenStart.classList.add("hidden");
  }
  if (screenError && errorMessage) {
    errorMessage.textContent = message;
    screenError.classList.remove("hidden");
  }
}

// Run validation when page loads
if (validateData()) {
  console.log("Question data is valid and ready.");
}
