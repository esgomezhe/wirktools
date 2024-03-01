import React from 'react';
import '../stylesheets/form.css';

function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate }) {


  return (
    <div className='formulario-container'>
      <div className='formulario'>
        <h1>{form.title}</h1>
        <p className='formulario-p'>{form.questions[currentQuestionIndex].category}</p>
        <h2>{form.questions[currentQuestionIndex].category.name}</h2>
        <h3>{form.questions[currentQuestionIndex].sub_category}</h3>
        <p className='formulario-p text'>{form.questions[currentQuestionIndex].text}</p>

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