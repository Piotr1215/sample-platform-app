# nginx-demo

Simple static demo web page served from nginx server for kubernetes tutorials
and demos.

Connects to Azure Storage Account via a secret and env variable.

## Usage

Run the container locally with:

```bash
docker run --pull=always -d -p 3000:3000 piotrzan/platform-demo:latest
```

Then open your browser at `http://localhost:3000`.

## Deployment

The docker image is automatically pulled and build in Docker Hub on every push


