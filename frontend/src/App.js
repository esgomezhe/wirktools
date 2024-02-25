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
    const question = forms[0].questions[currentQuestionIndex];
    const answer = question.answers.find(a => a.id === answerId);
    if (!answer) return;

    const newAnswer = {
      questionId: question.id,
      answerId: answer.id,
      value: answer.value,
      category: question.category,
    };

    setSelectedAnswer(answerId);
    setAnswers(current => [...current, newAnswer]);
  };

  const handleNextQuestion = async () => {
    if (selectedAnswer !== null) {
      if (currentQuestionIndex < forms[0]?.questions.length - 1) {
        setCurrentQuestionIndex(current => current + 1);
        setSelectedAnswer(null);
      } else {
        await handleSubmitForm();
        setIsCompleted(true);
      }
    } else {
      alert("Por favor, selecciona una respuesta.");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(current => current - 1);
      setSelectedAnswer(null);
      // Opcionalmente, podrías remover la última respuesta seleccionada si retrocedes
      setAnswers(current => current.slice(0, -1));
    }
  };

  const calculateCategoryAverages = () => {
    const categoryScores = {};
    const categoryCounts = {};

    answers.forEach(({ category, value }) => {
      if (categoryScores[category]) {
        categoryScores[category] += value;
        categoryCounts[category] += 1;
      } else {
        categoryScores[category] = value;
        categoryCounts[category] = 1;
      }
    });

    return Object.keys(categoryScores).map(category => ({
      category,
      average: categoryScores[category] / categoryCounts[category],
    }));
  };

  const handleSubmitForm = async () => {
    const completedFormData = {
      form_title: forms[0].title,
      content: {
        answers: answers,
      },
    };

    try {
      const response = await fetch('http://localhost:8000/completed-forms/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completedFormData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Formulario enviado con éxito');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
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
          <h2>Promedio de Puntajes por Categoría</h2>
          <ul>
            {calculateCategoryAverages().map(({ category, average }) => (
              <li key={category}>{category}: {average.toFixed(2)}</li>
            ))}
          </ul>
          <button onClick={handleRestart}>Rellenar otro formulario</button>
        </div>
      )}
    </div>
  );
}

export default App;