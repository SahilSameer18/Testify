// Quiz question bank
// Each question has:
// - category: Topic name (HTML, CSS, JavaScript)
// - question: The question text
// - options: Array of 4 possible answers
// - correct: Index (0-3) of the correct answer in the options array
// - explanation: Short explanation shown after the user answers

const QUIZ_QUESTIONS = [
  // HTML questions (12)
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
  {
    category: "HTML",
    question: "Which HTML element defines a table row?",
    options: ["<td>", "<th>", "<row>", "<tr>"],
    correct: 3,
    explanation: "<tr> stands for table row, whereas <td> and <th> define cells inside the row."
  },
  {
    category: "HTML",
    question: "Which tag creates an unordered (bulleted) list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    correct: 1,
    explanation: "<ul> defines an unordered (bulleted) list, while <ol> creates an ordered (numbered) list."
  },
  {
    category: "HTML",
    question: "Which HTML element is used to play an audio file?",
    options: ["<audio>", "<sound>", "<music>", "<mp3>"],
    correct: 0,
    explanation: "The <audio> tag embeds sound content in an HTML5 document."
  },
  {
    category: "HTML",
    question: "Which attribute makes an <input> field mandatory before submitting a form?",
    options: ["validate", "important", "required", "must"],
    correct: 2,
    explanation: "Adding the 'required' attribute stops a form from submitting if the field is empty."
  },
  {
    category: "HTML",
    question: "Which HTML element draws a horizontal thematic break line?",
    options: ["<line>", "<br>", "<divider>", "<hr>"],
    correct: 3,
    explanation: "<hr> creates a horizontal rule, while <br> inserts a single line break."
  },

  // CSS questions (12)
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
  {
    category: "CSS",
    question: "Which CSS property controls the size of text?",
    options: ["text-size", "font-weight", "font-size", "size"],
    correct: 2,
    explanation: "'font-size' sets the height of text characters."
  },
  {
    category: "CSS",
    question: "How do you make text bold using CSS?",
    options: ["font-weight: bold", "font-style: bold", "text-weight: bold", "font: heavy"],
    correct: 0,
    explanation: "'font-weight' controls how thick or bold text characters appear."
  },
  {
    category: "CSS",
    question: "Which CSS property rounds the corners of a box?",
    options: ["corner-radius", "border-style", "border-radius", "round-corner"],
    correct: 2,
    explanation: "'border-radius' rounds the outer corners of an element's border."
  },
  {
    category: "CSS",
    question: "Which property controls the stacking order of overlapping positioned elements?",
    options: ["layer-index", "z-index", "stack-order", "depth"],
    correct: 1,
    explanation: "'z-index' specifies which overlapping element appears in front (higher numbers sit on top)."
  },
  {
    category: "CSS",
    question: "Which CSS pseudo-class applies styles when a user moves their mouse over an element?",
    options: [":active", ":focus", ":visited", ":hover"],
    correct: 3,
    explanation: "The :hover pseudo-class activates when the user points at an element with a cursor."
  },

  // JavaScript questions (12)
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
  },
  {
    category: "JavaScript",
    question: "Which array method adds a new item to the end of an array?",
    options: ["unshift()", "push()", "concat()", "append()"],
    correct: 1,
    explanation: "push() adds one or more elements to the end of an array and returns the new length."
  },
  {
    category: "JavaScript",
    question: "Which DOM method selects the first element matching a CSS selector?",
    options: ["getElementById()", "getElementsByClassName()", "querySelectorAll()", "querySelector()"],
    correct: 3,
    explanation: "querySelector() returns the first matching element, whereas querySelectorAll() returns all matches."
  },
  {
    category: "JavaScript",
    question: "Which property returns the number of elements in an array?",
    options: ["length", "size", "count", "total"],
    correct: 0,
    explanation: "array.length gives the total count of items inside an array."
  },
  {
    category: "JavaScript",
    question: "Which Math method rounds a number down to the nearest whole integer?",
    options: ["Math.round()", "Math.floor()", "Math.ceil()", "Math.abs()"],
    correct: 1,
    explanation: "Math.floor() always rounds a number down to the nearest integer (for example, 4.9 becomes 4)."
  },
  {
    category: "JavaScript",
    question: "Which method converts an array's items into a single string separated by a chosen delimiter?",
    options: ["split()", "slice()", "join()", "toString()"],
    correct: 2,
    explanation: "join() combines all array elements into one string using the separator you pass in."
  }
];
