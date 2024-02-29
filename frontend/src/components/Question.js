import React from 'react';
import '../stylesheets/form.css';

function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate }) {


  return (
    <div className='formulario-container'>
      <div className='formulario'>
        <h1>{form.title}</h1>
        <p className='pregunta'>{form.questions[currentQuestionIndex].text}</p>

        <div className='formulario-buttons'>
          {form.questions[currentQuestionIndex].answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => onSelectAnswer(answer.id)}
              style={{
                backgroundColor: selectedAnswer === answer.id ? "#253D90" : "",
                color: selectedAnswer === answer.id ? "#65D7B7" : "",
              }}
            >
              {answer.text}
            </button>
          ))}
        </div>


        <div className='formulario-buttons'>
          {currentQuestionIndex > 0 && (
            <button onClick={() => onNavigate('previous')}>Atrás</button>
          )}
          <button onClick={() => onNavigate('next')}>
            {currentQuestionIndex < form.questions.length - 1 ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>

  );
}

export default Question;