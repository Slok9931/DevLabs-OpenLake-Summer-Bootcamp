document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionForm");
  const displayArea = document.getElementById("quizContainer");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const newQuestion = {
        question: document.getElementById("qText").value,
        options: {
          A: document.getElementById("optionA").value,
          B: document.getElementById("optionB").value,
          C: document.getElementById("optionC").value,
          D: document.getElementById("optionD").value,
        },
        correct: document.getElementById("correctOption").value.toUpperCase(),
      };

      const savedQuestions = JSON.parse(localStorage.getItem("quizData") || "[]");
      savedQuestions.push(newQuestion);
      localStorage.setItem("quizData", JSON.stringify(savedQuestions));

      alert("Question added!");
      form.reset();
    });
  }

  if (displayArea) {
    const savedQuestions = JSON.parse(localStorage.getItem("quizData") || "[]");
    if (savedQuestions.length === 0) {
      displayArea.innerHTML = "<p>No quiz questions available.</p>";
      return;
    }

    savedQuestions.forEach((item, idx) => {
      const questionBlock = document.createElement("div");
      questionBlock.classList.add("quiz-box");

      questionBlock.innerHTML = `
        <h3>Q${idx + 1}: ${item.question}</h3>
        <ul>
          <li>A. ${item.options.A}</li>
          <li>B. ${item.options.B}</li>
          <li>C. ${item.options.C}</li>
          <li>D. ${item.options.D}</li>
        </ul>
        <p><strong>Answer:</strong> ${item.correct}</p>
        <hr>
      `;
      displayArea.appendChild(questionBlock);
    });
  }
});
