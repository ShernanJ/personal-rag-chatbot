from fastapi import FastAPI
from pydantic import BaseModel, conlist
import cohere
from cohere import ClassifyExample

import os
from dotenv import load_dotenv

from typing import Union

load_dotenv()

co = cohere.ClientV2(os.getenv('COHERE_API_KEY'))

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
  
@app.get("/cohere")
def read_cohere():
  res = co.chat(
    model="command-r-plus-08-2024",
    messages=[
        {
            "role": "user",
            "content": "Write a title for a blog post about API design. Only output the title text.",
        }
    ],
  )
  print(res.message.content[0].text) # "The Ultimate Guide to API Design: Best Practices for Building Robust and Scalable APIs"

  return {"res": res.message.content[0].text}