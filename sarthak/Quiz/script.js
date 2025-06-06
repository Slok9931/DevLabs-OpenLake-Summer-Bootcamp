    if (document.getElementById("createForm")) {
  document.getElementById("createForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const question = document.querySelector('input[placeholder="Enter your question"]').value;
    const inputs = document.querySelectorAll('input');
    const options = [inputs[1].value, inputs[2].value, inputs[3].value, inputs[4].value];
    const correct = document.querySelector('select').value;

    const newQuestion = {
      question: question,
      options: {
        A: options[0],
        B: options[1],
        C: options[2],
        D: options[3]
      },
      correct: correct
    };

    const quizData = JSON.parse(localStorage.getItem("quizData") || "[]");
    quizData.push(newQuestion);
    localStorage.setItem("quizData", JSON.stringify(quizData));

    alert("Question added!");
    this.reset();
  });
}

// Handle quiz page
if (document.getElementById("quizForm")) {
  let seconds = 0;
  let timerInterval;

  function startTimer() {
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById("timer").textContent = "Time: " + seconds + " seconds";
    }, 1000);
  }

  function loadQuestions() {
    const quizData = JSON.parse(localStorage.getItem("quizData") || "[]");
    const form = document.getElementById("quizForm");

    if (quizData.length === 0) {
      form.innerHTML = "<p>No questions found. Please add some from the homepage.</p>";
      return;
    }

    quizData.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question";
      div.innerHTML = `<p>${index + 1}. ${q.question}</p>
        <label><input type="radio" name="q${index}" value="A"> ${q.options.A}</label>
        <label><input type="radio" name="q${index}" value="B"> ${q.options.B}</label>
        <label><input type="radio" name="q${index}" value="C"> ${q.options.C}</label>
        <label><input type="radio" name="q${index}" value="D"> ${q.options.D}</label>`;
      form.appendChild(div);
    });

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";
    form.appendChild(button);

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      clearInterval(timerInterval);
      let score = 0;

      quizData.forEach((q, i) => {
        const selected = document.querySelector(`input[name=q${i}]:checked`);
        if (selected && selected.value === q.correct) score++;
      });

      document.getElementById("result").textContent =
        `You scored ${score} out of ${quizData.length} in ${seconds} seconds.`;
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadQuestions();
    startTimer();
  });
}
