export const fetchForms = async () => {
  // Tu implementación de fetch para obtener los formularios
  const response = await fetch('http://localhost:8000/forms/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
  
export const submitForm = async (formTitle, answers) => {
  // Tu implementación de fetch para enviar un formulario completado
  const completedFormData = {
    form_title: formTitle,
    content: {
      answers,
    },
  };
  
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
  return response.json();
};