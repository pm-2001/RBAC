from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from routes import user_route

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app = FastAPI()
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )
]
app = FastAPI(middleware=middleware)
# Include routers
app.include_router(user_route.router, prefix="/user")