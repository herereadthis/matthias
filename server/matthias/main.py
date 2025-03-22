from fastapi import FastAPI

app = FastAPI()

@app.post("/image")
async def upload_image():
    print("hello world")
    return {"message": "hello world"}
