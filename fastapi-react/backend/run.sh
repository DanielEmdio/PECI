#!/bin/bash
set -xe

cd app/
uvicorn main:app --host 0.0.0.0 --port 8000 --reload