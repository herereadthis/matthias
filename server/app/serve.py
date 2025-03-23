# Import the uvicorn library, which is an ASGI server to run FastAPI applications
import uvicorn
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

def main():
    """
    entry point for running the server
    app.main:app explaination:
    - app   refers to the app directory
    - main  refers to the main.py file
    - app   refers to the FastAPI instance created in the main.py 
            file with the variable name app

    host="0.0.0.0"  binds the server to all available IP addresses
    port=8000       sets the port to 8000
    reload=True     enables auto-reloading after any file changes
    """
    port = int(os.getenv("SERVER_PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)

if __name__ == "__main__":
    main()
