#!/bin/bash

echo 'Making migrations'
python manage.py makemigrations
echo 'Applying migrations'
python manage.py migrate
echo 'Run the background task processor'
python manage.py process_tasks &
echo 'Running django server'
python manage.py runserver 0.0.0.0:8080