var questions = [];

function addQuestion() {
    var questionIndex = questions.length;

    var questionDiv = document.createElement('div');
    questionDiv.className = 'question-block';

    var questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.placeholder = 'Enter your question';
    questionInput.className = 'question-input';
    questionInput.setAttribute('data-qindex', questionIndex);

    var optionList = document.createElement('div');
    optionList.className = 'option-list';
    optionList.setAttribute('data-qindex', questionIndex);

    var addOptionBtn = document.createElement('div');
    addOptionBtn.className = 'dotted-box';
    addOptionBtn.textContent = '+ Add Option';
    addOptionBtn.onclick = function() {
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter option';
        input.className = 'option-input';
        optionList.appendChild(input);
    };

    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save Question';
    saveBtn.onclick = function() {
        var questionText = questionInput.value.trim();
        var optionInputs = optionList.getElementsByTagName('input');

        var options = [];
        for (var i = 0; i < optionInputs.length; i++) {
            var val = optionInputs[i].value.trim();
            if (val !== '') {
                options.push(val);
            }
        }

        if (questionText === '' || options.length < 2) {
            alert('Please enter a valid question and at least 2 options.');
            return;
        }

        questions[questionIndex] = {
            question: questionText,
            options: options
        };

        var validQuestions = questions.filter(function(q) {
            return q && q.question && q.options.length >= 2;
        });
        localStorage.setItem('quizData', JSON.stringify(validQuestions));
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saved!';
    };

    var cancelBtn = document.createElement('button');
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = function() {
        questionDiv.remove();
    }

    questionDiv.appendChild(questionInput);
    questionDiv.appendChild(optionList);
    questionDiv.appendChild(addOptionBtn);
    questionDiv.appendChild(saveBtn);
    questionDiv.appendChild(cancelBtn);

    document.getElementById('questions-container').appendChild(questionDiv);

    questions.push(null);
}

function generateQuiz() {
    var validQuestions = questions.filter(function(q) {
        return q && q.question && q.options && q.options.length >= 2;
    });

    if (validQuestions.length === 0) {
        alert('Please add at least one valid question.');
        return;
    }

    localStorage.setItem('quizData', JSON.stringify(validQuestions));
    window.location.href = 'display.html';
}

const quizData = JSON.parse(localStorage.getItem('quizData') || '[]');
const container = document.getElementById('quiz-container');

if (quizData.length === 0) {
    container.innerHTML = '<p>No quiz has been generated yet.</p>';
} else {
    let html = '';
    for (let i = 0; i < quizData.length; i++) {
        const q = quizData[i];
        html += `
        <div class="question-box">
          <p><strong>Question ${i + 1}:</strong> ${q.question}</p>
          <ul>
            ${q.options.map(opt => `
              <li>
                <label><input type="radio" name="q${i}" value="${opt}"> ${opt}</label>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
    }
    container.innerHTML = html;
}

function submitAnswers() {
    alert('Answers submitted.');
}