#!/usr/bin/env bash
set -eu -o pipefail

MONGODB_TAG="3.6-jessie"

GIT_REV="$(git rev-parse HEAD)"
if ! git diff --quiet; then
    GIT_REV="${GIT_REV}-dev"
fi

GRAPHQL_SERVER_TAG="graphql-server:rev_${GIT_REV}"

pushd graphql-server
docker build -t "${GRAPHQL_SERVER_TAG}" . 
popd

TS_CLIENT_TAG="ts-client:rev_${GIT_REV}"

pushd ts-client
docker build -t "${TS_CLIENT_TAG}" .
popd

MONGODB_CONTAINER="$(docker run -d --rm "mongo:${MONGODB_TAG}")"

MONGODB_SERVER="mongo"
SERVER_CONTAINER="$(docker run -d --rm --link "${MONGODB_CONTAINER}":"${MONGODB_SERVER}" --env MONGODB_SERVER="${MONGODB_SERVER}" "${GRAPHQL_SERVER_TAG}")"

trap 'docker stop "${SERVER_CONTAINER}"; docker stop "${MONGODB_CONTAINER}"' EXIT

while sleep 1; do
    docker logs "${SERVER_CONTAINER}" | grep 'GraphiQL is now running on http://localhost:3000/graphiql' && break
done

docker run --rm --link "${SERVER_CONTAINER}":server "${TS_CLIENT_TAG}"
