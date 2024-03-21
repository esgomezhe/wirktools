# wirktools
Ecosistema de herramientas para Wirk Consulting SAS

# Wirktools template

A Wirktools template for a typical django and react installation with no 
special bells or whistles. It is supposed as a starting point 
for new projects.

If you prefer a different set of template settings, feel free to 
create your own templates by cloning this repo.

To install WIRKTOOLS by hand type the following commands:

1. Create virtual environment and activate it
   ```
   python -m venv .venv
   source .venv/bin/activate
   ```
2. Install Django and other required packages
   ```
   pip install -r requeriments.txt
   ```
3. Install React and other required packages
   ```
   cd frontend/
   npm install
   ```
4. Run backend server (In main folder)
   ```
   python manage.py runserver
   ```
5. Run frontend server (In frontend folder)
   ```
   npm start
   ```
