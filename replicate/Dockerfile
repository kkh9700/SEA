# 
FROM python:3.10

# 
WORKDIR /code

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# 
COPY ./app /code/app

# 
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--ssl-keyfile", "/etc/letsencrypt/live/j7a506.p.ssafy.io/privatekey.pem", "--ssl-certfile", "/etc/letsencrypt/live/j7a506.p.ssafy.io/cert.pem", "--ssl-keyfile-password", "ssafy506"]

CMD ["python", "app/main.py"]
