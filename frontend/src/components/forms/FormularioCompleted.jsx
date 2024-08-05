import React, { useEffect, useState } from 'react';
import Caracterizacion from './Caracterizacion';
import Question from './Question';
import FormCompletion from './FormCompletion';
import { fetchForms, submitForm } from '../../utils/apiService';

function FormularioCompleted() {
  const [currentFormIndex, setCurrentFormIndex] = useState(null);
  const [forms, setForms] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [caracterizacionData, setCaracterizacionData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCaracterizacionCompleted, setIsCaracterizacionCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchForms().then(data => {
      setForms(data.results);
    });

    const savedFormIndex = localStorage.getItem('currentFormIndex');
    if (savedFormIndex !== null) {
      setCurrentFormIndex(JSON.parse(savedFormIndex));
    }

    const savedAnswers = localStorage.getItem('formAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }

    const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    if (savedQuestionIndex) {
      setCurrentQuestionIndex(JSON.parse(savedQuestionIndex));
    }

    const savedCaracterizacionData = localStorage.getItem('caracterizacionData');
    if (savedCaracterizacionData) {
      setCaracterizacionData(JSON.parse(savedCaracterizacionData));
      setIsCaracterizacionCompleted(true);
    }

    const isFormCompleted = localStorage.getItem('isFormCompleted');
    if (isFormCompleted && JSON.parse(isFormCompleted) === true) {
      setIsCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (error) {
      // Limpiar el almacenamiento local y recargar la página
      localStorage.clear();
      window.location.reload(true); // Recargar la página eliminando la caché
    }
  }, [error]);

  const handleCaracterizacionSubmit = (data) => {
    const tipoIndex = data.companyType === 'Micro y Pequeñas Empresas' ? 0 : 
                      data.companyType === 'Unidades de Negocio Productivo' ? 1 : 
                      data.companyType === 'Medianas y Grandes Empresas' ? 2 : 
                      data.companyType === 'Excelencia Clínica' ? 3 : null;
    setCurrentFormIndex(tipoIndex);
    setCaracterizacionData(data);
    setIsCaracterizacionCompleted(true);
    localStorage.setItem('currentFormIndex', JSON.stringify(tipoIndex));
    localStorage.setItem('caracterizacionData', JSON.stringify(data));
  };

  const handleAnswerSelect = (answerId) => {
    const question = forms[currentFormIndex].questions[currentQuestionIndex];
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
      if (currentQuestionIndex < forms[currentFormIndex]?.questions.length - 1) {
        setCurrentQuestionIndex(current => current + 1);
        setSelectedAnswer(null);
      } else {
        setIsSubmitting(true);
        const submissionData = {
          answers: answers,
          info: caracterizacionData
        };
        submitForm(forms[currentFormIndex].title, caracterizacionData.userName, caracterizacionData.email, submissionData)
          .then(() => {
            setIsCompleted(true);
            localStorage.setItem('formAnswers', JSON.stringify(answers));
            localStorage.setItem('isFormCompleted', 'true');
            localStorage.removeItem('currentQuestionIndex');
            localStorage.removeItem('caracterizacionData');
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            setError(error); // Establecer el estado de error para manejarlo
          })
          .finally(() => {
            setIsSubmitting(false);
          });
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
    setIsCaracterizacionCompleted(false);
    setCaracterizacionData({});
    localStorage.removeItem('formAnswers');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('isFormCompleted');
    localStorage.removeItem('caracterizacionData');
  };

  return (
    <>
      {!isCompleted && !isCaracterizacionCompleted ? (
        <Caracterizacion onFormSubmit={handleCaracterizacionSubmit} />
      ) : !isCompleted && isCaracterizacionCompleted ? (
        forms.length > 0 && (
          <Question
            form={forms[currentFormIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNavigate={handleNavigation}
            isSubmitting={isSubmitting}
          />
        )
      ) : (
        <FormCompletion answers={answers} onRestart={handleRestart} />
      )}
    </>
  );
}

export default FormularioCompleted;