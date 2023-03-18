# cooking assist
This app has a flask backend and React JS frontend

# Setup
- Install Python version 3.7.2
- Install Pip3 23.0.1

After succesful installation, run this command,
Since Frontend is served using the Flask App
We'll create a virtual env and work in there
in Root of the project run these
- python3 -m venv venv
- source venv/bin/activate (To Activate venv)
- pip install --upgrade pip
- pip3 install -r requirements.txt

Open a Second Terminal and
- cd frontend && npm i 

Note, Whenever we make changes to frontend
(helps create a build, which is used by backend to serve the app)
- npm run build 

To Run the App (switch to venv terminal tab) 
- flask run 

Go to localhost:8000 to checkout the app