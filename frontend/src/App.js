import React, { useEffect, useState } from 'react';

function App() {
  const [forms, setForms] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/forms/')
      .then(response => response.json())
      .then(data => setForms(data.results))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswer = {
        questionId: forms[0].questions[currentQuestionIndex].id,
        answerId: selectedAnswer,
      };
      setAnswers((current) => [...current, newAnswer]);

      if (currentQuestionIndex < forms[0]?.questions.length - 1) {
        setCurrentQuestionIndex((current) => current + 1);
        setSelectedAnswer(null); // Resetea la selección de respuesta para la próxima pregunta
      } else {
        setIsCompleted(true);
      }
    } else {
      alert("Por favor, selecciona una respuesta.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((current) => current - 1);
      setSelectedAnswer(null); // Opcional: resetea la selección o restaura la respuesta anterior si es necesario
      // Elimina la última respuesta guardada al retroceder
      setAnswers((current) => current.slice(0, -1));
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
  };

  return (
    <div>
      {!isCompleted ? (
        forms.length > 0 && (
          <div>
            <h1>{forms[0].title}</h1>
            <h2>{forms[0].questions[currentQuestionIndex].category}</h2>
            <p>{forms[0].questions[currentQuestionIndex].text}</p>
            {forms[0].questions[currentQuestionIndex].answers.map((answer) => (
              <button
                key={answer.id}
                onClick={() => handleAnswerSelect(answer.id)}
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
                <button onClick={handlePreviousQuestion}>Atrás</button>
              )}
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex < forms[0].questions.length - 1 ? "Siguiente" : "Finalizar"}
              </button>
            </div>
          </div>
        )
      ) : (
        <div>
          <p>¡Formulario completado!</p>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>Pregunta {answer.questionId}, Respuesta {answer.answerId}</li>
            ))}
          </ul>
          <button onClick={handleRestart}>Reiniciar Formulario</button>
        </div>
      )}
    </div>
  );
}

export default App;