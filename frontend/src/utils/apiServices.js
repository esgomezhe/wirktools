const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return cookieValue;
};

const CLIENT_TOKEN = process.env.REACT_APP_CLIENT_TOKEN;

export const fetchForms = async () => {
  const response = await fetch('/api/forms/', {
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
  const response = await fetch(`/api/completed-forms/check/${documentNumber}/`, {
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

  const response = await fetch('/api/completed-forms/', {
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

export const fetchCategoryAverages = async (documentNumber) => {
  const response = await fetch(`/api/category-averages/${documentNumber}/`, {
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