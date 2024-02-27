import React from 'react';

function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate }) {
  return (
    <div>
      <h1>{form.title}</h1>
      <h2>{form.questions[currentQuestionIndex].category}</h2>
      <h3>{form.questions[currentQuestionIndex].sub_category}</h3>
      <p>{form.questions[currentQuestionIndex].text}</p>
      {form.questions[currentQuestionIndex].answers.map((answer) => (
        <button
          key={answer.id}
          onClick={() => onSelectAnswer(answer.id)}
          style={{
            margin: "5px",
            backgroundColor: selectedAnswer === answer.id ? "#add8e6" : "",
          }}
        >
          {answer.text}
        </button>
      ))}
      <div>
        {currentQuestionIndex > 0 && (
          <button onClick={() => onNavigate('previous')}>Atrás</button>
        )}
        <button onClick={() => onNavigate('next')}>
          {currentQuestionIndex < form.questions.length - 1 ? "Siguiente" : "Finalizar"}
        </button>
      </div>
    </div>
  );
}

export default Question;