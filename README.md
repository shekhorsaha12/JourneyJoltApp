# Journey Jolt App

## Backend - Django app

### Setup python virtual environment

```
python -m venv venv
source ./venv/bin/activate
```

### Install dependencies/module

```
pip install -r requirements.txt
```

### Migrate models/database

> Please from core/settings.py switch the database to local sqlite db before running the dev server

```
python manage.py makemigrations
python manage.py migrate
```

### Run the app

```
python manage.py runserver
```

### Run background job/task runner for weather update/synchronization

```
python manage.py process_tasks
```

## Frontend React App

### Install dependencies

```
npm i
```

### Run the app

```
npm run dev
```

### Build and Serve

```
npm run build
npm run preview
```

## Run with Docker for production

### Please make sure you have docker installed and docker-compose installed

```
docker-compose up --build

# CTRL + C to kill the docker app
```

### To run in terminal detached mode (put the process in the background),

```
docker-compose up -d --build
```

### And to stop the running background docker containers

```
docker-compose down
```
