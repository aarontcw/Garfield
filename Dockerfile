# Dockerfile
FROM python:3.7-stretch
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential
RUN apt install mysql-server -y
COPY . /app
WORKDIR /app/backend
RUN pip install -r requirements.txt
WORKDIR /app/backend/src
ENTRYPOINT ["python"]
CMD ["app.py"]