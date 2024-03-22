import React, { useEffect, useState } from 'react';
import Question from './Question';
import FormCompletion from './FormCompletion';
import { fetchForms, submitForm } from '../utils/formService';
import '../stylesheets/form.css';
import Footer from './Footer';


function Formulario() {
  const [forms, setForms] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  // Recuperar el estado guardado cuando el componente se monta
  useEffect(() => {
    fetchForms().then(data => setForms(data.results));
  
    const savedAnswers = localStorage.getItem('formAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  
    const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    if (savedQuestionIndex) {
      setCurrentQuestionIndex(JSON.parse(savedQuestionIndex));
    }
  
    const isFormCompleted = localStorage.getItem('isFormCompleted');
  setIsCompleted(JSON.parse(isFormCompleted));
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
      answers_count: question.answers_count,
      questionText: question.text,
      answerText: answer.text,
    };

    setSelectedAnswer(answerId);
    setAnswers(current => {
      const updatedAnswers = [...current, newAnswer];
      // Guardar respuestas actualizadas en localStorage
      localStorage.setItem('formAnswers', JSON.stringify(updatedAnswers));
      localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex + 1)); // Guardar el índice de la siguiente pregunta
      return updatedAnswers;
    });
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && selectedAnswer !== null) {
      if (currentQuestionIndex < forms[0]?.questions.length - 1) {
        setCurrentQuestionIndex(current => current + 1);
        setSelectedAnswer(null);
      } else {
        submitForm(forms[0].title, answers).then(() => {
          setIsCompleted(true);
          localStorage.setItem('formAnswers', JSON.stringify(answers));
          localStorage.setItem('isFormCompleted', 'true');
          localStorage.removeItem('currentQuestionIndex'); // Limpiar índice actual ya que el formulario está completado.
        }).catch(error => console.error('Error al enviar el formulario:', error));
      }
    } else if (direction === 'previous' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(current => current - 1);
      setSelectedAnswer(null);
      // Guardar el índice de la pregunta actual en localStorage al navegar hacia atrás
      localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex - 1));
      setAnswers(current => {
        const updatedAnswers = current.slice(0, -1); // Remover la última respuesta
        localStorage.setItem('formAnswers', JSON.stringify(updatedAnswers));
        return updatedAnswers;
      });
    }
  };

  const handleRestart = () => {
    setIsCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setAnswers([]);
    localStorage.removeItem('formAnswers');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('isFormCompleted'); // Limpiar el estado de completado
  };

  return (
    <>
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
      <Footer />
    </>

  );
}

export default Formulario;