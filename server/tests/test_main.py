"""
This file is a module for testing FastAPI application endpoints.

The TestClient from FasAPI is a way to test requests agains the FastAPI app
without having to run an actual server. TestClient is built on top of TestClient
from Starlette, which in turn uses httpx for making HTTP requests.
"""

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello, world!"}
