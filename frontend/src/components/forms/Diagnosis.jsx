import React, { useEffect, useState } from 'react';
import Personal from './Personal';
import Questions from './Questions';
import ResultsDisplay from './ResultsDisplay';
import { fetchForms, submitForm, checkDocument, fetchCategoryAverages } from '../../utils/apiServices';

function Diagnosis() {
  const [currentFormIndex, setCurrentFormIndex] = useState(null);
  const [forms, setForms] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [personalData, setPersonalData] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [isPersonalCompleted, setIsPersonalCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);

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

    const savedPersonalData = localStorage.getItem('personalData');
    if (savedPersonalData) {
      setPersonalData(JSON.parse(savedPersonalData));
      setIsPersonalCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (error) {
      localStorage.clear();
      window.location.reload(true);
    }
  }, [error]);

  useEffect(() => {
    if (isCompleted && personalData.document) {
      const verifyDocument = async () => {
        try {
          const response = await checkDocument(personalData.document);
          if (response.exists) {
            setUserData({ ...response.data, id: response.id, createdAt: response.data.created_at });
            const categoryResponse = await fetchCategoryAverages(personalData.document);
            if (categoryResponse.exists) {
              setCategoryData(categoryResponse.category_averages);
            }
          }
        } catch (error) {
          console.error('Error al verificar el documento:', error);
        }
      };
      verifyDocument();
    }
  }, [isCompleted, personalData]);

  const handlePersonalSubmit = (data) => {
    const tipoIndex = forms.findIndex(form => form.title === data.company_type);
    setCurrentFormIndex(tipoIndex);
    setPersonalData(data);
    setIsPersonalCompleted(true);
    localStorage.setItem('currentFormIndex', JSON.stringify(tipoIndex));
    localStorage.setItem('personalData', JSON.stringify(data));
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
      const updatedAnswers = current.filter(a => a.questionId !== question.id).concat(newAnswer);
      localStorage.setItem('formAnswers', JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && selectedAnswer !== null) {
      if (currentQuestionIndex < forms[currentFormIndex]?.questions.length - 1) {
        setCurrentQuestionIndex(current => current + 1);
        setSelectedAnswer(null);
        localStorage.setItem('currentQuestionIndex', JSON.stringify(currentQuestionIndex + 1));
      } else {
        setIsSubmitting(true);
        const submissionData = {
          answers: answers,
          info: personalData
        };
        submitForm(forms[currentFormIndex].title, personalData.user_name, personalData.email, submissionData)
          .then(() => {
            setIsCompleted(true);
            localStorage.removeItem('currentQuestionIndex');
            localStorage.removeItem('personalData');
            localStorage.removeItem('formAnswers');
          })
          .catch(error => {
            console.error('Error al enviar el formulario:', error);
            setError(error);
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
        const updatedAnswers = current.filter(a => a.questionId !== forms[currentFormIndex].questions[currentQuestionIndex].id);
        localStorage.setItem('formAnswers', JSON.stringify(updatedAnswers));
        return updatedAnswers;
      });
    }
  };

  return (
    <>
      {!isCompleted && !isPersonalCompleted ? (
        <Personal onFormSubmit={handlePersonalSubmit} formNames={forms.map(form => form.title)} />
      ) : !isCompleted && isPersonalCompleted ? (
        forms.length > 0 && (
          <Questions
            form={forms[currentFormIndex]}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswer={selectedAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNavigate={handleNavigation}
            isSubmitting={isSubmitting}
          />
        )
      ) : (
        <ResultsDisplay
          userData={userData}
          categoryData={categoryData}
        />
      )}
    </>
  );
}

export default Diagnosis;