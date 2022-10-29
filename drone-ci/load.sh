#!/bin/bash

prepare() {
    # if [ "$ACCOUNT_SERVICE_HOST" = "" ]; then
    #     return "env ACCOUNT_SERVICE_HOST not set"
    # fi
    
    nginx -g "daemon off;"
}

prepare