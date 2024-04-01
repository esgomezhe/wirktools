import React, { useEffect, useState } from 'react';
import Question from './Question';
import Caracterizacion from './Caracterizacion';
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
  const [isCharacterizationComplete, setIsCharacterizationComplete] = useState(false); // Nuevo estado

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

    // Considerar agregar lógica para verificar si el formulario de caracterización ha sido completado
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
      localStorage.setItem('formAnswers', JSON.stringify(updatedAnswers));
      localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex + 1));
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
          localStorage.removeItem('currentQuestionIndex');
        }).catch(error => console.error('Error al enviar el formulario:', error));
      }
    } else if (direction === 'previous' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(current => current - 1);
      setSelectedAnswer(null);
      localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex - 1));
      setAnswers(current => {
        const updatedAnswers = current.slice(0, -1);
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
    localStorage.removeItem('isFormCompleted');
    // Considerar también reiniciar el estado relacionado con el formulario de caracterización si es necesario
  };

  const renderFormContent = () => {
    if (!isCompleted) {
      if (!isCharacterizationComplete) {
        return <Caracterizacion onFormSubmit={() => setIsCharacterizationComplete(true)} />;
      } else if (forms.length > 0) {
        return (
          <Question
            form={forms[0]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNavigate={handleNavigation}
          />
        );
      }
    } else {
      return <FormCompletion answers={answers} onRestart={handleRestart} />;
    }
  };

  return (
    <>
      <div>
        {renderFormContent()}
      </div>
      <Footer />
    </>
  );
}

export default Formulario;