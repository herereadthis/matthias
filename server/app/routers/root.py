# Imporrt the APIRouter class from FastAPI library, in order to create a router instance
from fastapi import APIRouter

# Create an instance of APIRouter and assign it to the variable router
router = APIRouter()

# Define a route for HTTP GET method at root path /
# The @ decorator is used to specify the route
@router.get("/")
def read_root():
    return {"message": "Hello, world!"}
    