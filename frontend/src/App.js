import React, { useEffect, useState } from 'react';

function App() {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/forms/')
      .then(response => response.json())
      .then(data => setForms(data.results)) // Asegúrate de acceder a la clave 'results'
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      {forms.map(form => (
        <div key={form.id}>
          <h1>{form.title}</h1>
          {form.questions.map(question => (
            <div key={question.id}>
              <p>{question.text}</p>
              {question.answers.map(answer => (
                <button key={answer.id}>{answer.text}</button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;