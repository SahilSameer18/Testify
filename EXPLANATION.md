# Testify — Easy Project & Code Explanation

This guide explains how the whole **Testify** quiz app works in simple, everyday words—with a full line-by-line walkthrough of `script.js` so you can understand and explain every single line easily.

---

## 1. How the 4 Files Work Together

Think of this project like a quiz show:

1. **`index.html` (The 4 Rooms)**:
   Holds one centered box (`.card`) with 4 screens inside it: **Error**, **Start**, **Quiz**, and **Results**. Only one screen is visible at a time; the others have the `"hidden"` class.
2. **`style.css` (The Paint & Lights)**:
   Styles the card, dropdown, progress bar, and buttons (blue for action, green for right, red for wrong). At the very bottom, `.hidden { display: none !important; }` turns off whichever screen shouldn't be seen.
3. **`questions.js` (The Question Book)**:
   Stores `QUIZ_QUESTIONS`—a list of 36 questions (12 each across `HTML`, `CSS`, and `JavaScript`). Each question has:
   - `category`: Topic name
   - `question`: Question text
   - `options`: List of 4 answer choices (numbered `0`, `1`, `2`, `3`)
   - `correct`: The number (`0–3`) of the right answer
   - `explanation`: Short 1-sentence reason shown after answering
4. **`script.js` (The Manager)**:
   Checks that the question book isn't broken, builds the category dropdown, mixes the questions, listens for button clicks, checks answers, and shows the final score.

> **Why is `questions.js` loaded before `script.js` in `index.html`?**  
> Browsers read `<script>` tags from top to bottom. Loading `questions.js` first ensures `QUIZ_QUESTIONS` already exists in memory when `script.js` starts running. Using a `.js` file instead of `.json` also lets the app run just by double-clicking `index.html` without needing a server (avoiding browser CORS errors).

---

## 2. JavaScript Symbols Decoder (Quick Cheat Sheet)

Before reading `script.js`, here is what the short JS symbols mean in plain English:

| Symbol / Code | Meaning in Simple Words | Example from `script.js` |
| :--- | :--- | :--- |
| `!` | "NOT" (flips true/false) | `!hasAnswered` means "has NOT answered yet" |
| `\|\|` | "OR" (true if any side is true) | `a \|\| b` means "either `a` OR `b`" |
| `&&` | "AND" (true only if both sides are true) | `a && b` means "both `a` AND `b`" |
| `===` | Strictly equal (same value and same type) | `index === q.correct` |
| `!==` | Not equal | `chosen !== "all"` |
| `x => ...` | Mini function taking `x` and returning `...` | `q => q.category` means "give me `q`'s category" |
| `` `Hello ${name}` `` | Backticks let you drop variables inside text | `` `Question ${currentIndex + 1}` `` |
| `cond ? a : b` | Short `if/else`: if `cond` is true use `a`, else `b` | `count === 1 ? "1 Question" : ...` |
| `[...arr]` | Spread operator: unpacks items into a fresh list | `[...array]` makes a copy of `array` |

---

## 3. `script.js` Explained Line by Line (Lines 1–267)

### Part 1: Settings and Quiz State (Lines 1–9)
- **Lines 2–4 (`QUIZ_CONFIG`)**: Stores `questionsPerRound: 5`, meaning each round shows up to 5 questions.
- **Line 6 (`activeQuestions = []`)**: Starts empty. When you press Start, this list holds the 5 shuffled questions for the current game.
- **Line 7 (`currentIndex = 0`)**: Tracks which question you are looking at right now (`0` is Question 1, `1` is Question 2, and so on).
- **Line 8 (`score = 0`)**: Counts how many questions you got right.
- **Line 9 (`hasAnswered = false`)**: A safety lock. It starts as `false` on each question and flips to `true` the moment you click an answer—stopping you from clicking twice.

---

### Part 2: Grabbing HTML Elements (Lines 11–33)
- **Lines 12–33**: `document.getElementById("...")` finds each HTML tag from `index.html` by its `id` and saves it in a variable. That way JavaScript can change its text or hide/show it later without searching the page again.

---

### Part 3: Checking Data Safety — `validateData()` (Lines 35–59)
Runs once when the page loads to make sure `questions.js` is not missing or broken:
- **Lines 37–40**: Checks 3 things:
  1. `typeof QUIZ_QUESTIONS === "undefined"` — Does `QUIZ_QUESTIONS` exist? (`typeof` is safe and won't crash if `questions.js` failed to load.)
  2. `!Array.isArray(QUIZ_QUESTIONS)` — Is it actually a list?
  3. `QUIZ_QUESTIONS.length === 0` — Is the list empty?
  If any of these fails, it shows an error message and returns `false` to stop the app.
- **Lines 42–43**: Loops through every question (`i = 0` to `35`), naming the current question `q`.
- **Line 46**: Checks `q.category` is a text string and not just spaces (`.trim()` strips spaces from the ends).
- **Line 47**: Checks `q.question` is a non-empty string.
- **Line 48**: Checks `q.options` is a list of **4** items, and `.every(...)` checks that **all 4** items are non-empty strings.
- **Line 49**: Checks `q.correct` is a whole number (`Number.isInteger` blocks decimals like `1.5`) from `0` to `3`.
- **Line 50**: Checks `q.explanation` is a non-empty string.
- **Lines 52–55**: If any of those 5 checks fails, it calls `showError(...)` with the exact question index and returns `false`.
- **Line 58**: If every question passes all checks, it returns `true`.

---

### Part 4: Showing an Error — `showError(message)` (Lines 61–76)
- **Lines 63–71**: Adds `"hidden"` to the Start, Quiz, and Result screens so only the error screen will show.
- **Lines 72–75**: Puts `message` inside `#error-message` using `.textContent` and removes `"hidden"` from `#screen-error`.

---

### Part 5: Filtering Questions — `getCategoryPool(chosen)` (Lines 78–84)
- **Lines 80–82**: If `chosen === "all"`, returns the full `QUIZ_QUESTIONS` list.
- **Line 83**: Otherwise, `.filter(q => q.category === chosen)` checks each question `q` and returns a new list containing only the questions whose `category` matches `chosen`.

---

### Part 6: Building the Category Dropdown — `initCategories()` (Lines 86–111)
- **Line 89**: `categorySelect.replaceChildren()` clears any placeholder `<option>` inside the dropdown safely without using `innerHTML`.
- **Lines 92–95**: Creates an `<option>` in memory, sets its value to `"all"`, its visible text to `"All Topics"`, and adds it to `<select>`.
- **Line 98**: `const categories = [...new Set(QUIZ_QUESTIONS.map(q => q.category))];`
  1. `.map(q => q.category)` pulls only the category names from all 36 questions (making a list with duplicates).
  2. `new Set(...)` removes all duplicates because a `Set` only keeps unique items.
  3. `[... ]` turns that `Set` back into a normal list: `["HTML", "CSS", "JavaScript"]`.
- **Lines 101–106**: Loops over those unique categories and creates one `<option>` in the dropdown for each.
- **Lines 109–110**: Runs `updateStartCount()` right away, and tells `<select>` to run `updateStartCount` again whenever the user switches categories (`"change"`).

---

### Part 7: Updating the Start Screen Count — `updateStartCount()` (Lines 113–118)
- **Line 115**: Gets all questions matching the currently selected category.
- **Line 116**: `Math.min(5, pool.length)` picks the smaller number—so if a category only has 2 questions, it shows `2` instead of `5`.
- **Line 117**: Sets `"1 Question"` if `count === 1`, otherwise sets e.g. `"5 Questions"`.

---

### Part 8: Mixing Questions — `shuffle(array)` (Lines 120–128)
Uses the **Fisher-Yates shuffle** so questions appear in a fresh random order every time:
- **Line 122**: `const arr = [...array]` makes a **copy** of the list so the original `QUIZ_QUESTIONS` data stays untouched.
- **Line 123**: Loops backwards from the last item (`arr.length - 1`) down to `1`.
- **Line 124**: Picks a random index `j` between `0` and `i`.
- **Line 125**: `[arr[i], arr[j]] = [arr[j], arr[i]]` swaps the item at position `i` with the item at position `j`.
- **Line 127**: Returns the shuffled copy `arr`.

---

### Part 9: Starting the Quiz — `startQuiz()` (Lines 130–147)
- **Lines 132–136**: Gets the filtered questions (`pool`). If somehow empty (`0`), shows an error and stops.
- **Lines 138–139**: Figures out how many questions to play (`roundCount`), shuffles `pool`, and uses `.slice(0, roundCount)` to take just the first 5.
- **Lines 140–142**: Resets `currentIndex = 0`, `score = 0`, `hasAnswered = false`.
- **Lines 144–146**: Hides `#screen-start`, shows `#screen-quiz`, and calls `renderQuestion()` to show Question 1.

---

### Part 10: Drawing a Question — `renderQuestion()` (Lines 149–180)
- **Lines 151–152**: Grabs the current question `q = activeQuestions[currentIndex]` and sets `hasAnswered = false`.
- **Lines 155–157**:
  - Updates `"Question 1 of 5"`.
  - Updates the category pill (e.g., `"HTML"`).
  - Updates the blue progress bar width: `((currentIndex + 1) / total) * 100%` (`20%` on Q1, `40%` on Q2, ..., `100%` on the last question).
- **Line 160**: Sets `questionText.textContent = q.question`. Using `.textContent` instead of `.innerHTML` ensures HTML tags like `<nav>` or `<h1>` appear as normal words instead of being treated as invisible HTML tags.
- **Line 161**: Clears old option buttons using `optionsContainer.replaceChildren()`.
- **Lines 163–170**: Loops over the 4 choices (`optText` = choice text, `index` = `0, 1, 2, 3`):
  - Creates a `<button class="option" type="button">`.
  - Writes its label safely with `btn.textContent = optText`.
  - Adds a click listener that calls `selectAnswer(index)`.
  - Appends the button into `#options-container`.
- **Lines 173–175**: Hides the old `"Please select an answer."` warning and clears the previous explanation.
- **Lines 178–179**: Checks if we are on the final question (`isLast`). If yes, sets button text to `"View Results"`; otherwise sets `"Next Question"`.

---

### Part 11: Checking an Answer — `selectAnswer(index)` (Lines 182–209)
- **Lines 184–185**: If `hasAnswered` is already `true`, `return` stops immediately (blocks double-clicking). Otherwise locks `hasAnswered = true`.
- **Line 188**: Hides `"Please select an answer."` in case the user tried clicking Next earlier.
- **Lines 190–191**: Gets the current question `q` and grabs all 4 `.option` buttons currently inside `#options-container`.
- **Lines 193–199**:
  - If `index === q.correct`: adds `1` to `score` (`score++`) and adds the `"correct"` class (green) to the clicked button.
  - Else: adds `"incorrect"` (red) to the clicked button AND adds `"correct"` (green) to `buttons[q.correct]` so the user sees the right answer.
- **Lines 202–205**: Loops over all 4 buttons and sets both `btn.disabled = true` (native browser lock for mouse and keyboard) and `btn.classList.add("disabled")`.
- **Lines 207–208**: Shows `q.explanation` inside `#explanation-text` and removes `"hidden"`.

---

### Part 12: Clicking Next — `handleNext()` (Lines 211–224)
- **Lines 213–216**: **Form validation** — if `!hasAnswered` (no option clicked yet), removes `"hidden"` from `#validation-msg` (`"Please select an answer."`) and stops (`return`).
- **Lines 218–223**: Otherwise moves `currentIndex` forward by `1` (`currentIndex++`). If more questions remain, draws the next one (`renderQuestion()`); otherwise calls `showResults()`.

---

### Part 13: Final Score — `showResults()` (Lines 226–242)
- **Lines 228–229**: Hides `#screen-quiz` and shows `#screen-result`.
- **Lines 231–233**: Calculates rounded percentage (`Math.round((score / total) * 100)`) and writes e.g. `"4 / 5 (80%)"`.
- **Lines 235–241**: Uses `if / else if / else` to pick one of 3 feedback messages (`>= 80%`, `>= 50%`, or below `50%`).

---

### Part 14: Starting Over — `restartQuiz()` (Lines 244–258)
- **Lines 246–253**: Resets `currentIndex`, `score`, `hasAnswered`, and `activeQuestions` back to `0` / empty, and hides old warning/explanation text.
- **Lines 255–257**: Hides `#screen-result`, shows `#screen-start`, and refreshes the question count badge.

---

### Part 15: Startup & Button Listeners (Lines 260–267)
- **Lines 261–263**: Connects clicks on **Start Quiz**, **Next Question**, and **Restart Quiz** to `startQuiz`, `handleNext`, and `restartQuiz`.
- **Lines 265–267**: Runs `validateData()` first when the page opens. Only if `validateData()` returns `true` does `initCategories()` run to populate the dropdown.

---

## 4. Quick Viva Q&A Summary

1. **Why is the app dynamic?**  
   Categories in the dropdown (`new Set`), the question count badge (`Math.min`), and the round questions (`shuffle`) all come automatically from `questions.js`—nothing is hardcoded.
2. **Why `textContent` and `replaceChildren()` instead of `innerHTML`?**  
   Our options contain HTML tags like `<nav>`, `<h1>`, and `<select>`. Using `innerHTML` makes the browser parse them as real HTML tags (rendering blank buttons) and creates XSS risks. `textContent` prints tag brackets safely as plain text.
3. **Why copy the array inside `shuffle()`?**  
   `const arr = [...array]` creates a copy so Fisher-Yates only mixes the current round's list and leaves the master `QUIZ_QUESTIONS` array untouched.
4. **How do you handle errors and validation?**  
   `validateData()` checks that `questions.js` loaded and every question has valid fields before starting; `handleNext()` checks `!hasAnswered` and shows `"Please select an answer."` if the user skips answering.
5. **Why disable buttons with both `btn.disabled = true` and `hasAnswered`?**  
   `btn.disabled = true` blocks mouse and keyboard clicks in the browser, `.disabled` updates CSS pointer behavior, and `hasAnswered` acts as a backup JavaScript guard.

