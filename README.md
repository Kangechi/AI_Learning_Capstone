#AI_Learning_Capstone
Requirements:

Python 3.10+
Node.js LTS
Git
Clone Repository:
git clone [your-repo-url]
cd Capstone_Project

Start Django- Terminal 1
cd backend
venv\Scripts\Activate.ps1     # Windows
pip install django
python manage.py migrate
python manage.py runserver

Start FastAPI - terminal 2
cd api
env\Scripts\Activate.ps1
pip install fastapi uvicorn django
python run.py

Start React Terminal 3
cd frontend
npm install
npm run dev

Open the app
Navigate to http://localhost:5173 in your browser.
Select a story → read page by page → navigate with Next/Previous → return to list.

Built in 4 days. Documented as it was built. Every error included.
