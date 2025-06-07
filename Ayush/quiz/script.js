document.getElementById("quizform").addEventListener("submit", function (event) {
  event.preventDefault(); // prevent reload

  let score = 0;
  const total = 5;

  const correctAnswers = {
    question1: "c", // Paris
    question2: "b", // 4
    question3: "a", // 6
    question4: "a", // 0 but you wrote 3, change if needed
    question5: "d"  // 6
  };

  for (let q in correctAnswers) {
    const selected = document.querySelector(`input[name="${q}"]:checked`);
    if (selected && selected.value === correctAnswers[q]) {
      score++;
    }
  }

  document.getElementById("result").innerText = `Your score is ${score} out of ${total}`;
  document.getElementById("n").style.display = "inline-block";
});
