// Save questions
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("quizForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const question = document.getElementById("question").value;
            const options = {
                A: document.getElementById("optA").value,
                B: document.getElementById("optB").value,
                C: document.getElementById("optC").value,
                D: document.getElementById("optD").value
            };
            const correct = document.getElementById("correct").value.toUpperCase();

            const quiz = JSON.parse(localStorage.getItem("quiz") || "[]");
            quiz.push({ question, options, correct });
            localStorage.setItem("quiz", JSON.stringify(quiz));

            alert("Question Saved!");
            form.reset();
        });
    }

    // Display questions on quiz.html
    const quizDisplay = document.getElementById("quizDisplay");
    if (quizDisplay) {
        const quiz = JSON.parse(localStorage.getItem("quiz") || "[]");
        quiz.forEach((q, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <p><strong>Q${index + 1}: ${q.question}</strong></p>
                <ul>
                    <li>A. ${q.options.A}</li>
                    <li>B. ${q.options.B}</li>
                    <li>C. ${q.options.C}</li>
                    <li>D. ${q.options.D}</li>
                </ul>
                <p><em>Correct: ${q.correct}</em></p>
                <hr>
            `;
            quizDisplay.appendChild(div);
        });
    }
});
