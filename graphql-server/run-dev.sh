#!/usr/bin/env bash
set -eu -o pipefail

MONGODB_TAG="3.6-jessie"

GIT_REV="$(git rev-parse HEAD)"
if ! git diff --quiet; then
    GIT_REV="${GIT_REV}-dev"
fi

GRAPHQL_SERVER_TAG="graphql-server:rev_${GIT_REV}"

pushd "$(dirname "$0")"
docker build -t "${GRAPHQL_SERVER_TAG}" .
popd

MONGODB_CONTAINER="$(docker run -d --rm "mongo:${MONGODB_TAG}")"

trap 'docker stop "${MONGODB_CONTAINER}"' EXIT

export MONGODB_SERVER="mongo"
docker run --rm -it --link "${MONGODB_CONTAINER}":"${MONGODB_SERVER}" \
    --env MONGODB_SERVER \
    --env APOLLO_ENGINE_API_KEY \
    --publish 3000:3000 \
    "${GRAPHQL_SERVER_TAG}"
