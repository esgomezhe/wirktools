import React from 'react';
import '../stylesheets/form.css';

// Añadir isSubmitting a las props desestructuradas
function Question({ form, currentQuestionIndex, selectedAnswer, onSelectAnswer, onNavigate, isSubmitting }) {

  // Calcular el porcentaje de progreso
  const progress = Math.floor((currentQuestionIndex / form.questions.length) * 100);

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
              disabled={isSubmitting} // Deshabilitar las opciones de respuesta cuando se está enviando el formulario
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
          {/* Deshabilitar el botón de navegación cuando isSubmitting sea true */}
          <button className='buttons-question' onClick={() => onNavigate('next')} disabled={isSubmitting}>
            {currentQuestionIndex < form.questions.length - 1 ? "Siguiente" : "Finalizar"}
          </button>
        </div>

        {/* Barra de progreso */}
        <div class="progress">
          <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">{`${progress}%`}</div>
        </div>

      </div>
    </div>
  );
}

export default Question;