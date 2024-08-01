const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return cookieValue;
};

const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_TOKEN; // Token sincronizado con el backend
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Base URL para las APIs
const API_FORMS = `${API_BASE_URL}/forms/`; // Ruta de la API para los formularios
const API_COMPLETED_FORMS = `${API_BASE_URL}/completed-forms/`; // Ruta de la API para los formularios completados
const API_CHECK_DOCUMENT = `${API_BASE_URL}/completed-forms/check/`; // Ruta de la API para verificar el documento
const API_DELETE_FORMS = `${API_BASE_URL}completed-forms/`; // Ruta de la API para obtener promedios de categorías


export const fetchForms = async () => {
  const response = await fetch(API_FORMS, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Client-Token': CLIENT_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const checkDocument = async (documentNumber) => {
  const response = await fetch(`${API_CHECK_DOCUMENT}${documentNumber}/`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'X-Client-Token': CLIENT_TOKEN,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const submitForm = async (formTitle, userName, email, dataToSubmit) => {
  const completedFormData = {
    form_title: formTitle,
    user: userName,
    email: email,
    content: dataToSubmit,
  };

  const response = await fetch(API_COMPLETED_FORMS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken(),
      'X-Client-Token': CLIENT_TOKEN,
    },
    credentials: 'include',
    body: JSON.stringify(completedFormData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteForm = async (formId) => {
  const response = await fetch(`${API_DELETE_FORMS}${formId}/delete/`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'X-Client-Token': CLIENT_TOKEN,
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};