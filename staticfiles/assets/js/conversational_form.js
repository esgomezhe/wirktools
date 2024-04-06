document.addEventListener("DOMContentLoaded", function() {
    const formContainer = document.getElementById('conversationalForm');
    const formId = formContainer.getAttribute('data-form-id');
    let lastQuestionId = null;

    function loadNextQuestion() {
        const url = lastQuestionId ?
            `/get-next-question/${formId}/${lastQuestionId}/` :
            `/get-next-question/${formId}/`;
        fetch(url).then(response => response.json()).then(data => {
            if (data.end) {
                formContainer.innerHTML = '<p>Thank you for completing the form.</p>';
            } else {
                displayQuestion(data);
            }
        });
    }

    function displayQuestion(data) {
        formContainer.innerHTML = `<p>${data.question_text}</p>`;
        data.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.onclick = () => submitAnswer(data.question_id, answer.id);
            formContainer.appendChild(button);
        });
    }

    function submitAnswer(questionId, answerId) {
        fetch('/submit-answer/', {
            method: 'POST',
            body: JSON.stringify({ question_id: questionId, answer_id: answerId }),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'), // Ensure you have a function to get CSRF token
            },
        }).then(response => response.json()).then(data => {
            if (data.success) {
                lastQuestionId = questionId;
                loadNextQuestion();
            }
        });
    }

    loadNextQuestion();
});