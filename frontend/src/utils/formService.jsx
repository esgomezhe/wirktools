const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return cookieValue;
};

const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_TOKEN;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_FORMS = `${API_BASE_URL}/forms/`;
const API_COMPLETED_FORMS = `${API_BASE_URL}/completed-forms/`;
const API_CHECK_DOCUMENT = `${API_BASE_URL}/completed-forms/check/`;

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
  const response = await fetch(`${API_COMPLETED_FORMS}${formId}delete/`, {
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