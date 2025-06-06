// index.html: Load and show quizzes
if (document.getElementById("quizList")) {
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quizList = document.getElementById("quizList");

  quizzes.forEach((quiz, index) => {
    const card = document.createElement("div");
    card.className = "quiz-card";

    card.innerHTML = `
    <div class="quiz-left">
        <h3>${quiz.title}</h3>
        <p>🕒 ${quiz.time} mins | 🧮 ${quiz.score} points</p>
    </div>
    <div class="quiz-right">
        <button onclick="startQuiz(${index})" class="start-btn">Take Quiz</button>
    </div>
`;

    quizList.appendChild(card);
  });

  function startQuiz(index) {
    localStorage.setItem("currentQuizIndex", index);
    location.href = "quiz.html";
  }
}

// create.html: Handle quiz creation
if (document.getElementById("quizForm")) {
  document.getElementById("quizForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("quizTitle").value;
    const time = parseInt(document.getElementById("quizTime").value);
    const score = parseInt(document.getElementById("quizScore").value);
    const questionDivs = document.querySelectorAll(".question-block");

    const questions = [];
    questionDivs.forEach((q) => {
      const question = q.querySelector(".qtext").value;
      const options = [...q.querySelectorAll(".opt")].map((opt) => opt.value);
      const correct = parseInt(q.querySelector(".correct").value) - 1;
      questions.push({ question, options, correct });
    });

    const quiz = { title, time, score, questions };
    const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
    quizzes.push(quiz);
    localStorage.setItem("quizzes", JSON.stringify(quizzes));
    alert("Quiz saved!");
    location.href = "index.html";
  });
}

function addQuestion() {
  const div = document.createElement("div");
  div.classList.add("question-block");
  div.innerHTML = `
        <input type="text" class="qtext" placeholder="Question" required>
        <input type="text" class="opt" placeholder="Option 1" required>
        <input type="text" class="opt" placeholder="Option 2" required>
        <input type="text" class="opt" placeholder="Option 3" required>
        <input type="text" class="opt" placeholder="Option 4" required>
        <input type="number" class="correct" min="1" max="4" placeholder="Correct Option (1-4)" required>
        <hr>
    `;
  document.getElementById("questionsContainer").appendChild(div);
}


// quiz.html: Handle quiz display and result
if (
  document.getElementById("quizform") &&
  localStorage.getItem("currentQuizIndex")
) {
  const index = localStorage.getItem("currentQuizIndex");
  const quizzes = JSON.parse(localStorage.getItem("quizzes")) || [];
  const quiz = quizzes[index];
  const form = document.getElementById("quizform");

  document.getElementById("quizTitle").innerText = quiz.title;

  quiz.questions.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.classList.add("question");
    qDiv.innerHTML =
      `<p><strong>${i + 1}. ${q.question}</strong></p><ul>` +
      q.options
        .map(
          (opt, j) =>
            `<li><input type="radio" name="q${i}" value="${j}"> ${opt}</li>`
        )
        .join("") +
      "</ul>";
    form.appendChild(qDiv);
  });

  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit Quiz";
  submitBtn.type = "submit";
  form.appendChild(submitBtn);

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let score = 0;
    quiz.questions.forEach((q, i) => {
      const answer = form.querySelector(`input[name="q${i}"]:checked`);
      if (answer && parseInt(answer.value) === q.correct) score++;
    });
    alert(`Your score: ${score}/${quiz.questions.length}`);
    location.href = "index.html";
  });


  // Timer
  let timeLeft = quiz.time * 60;
  const timerEl = document.getElementById("timer");
  const timer = setInterval(() => {
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerEl.innerText = `Time left: ${min}m ${sec}s`;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(timer);
      alert("Time's up!");
      location.href = "index.html";
    }
  }, 1000);
}

// Ensure previous questions are not shown when loading the create page
window.addEventListener("DOMContentLoaded", () => {
  const questionsContainer = document.getElementById("questionsContainer");
  if (questionsContainer) {
    questionsContainer.innerHTML = ""; // Clear any previously injected content
  }
});
