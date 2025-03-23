# server/app/main.py

from fastapi import FastAPI
# the . is for relative import of the routers module
from .routers import root

# Create an instance of FastAPI and assign it to the variable app
app = FastAPI()

# Include the router from the root module
app.include_router(root.router)
