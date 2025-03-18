# Matthias

Matthias is an image uploading service. It uses a very simple static HTML front end, and Python FastAPI for the backend. The images will get uploaded to S3.

## Client

```shell
# The UI lives in /client directory
cd client
# Be on the the UI's Node version.
nvm use # fnm use is also fine
# Install dependencies
npm install
# Start the UI localhost:8080
npm start
```