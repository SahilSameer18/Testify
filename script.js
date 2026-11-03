// Quiz configuration
const QUIZ_CONFIG = {
  questionsPerRound: 5 // Number of questions per quiz round
};

// DOM elements
const screenError = document.getElementById("screen-error");
const errorMessage = document.getElementById("error-message");
const screenStart = document.getElementById("screen-start");
const screenQuiz = document.getElementById("screen-quiz");
const screenResult = document.getElementById("screen-result");

const categorySelect = document.getElementById("category-select");
const startCount = document.getElementById("start-count");
const btnStart = document.getElementById("btn-start");

const tracker = document.getElementById("tracker");
const categoryName = document.getElementById("category-name");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const validationMsg = document.getElementById("validation-msg");
const explanationText = document.getElementById("explanation-text");
const btnNext = document.getElementById("btn-next");

const scoreText = document.getElementById("score-text");
const resultMessage = document.getElementById("result-message");
const btnRestart = document.getElementById("btn-restart");

// Validate question data before the quiz runs
function validateData() {
  if (typeof QUIZ_QUESTIONS === "undefined" || !Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) {
    showError("Question bank (questions.js) is missing or empty.");
    return false;
  }

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
  if (screenQuiz) {
    screenQuiz.classList.add("hidden");
  }
  if (screenResult) {
    screenResult.classList.add("hidden");
  }
  if (screenError && errorMessage) {
    errorMessage.textContent = message;
    screenError.classList.remove("hidden");
  }
}

// Filter questions by selected category
function getCategoryPool(chosen) {
  if (chosen === "all") {
    return QUIZ_QUESTIONS;
  }
  return QUIZ_QUESTIONS.filter(q => q.category === chosen);
}

// Populate the category dropdown dynamically using Set
function initCategories() {
  // Clear any existing options without using innerHTML
  categorySelect.replaceChildren();

  // Add the default "All Topics" option
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Topics";
  categorySelect.appendChild(allOption);

  // Extract unique category names from QUIZ_QUESTIONS
  const categories = [...new Set(QUIZ_QUESTIONS.map(q => q.category))];

  // Append each category to the dropdown
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });
}

// Run validation and initialize on load
if (validateData()) {
  initCategories();
}
