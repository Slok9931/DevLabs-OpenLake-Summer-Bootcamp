let questions = [];

// --------------- CREATE MODE -------------------
function addQuestion() {
  const questionIndex = questions.length;

  const questionBlock = document.createElement('div');
  questionBlock.className = 'question-block';

  const questionInput = document.createElement('input');
  questionInput.type = 'text';
  questionInput.placeholder = 'Enter your question';
  questionInput.className = 'question-input';

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'options-container';

  const addOptionBtn = document.createElement('button');
  addOptionBtn.textContent = '+ Add Option';
  addOptionBtn.onclick = () => {
    const optionInput = document.createElement('input');
    optionInput.type = 'text';
    optionInput.placeholder = 'Enter option';
    optionInput.className = 'option-input';
    optionsDiv.appendChild(optionInput);
  };

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Question';
  saveBtn.onclick = () => {
    const qText = questionInput.value.trim();
    const optionInputs = optionsDiv.querySelectorAll('.option-input');

    const options = Array.from(optionInputs)
      .map(inp => inp.value.trim())
      .filter(opt => opt !== '');

    if (qText === '' || options.length < 2) {
      alert('Enter a question and at least two options.');
      return;
    }

    questions[questionIndex] = { question: qText, options };
    localStorage.setItem('quizData', JSON.stringify(
      questions.filter(q => q)
    ));

    saveBtn.disabled = true;
    saveBtn.textContent = 'Saved!';
  };

  questionBlock.appendChild(questionInput);
  questionBlock.appendChild(optionsDiv);
  questionBlock.appendChild(addOptionBtn);
  questionBlock.appendChild(saveBtn);

  document.getElementById('questions-container').appendChild(questionBlock);
  questions.push(null);
}

function generateQuiz() {
  const validQuestions = questions.filter(q => q && q.options.length >= 2);
  if (validQuestions.length === 0) {
    alert("Add at least one valid question.");
    return;
  }

  localStorage.setItem('quizData', JSON.stringify(validQuestions));
  window.location.href = 'quiz.html';
}

// --------------- DISPLAY MODE -------------------
function loadQuiz() {
  const data = JSON.parse(localStorage.getItem('quizData') || '[]');
  const container = document.getElementById('quiz-container');
  if (!container || !data.length) return;

  container.innerHTML = '';

  data.forEach((q, index) => {
    const block = document.createElement('div');
    block.className = 'question-box';

    const questionEl = document.createElement('p');
    questionEl.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}`;
    block.appendChild(questionEl);

    q.options.forEach(opt => {
      const label = document.createElement('label');
      label.innerHTML = `
        <input type="radio" name="q${index}" value="${opt}" />
        ${opt}
      `;
      block.appendChild(label);
    });

    container.appendChild(block);
  });
}

function submitAnswers() {
  alert("Answers submitted. (You can extend this to calculate scores)");
}

window.onload = () => {
  if (document.getElementById('quiz-container')) loadQuiz();
};
