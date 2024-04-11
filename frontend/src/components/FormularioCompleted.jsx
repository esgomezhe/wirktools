import React, { useEffect, useState } from 'react';
import Caracterizacion from './Caracterizacion';
import Question from './Question';
import FormCompletion from './FormCompletion';
import { fetchForms, submitForm } from '../utils/formService';

function FormularioCompleted() {
    const [currentFormIndex, setCurrentFormIndex] = useState(null);
    const [forms, setForms] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [caracterizacionData, setCaracterizacionData] = useState({});
    const [isCompleted, setIsCompleted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchForms().then(data => {
            setForms(data.results);
        });

        const savedFormIndex = localStorage.getItem('currentFormIndex');
        if (savedFormIndex !== null) {
            setCurrentFormIndex(JSON.parse(savedFormIndex));
        }
    }, []);

    const handleCaracterizacionSubmit = (data) => {
        const tipoIndex = data.companyType === 'micro_pequeñas' ? 0 : data.companyType === 'unidad_negocio_productivo' ? 1 : null;
        setCurrentFormIndex(tipoIndex);
        setCaracterizacionData(data);
        localStorage.setItem('currentFormIndex', JSON.stringify(tipoIndex));
        localStorage.setItem('caracterizacionData', JSON.stringify(data));
    };

    const handleAnswerSelect = (answerId) => {
        const question = forms[currentFormIndex].questions[currentQuestionIndex];
        const answer = question.answers.find(a => a.id === answerId);
        if (!answer) return;

        const newAnswers = [...answers, { questionId: question.id, answerId: answer.id }];
        setAnswers(newAnswers);
        localStorage.setItem('formAnswers', JSON.stringify(newAnswers));
    };

    const handleNavigation = (direction) => {
        if (direction === 'next' && currentQuestionIndex < forms[currentFormIndex].questions.length - 1) {
            setCurrentQuestionIndex(current => current + 1);
        } else if (direction === 'previous' && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(current => current - 1);
        } else if (direction === 'next' && currentQuestionIndex === forms[currentFormIndex].questions.length - 1) {
            setIsSubmitting(true);
            submitForm(forms[currentFormIndex].title, caracterizacionData, answers)
                .then(() => {
                    setIsCompleted(true);
                    localStorage.setItem('isFormCompleted', 'true');
                })
                .catch(error => {
                    console.error('Submission error', error);
                })
                .finally(() => {
                    setIsSubmitting(false);
                });
        }
    };

    const handleRestart = () => {
        setIsCompleted(false);
        setCurrentFormIndex(null);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        localStorage.clear(); // Be cautious with this in a real app; you might clear more than intended
    };

    if (currentFormIndex === null) {
        return <Caracterizacion onFormSubmit={handleCaracterizacionSubmit} />;
    } else if (!isCompleted) {
        return (
            <Question
                form={forms[currentFormIndex]}
                currentQuestionIndex={currentQuestionIndex}
                onSelectAnswer={handleAnswerSelect}
                onNavigate={handleNavigation}
                isSubmitting={isSubmitting}
            />
        );
    } else {
        return <FormCompletion answers={answers} onRestart={handleRestart} />;
    }
}

export default FormularioCompleted;