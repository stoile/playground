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

MONGODB_SERVER="mongo"
SERVER_CONTAINER="$(docker run -d --rm --link "${MONGODB_CONTAINER}":"${MONGODB_SERVER}" --env MONGODB_SERVER="${MONGODB_SERVER}" --publish 3000:3000 "${GRAPHQL_SERVER_TAG}")"

trap 'docker stop "${SERVER_CONTAINER}"; docker stop "${MONGODB_CONTAINER}"' EXIT

while sleep 1; do
    docker logs "${SERVER_CONTAINER}" | grep 'GraphiQL is now running on http://localhost:3000/graphiql' && break
done

echo "Now do something like \"curl -G --data-urlencode \"query={ allAuthors { id } }\" http://localhost:3000/graphql\""

read
