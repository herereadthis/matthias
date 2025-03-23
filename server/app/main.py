# server/app/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
# the . is for relative import of the routers module
from .routers import root

# Helper function to normalize origins by stripping trailing slashes
# So that both http://localhost:8080 and http://localhost:8080/ will work
def normalize_origins(origins):
    return [origin.rstrip('/') for origin in origins]

# Create an instance of FastAPI and assign it to the variable app
app = FastAPI()

# List of allowed origins
allowed_origins = ["http://localhost:8080", "http://example.com/"]
app.add_middleware(
    CORSMiddleware,
    # uncomment the line when debugging
    # allow_origins=["*"],  
    allow_origins=normalize_origins(allowed_origins),
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Include the router from the root module
app.include_router(root.router)
