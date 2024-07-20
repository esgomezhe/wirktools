const getCsrfToken = () => {
  const name = 'csrftoken';
  const cookieValue = document.cookie.split('; ').find(row => row.startsWith(name))?.split('=')[1];
  return cookieValue;
};

export const fetchForms = async () => {
  const response = await fetch('/api/forms/');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const checkDocument = async (documentNumber) => {
  const response = await fetch(`/api/completed-forms/check/${documentNumber}/`);
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
    },
    body: JSON.stringify(completedFormData),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const deleteForm = async (formId) => {
  const response = await fetch(`/api/completed-forms/${formId}/delete/`, {
    method: 'DELETE',
    headers: {
      'X-CSRFToken': getCsrfToken(),
    },
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};