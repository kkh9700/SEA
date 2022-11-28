from turtle import dot
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import replicate
import uvicorn
# from dotenv import dotenv_values
# import os

app = FastAPI()

# envDict = dotenv_values('.env')
# os.environ["REPLICATE_API_TOKEN"] = envDict['REPLICATE_API_TOKEN']

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/donation/get-image/{item_id}')
async def root(item_id):
    model = replicate.models.get("stability-ai/stable-diffusion")
    output_url = model.predict(prompt=item_id, num_outputs=4)
    response = {'picture':
        [output_url[0],
        output_url[1],
        output_url[2],
        output_url[3]]
    }
    return response

if __name__ == '__main__':
    uvicorn.run("main:app",
                host="0.0.0.0",
                port=8000,
                reload=True,
                ssl_keyfile="/code/letsencrypt/privkey1.pem",
                ssl_keyfile_password="ssafy506", 
                ssl_certfile="/code/letsencrypt/cert1.pem"
                )
