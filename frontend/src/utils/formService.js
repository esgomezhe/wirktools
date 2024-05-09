export const fetchForms = async () => {
  // Tu implementación de fetch para obtener los formularios
  const response = await fetch('https://transformaciondigital.com.co/api/forms/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
  
export const submitForm = async (formTitle, userName, email, dataToSubmit) => {
  // Asumiendo que `dataToSubmit` ya contiene las propiedades `answers` e `info` adecuadamente estructuradas
  const completedFormData = {
    form_title: formTitle,
    user: userName,
    email: email,
    content: dataToSubmit, // Directamente utilizamos `dataToSubmit` que ya tiene la estructura correcta
  };
  
  const response = await fetch('https://transformaciondigital.com.co/api/completed-forms/', {
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