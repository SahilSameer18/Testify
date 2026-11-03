// Quiz question bank
// Each question has:
// - category: Topic name (HTML, CSS, JavaScript)
// - question: The question text
// - options: Array of 4 possible answers
// - correct: Index (0-3) of the correct answer in the options array
// - explanation: Short explanation shown after the user answers

const QUIZ_QUESTIONS = [
  // HTML questions
  {
    category: "HTML",
    question: "Which HTML5 element is used for primary navigation links?",
    options: ["<navigation>", "<nav>", "<links>", "<menu>"],
    correct: 1,
    explanation: "The <nav> element represents a section designed for primary navigation links."
  },
  {
    category: "HTML",
    question: "Which attribute provides alternative text for images?",
    options: ["title", "src", "alt", "desc"],
    correct: 2,
    explanation: "The 'alt' attribute gives screen readers and search engines text descriptions of images."
  },
  {
    category: "HTML",
    question: "Which tag creates a drop-down menu of <option> items?",
    options: ["<select>", "<input>", "<datalist>", "<list>"],
    correct: 0,
    explanation: "The <select> element is used to create a drop-down menu containing <option> tags."
  },
  {
    category: "HTML",
    question: "What is the correct tag for the largest heading?",
    options: ["<heading>", "<head>", "<h6>", "<h1>"],
    correct: 3,
    explanation: "<h1> represents the main heading of a webpage."
  },
  {
    category: "HTML",
    question: "Which attribute opens a link in a new tab?",
    options: ["target='_blank'", "target='_new'", "open='new'", "window='blank'"],
    correct: 0,
    explanation: "target='_blank' instructs the browser to open the link in a new tab."
  },
  {
    category: "HTML",
    question: "Which HTML element specifies a footer for a document?",
    options: ["<bottom>", "<foot>", "<footer>", "<section-end>"],
    correct: 2,
    explanation: "The <footer> tag defines a footer for a document or section."
  },
  {
    category: "HTML",
    question: "Which input type displays a numeric slider in HTML5?",
    options: ["type='slider'", "type='range'", "type='scroll'", "type='number'"],
    correct: 1,
    explanation: "The 'range' input type provides a slider control for selecting numeric values."
  },

  // CSS questions
  {
    category: "CSS",
    question: "What property creates space inside an element's border?",
    options: ["margin", "gap", "spacing", "padding"],
    correct: 3,
    explanation: "Padding is the space between content and its border, while margin is outside."
  },
  {
    category: "CSS",
    question: "How do you select an element with id 'header' in CSS?",
    options: [".header", "#header", "*header", "header"],
    correct: 1,
    explanation: "The hash symbol (#) is used to select elements by their unique ID."
  },
  {
    category: "CSS",
    question: "Which property is used to change text color?",
    options: ["color", "text-color", "font-color", "text-style"],
    correct: 0,
    explanation: "The 'color' property sets the foreground color of text."
  },
  {
    category: "CSS",
    question: "Which Flexbox property aligns items along the cross axis in a row container?",
    options: ["justify-content", "flex-direction", "align-items", "flex-wrap"],
    correct: 2,
    explanation: "'align-items' aligns items along the cross axis (vertically in a standard row)."
  },
  {
    category: "CSS",
    question: "What is the default value of the position property?",
    options: ["relative", "absolute", "fixed", "static"],
    correct: 3,
    explanation: "'static' is default: elements render in the normal document flow."
  },
  {
    category: "CSS",
    question: "Which CSS unit is relative to the root element's font size?",
    options: ["em", "rem", "vh", "%"],
    correct: 1,
    explanation: "'rem' (Root EM) scales directly based on the <html> element's font-size."
  },
  {
    category: "CSS",
    question: "Which property makes width include padding and border?",
    options: ["box-sizing", "display", "overflow", "position"],
    correct: 0,
    explanation: "Setting 'box-sizing: border-box' makes width and height include padding and borders."
  },

  // JavaScript questions
  {
    category: "JavaScript",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.stringify()", "JSON.toObject()", "JSON.parse()", "JSON.convert()"],
    correct: 2,
    explanation: "JSON.parse() takes a JSON string and turns it into a JavaScript object."
  },
  {
    category: "JavaScript",
    question: "Which keyword creates a variable that cannot be reassigned?",
    options: ["const", "let", "var", "static"],
    correct: 0,
    explanation: "'const' creates a block-scoped variable whose reference cannot be changed."
  },
  {
    category: "JavaScript",
    question: "What does 'typeof NaN' return in JavaScript?",
    options: ["'NaN'", "'undefined'", "'object'", "'number'"],
    correct: 3,
    explanation: "Even though NaN stands for Not-a-Number, its ECMAScript primitive type is number."
  },
  {
    category: "JavaScript",
    question: "Which array method creates a new array filtered by a condition?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    correct: 1,
    explanation: "filter() returns a new array with elements that pass the callback test."
  },
  {
    category: "JavaScript",
    question: "Which operator checks both value and type equality?",
    options: ["==", "!=", "===", "="],
    correct: 2,
    explanation: "=== is the strict equality operator that checks value and type without coercion."
  },
  {
    category: "JavaScript",
    question: "What is the result of '2' + 2 in JavaScript?",
    options: ["4", "NaN", "undefined", "'22'"],
    correct: 3,
    explanation: "The plus operator with a string triggers concatenation, producing '22'."
  },
  {
    category: "JavaScript",
    question: "Which method removes the last element from an array?",
    options: ["pop()", "shift()", "slice()", "unshift()"],
    correct: 0,
    explanation: "pop() removes and returns the last element from an array."
  }
];
