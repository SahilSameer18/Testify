// Quiz configuration
const QUIZ_CONFIG = {
  questionsPerRound: 5 // Number of questions per quiz round
};

// Quiz runtime state
let activeQuestions = [];
let currentIndex = 0;
let score = 0;
let hasAnswered = false;

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
  // Clear any existing options safely
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

  // Set initial question count badge and listen for category changes
  updateStartCount();
  categorySelect.addEventListener("change", updateStartCount);
}

// Update the question count badge on the start screen
function updateStartCount() {
  const pool = getCategoryPool(categorySelect.value);
  const count = Math.min(QUIZ_CONFIG.questionsPerRound, pool.length);
  startCount.textContent = count === 1 ? "1 Question" : `${count} Questions`;
}

// Fisher-Yates shuffle: returns a shuffled copy without modifying the original array
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Start a new quiz round based on the chosen category
function startQuiz() {
  const pool = getCategoryPool(categorySelect.value);
  if (pool.length === 0) {
    showError("No questions found for the selected category.");
    return;
  }

  const roundCount = Math.min(QUIZ_CONFIG.questionsPerRound, pool.length);
  activeQuestions = shuffle(pool).slice(0, roundCount);
  currentIndex = 0;
  score = 0;
  hasAnswered = false;

  screenStart.classList.add("hidden");
  screenQuiz.classList.remove("hidden");
  renderQuestion();
}

// Render the current question and its option buttons safely
function renderQuestion() {
  const q = activeQuestions[currentIndex];
  hasAnswered = false;

  // Update header, category badge, and progress bar
  tracker.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
  categoryName.textContent = q.category;
  progressBar.style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  // Use textContent so HTML tags like <nav> or <h1> display as plain text
  questionText.textContent = q.question;
  optionsContainer.replaceChildren();

  q.options.forEach((optText, index) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.textContent = optText;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(btn);
  });

  // Reset validation warning and explanation from the previous question
  validationMsg.classList.add("hidden");
  explanationText.classList.add("hidden");
  explanationText.textContent = "";

  // Show "View Results" on the last question
  const isLast = currentIndex === activeQuestions.length - 1;
  btnNext.textContent = isLast ? "View Results" : "Next Question";
}

// Evaluate user's choice, show instant feedback, and disable options
function selectAnswer(index) {
  if (hasAnswered) return;
  hasAnswered = true;

  // Hide validation warning immediately once an option is selected
  validationMsg.classList.add("hidden");

  const q = activeQuestions[currentIndex];
  const buttons = optionsContainer.querySelectorAll(".option");

  if (index === q.correct) {
    score++;
    buttons[index].classList.add("correct");
  } else {
    buttons[index].classList.add("incorrect");
    buttons[q.correct].classList.add("correct");
  }

  // Disable buttons both natively and via CSS class
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.add("disabled");
  });

  // Reveal educational explanation
  explanationText.textContent = q.explanation;
  explanationText.classList.remove("hidden");
}

// Handle Next button click with form validation
function handleNext() {
  if (!hasAnswered) {
    validationMsg.classList.remove("hidden");
    return;
  }

  currentIndex++;
  if (currentIndex < activeQuestions.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

// Show final score, percentage, and 3-tier feedback message
function showResults() {
  screenQuiz.classList.add("hidden");
  screenResult.classList.remove("hidden");

  const total = activeQuestions.length;
  const percentage = Math.round((score / total) * 100);
  scoreText.textContent = `${score} / ${total} (${percentage}%)`;

  if (percentage >= 80) {
    resultMessage.textContent = "Excellent work! You mastered this topic.";
  } else if (percentage >= 50) {
    resultMessage.textContent = "Good effort! A little more practice and you'll be set.";
  } else {
    resultMessage.textContent = "Keep practicing! Review the topics and try again.";
  }
}

// Reset quiz state and return to the start screen
function restartQuiz() {
  currentIndex = 0;
  score = 0;
  hasAnswered = false;
  activeQuestions = [];

  validationMsg.classList.add("hidden");
  explanationText.classList.add("hidden");
  explanationText.textContent = "";

  screenResult.classList.add("hidden");
  screenStart.classList.remove("hidden");
  updateStartCount();
}

// Bind button click handlers
btnStart.addEventListener("click", startQuiz);
btnNext.addEventListener("click", handleNext);
btnRestart.addEventListener("click", restartQuiz);

// Validate data and initialize categories on page load
if (validateData()) {
  initCategories();
}
