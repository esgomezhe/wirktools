// formService.js
const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return cookieValue;
};

export const fetchForms = async () => {
  const response = await fetch('http://127.0.0.1:8000/api/forms/');
  //const response = await fetch('https://www.transformaciondigital.com.co/api/forms/');
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

  const response = await fetch('http://127.0.0.1:8000/api/completed-forms/', {
  //const response = await fetch('https://www.transformaciondigital.com.co/api/completed-forms/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': getCsrfToken(),  // Incluir token CSRF
    },
    body: JSON.stringify(completedFormData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
