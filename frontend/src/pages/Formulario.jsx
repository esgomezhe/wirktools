import React, { useEffect, useState } from 'react';
import Question from '../components/Question';
import FormCompletion from '../components/FormCompletion';
import { fetchForms, submitForm } from '../utils/formService';

function Formulario() {

  const [forms, setForms] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    fetchForms().then(data => setForms(data.results));
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

  const handleNavigation = (direction) => {
    if (direction === 'next' && selectedAnswer !== null) {
      if (currentQuestionIndex < forms[0]?.questions.length - 1) {
        setCurrentQuestionIndex(current => current + 1);
        setSelectedAnswer(null);
      } else {
        submitForm(forms[0].title, answers)
          .then(() => setIsCompleted(true))
          .catch(error => console.error('Error al enviar el formulario:', error));
      }
    } else if (direction === 'previous' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(current => current - 1);
      setSelectedAnswer(null);
      setAnswers(current => current.slice(0, -1));
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
          <Question
            form={forms[0]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNavigate={handleNavigation}
          />
        )
      ) : (
        <FormCompletion answers={answers} onRestart={handleRestart} />
      )}
    </div>
  );
}

export default Formulario;