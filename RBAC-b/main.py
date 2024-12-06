from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from routes import user_route, role_route

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
    "https://rbac-frontend-woad.vercel.app",
    "https://rbac-frontend-git-main-pm-2001s-projects.vercel.app/",
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
app.include_router(role_route.router, prefix="/role")