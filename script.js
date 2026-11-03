// Application Logic (Controller Layer)
console.log("script.js connected successfully.");

// Verify connection to questions.js
if (typeof QUIZ_QUESTIONS !== "undefined") {
  console.log("questions.js is accessible from script.js.");
} else {
  console.error("questions.js failed to load before script.js.");
}

