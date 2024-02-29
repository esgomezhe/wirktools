import React from 'react';
import '../stylesheets/form.css';

function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate }) {
  return (
    <div className='formulario'>
      <h1>{form.title}</h1>
      <p className='pregunta'>{form.questions[currentQuestionIndex].text}</p>
      {form.questions[currentQuestionIndex].answers.map((answer) => (
        <button
          className='button'
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