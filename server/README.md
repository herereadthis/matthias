# Server

## Start it up

### Prerequisites

```shell
# install poetry. the first way is via pip
pip install poetry
# or, curl poetry
curl -sSL https://install.python-poetry.org | python3 -
```

### Start server

```shell
# From the server/ directory:
poetry install
# serve is server/serve.py
poetry run serve
```

## Confirm the server is working

```shell
curl http://127.0.0.1:8000/
```