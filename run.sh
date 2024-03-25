#!/bin/bash
if [ -n "$1" ] && [ "$1" = "prod" ]; then
    docker-compose -f docker-compose.prod.yml up --build
else
    docker-compose -f docker-compose.dev.yml up --build
fi
