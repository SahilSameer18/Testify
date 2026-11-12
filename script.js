// 1. Settings and quiz state
const QUIZ_CONFIG = {
  questionsPerRound: 5 // How many questions to show per game
};

let activeQuestions = []; // Questions picked for the current round
let currentIndex = 0;     // Index of the question currently on screen (starts at 0)
let score = 0;            // Number of right answers so far
let hasAnswered = false;  // Stops the user from clicking twice on one question

// 2. Grab HTML elements by their ID so JavaScript can update them
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

// 3. Check that questions.js loaded properly and every question is valid
function validateData() {
  if (typeof QUIZ_QUESTIONS === "undefined" || !Array.isArray(QUIZ_QUESTIONS) || QUIZ_QUESTIONS.length === 0) {
    showError("Question bank (questions.js) is missing or empty.");
    return false;
  }

  for (let i = 0; i < QUIZ_QUESTIONS.length; i++) {
    const q = QUIZ_QUESTIONS[i];

    // Make sure every required field is present and has the right type
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

// 4. Show the error box and hide all other screens
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

// 5. Return only the questions that match the chosen category
function getCategoryPool(chosen) {
  if (chosen === "all") {
    return QUIZ_QUESTIONS;
  }
  return QUIZ_QUESTIONS.filter(q => q.category === chosen);
}

// 6. Fill the category dropdown automatically from QUIZ_QUESTIONS
function initCategories() {
  // Clear any placeholder options safely
  categorySelect.replaceChildren();

  // Add "All Topics" as the first dropdown item
  const allOption = document.createElement("option");
  allOption.value = "all";
  allOption.textContent = "All Topics";
  categorySelect.appendChild(allOption);

  // Pull all category names, remove duplicates with Set, and turn back into an array
  const categories = [...new Set(QUIZ_QUESTIONS.map(q => q.category))];

  // Create one dropdown item for each unique category
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  // Update the count badge now, and whenever the user picks a different category
  updateStartCount();
  categorySelect.addEventListener("change", updateStartCount);
}

// 7. Update the "5 Questions" text on the start screen
function updateStartCount() {
  const pool = getCategoryPool(categorySelect.value);
  const count = Math.min(QUIZ_CONFIG.questionsPerRound, pool.length);
  startCount.textContent = count === 1 ? "1 Question" : `${count} Questions`;
}

// 8. Fisher-Yates shuffle: mixes a copy of the array without changing the original data
function shuffle(array) {
  const arr = [...array]; // Shallow copy so QUIZ_QUESTIONS stays untouched
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap the two items
  }
  return arr;
}

// 9. Start a new quiz round
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

// 10. Show the current question and its 4 option buttons
function renderQuestion() {
  const q = activeQuestions[currentIndex];
  hasAnswered = false;

  // Update question counter, category pill, and progress bar width
  tracker.textContent = `Question ${currentIndex + 1} of ${activeQuestions.length}`;
  categoryName.textContent = q.category;
  progressBar.style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;

  // Use textContent so HTML tags like <nav> or <h1> show as normal text
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

  // Hide old messages from the previous question
  validationMsg.classList.add("hidden");
  explanationText.classList.add("hidden");
  explanationText.textContent = "";

  // On the last question, label the button "View Results"
  const isLast = currentIndex === activeQuestions.length - 1;
  btnNext.textContent = isLast ? "View Results" : "Next Question";
}

// 11. Check the clicked answer, color the buttons, and show the explanation
function selectAnswer(index) {
  if (hasAnswered) return;
  hasAnswered = true;

  // Clear the "Please select an answer" warning if it was visible
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

  // Disable all 4 buttons so the user cannot change their answer
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.classList.add("disabled");
  });

  explanationText.textContent = q.explanation;
  explanationText.classList.remove("hidden");
}

// 12. Move to the next question, or show warning if no answer was picked
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

// 13. Show the final score and a feedback message
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

// 14. Reset everything and go back to the start screen
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

// 15. Connect button clicks and start the app when the page loads
btnStart.addEventListener("click", startQuiz);
btnNext.addEventListener("click", handleNext);
btnRestart.addEventListener("click", restartQuiz);

if (validateData()) {
  initCategories();
}
