# OpenAPI

API description format for REST APIs.

The example `api.yaml` uses OpenAPI 3.0.0

# Swagger

Swagger is a set of open-source **tools** built around the OpenAPI Specification that can help you design, build, document and consume REST APIs.

## Swagger Editor

Browser-based editor where you can write OpenAPI specs.

### Usage

Run API editor via Docker:

```
docker pull swaggerapi/swagger-editor
docker run -d --name api-editor -p 4001:8080 swaggerapi/swagger-editor
```

## Swagger UI

Renders OpenAPI specs as interactive API documentation.

### Usage

Run API doc via Docker:

```
docker pull swaggerapi/swagger-ui
docker run -p 4002:8080 --name api-doc -e SWAGGER_JSON=/api.yaml -v /Users/zicodeng/zlab/openapi/api.yaml:/api.yaml swaggerapi/swagger-ui
```
