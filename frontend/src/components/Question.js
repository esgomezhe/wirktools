import React from 'react';
import '../stylesheets/form.css';

function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate }) {


  return (
    <div className='formulario-container'>
      <div className='formulario'>
        <h1>{form.title}</h1>
        <h3>{form.questions[currentQuestionIndex].category.name}</h3>
        <h4>{form.questions[currentQuestionIndex].sub_category}</h4>
        <p className='formulario-p text'>{form.questions[currentQuestionIndex].text}</p>


        <div className='formulario-buttons'>
          {form.questions[currentQuestionIndex].answers.map((answer) => (
            <button className='buttons-question'
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
            <button className='buttons-question' onClick={() => onNavigate('previous')}>Atrás</button>
          )}
          <button className='buttons-question' onClick={() => onNavigate('next')}>
            {currentQuestionIndex < form.questions.length - 1 ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>

  );
}

export default Question;