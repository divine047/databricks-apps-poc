import os
import datetime
from fastapi import FastAPI, Request, HTTPException, Depends
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash
from databricks import sql
from databricks.sdk import WorkspaceClient
from databricks.sdk.core import Config

app = FastAPI()

origins = [
    "https://bse-int-test-app-2548836972759138.18.azure.databricksapps.com", "https://adb-2548836972759138.18.azuredatabricks.net", "http://localhost:3000"
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Databricks connection setup
def get_db_connection():
    cfg = Config()
    return sql.connect(
        server_hostname=cfg.host,
        http_path=f"/sql/1.0/warehouses/{os.getenv('DATABRICKS_WAREHOUSE_ID')}",
        credentials_provider=lambda: cfg.authenticate
    )

# User models
class UserRegister(BaseModel):
    email: str
    password: str
    team_name: str

class UserLogin(BaseModel):
    email: str
    password: str

class SelfAssessment(BaseModel):
    email: str
    question1: str
    question2: str
    question3: str

class UserProfile(BaseModel):
    email: str

class SelfReflection(BaseModel):
    email: str
    strengths: str
    growthAreas: str
    careerGoals: str

# Serve the static files
@app.get("/")
async def serve():
    return FileResponse('./static/index.html')

@app.get("/{path:path}")
async def static_proxy(path: str):
    return FileResponse(f'./static/{path}')

# Register new user
@app.post("/api/register")
async def register_user(user: UserRegister):
    try:
        email = user.email
        password = user.password
        team_name = user.team_name
        hashed_password = generate_password_hash(password, method='sha256')
        created_at = updated_at = datetime.datetime.now()

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO users.santhosh_kumarr.perf_app_users (email, password, team_name, created, updated) VALUES (?, ?, ?, ?, ?)",
                    (email, hashed_password, team_name, created_at, updated_at)
                )
        return JSONResponse(content={"message": "User registered successfully!"}, status_code=201)

    except Exception as e:
        return HTTPException(status_code=400, detail=f"Failed to register user: {e}")

# Login endpoint to verify user credentials
@app.post("/api/login")
async def login_user(user: UserLogin):
    try:
        email = user.email
        password = user.password

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM users.santhosh_kumarr.perf_app_users WHERE email = ?",
                    (email,)
                )
                user_db = cursor.fetchone()

        if user_db and check_password_hash(user_db[1], password):  # user[1] is the password field
            # session management for fastapi typically uses cookies or JWT, but this example does not implement it
            return JSONResponse(content={
                "message": "Login successful",
                "user": {"email": user_db[0], "team_name": user_db[2]}
            }, status_code=200)
        else:
            raise HTTPException(status_code=401, detail="Invalid email or password")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Login failed: {e}")

# Submit self-assessment
@app.post("/api/assessment_submit")
async def submit_assessment(assessment: SelfAssessment):
    try:
        email = assessment.email
        question1 = assessment.question1
        question2 = assessment.question2
        question3 = assessment.question3
        created_at = updated_at = datetime.datetime.now()

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO users.santhosh_kumarr.perf_self_assessment (email, question1, question2, question3, created, updated) VALUES (?, ?, ?, ?, ?, ?)",
                    (email, question1, question2, question3, created_at, updated_at)
                )
        return JSONResponse(content={"message": "Self-assessment submitted successfully!"}, status_code=201)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to submit assessment: {e}")

# Get user profile information
@app.get("/api/profile")
async def get_user_profile(profile: UserProfile):
    try:
        email = profile.email

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM users.santhosh_kumarr.perf_app_users WHERE email = ?",
                    (email,)
                )
                user = cursor.fetchone()

        if user:
            return JSONResponse(content={
                "user": {
                    "email": user[0],
                    "team_name": user[2],
                    "officeLocation": user[3],
                    "dateOfJoining": user[4],
                    "managerName": user[5],
                    "managerRole": user[6]
                }
            }, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="User not found")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch profile: {e}")

# Get the latest self-assessment for the user
@app.get("/api/assessments")
async def get_user_assessments(profile: UserProfile):
    try:
        email = profile.email

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM users.santhosh_kumarr.perf_self_assessment WHERE email = ? ORDER BY created DESC LIMIT 1",
                    (email,)
                )
                assessment = cursor.fetchone()

        if assessment:
            return JSONResponse(content={
                "assessment": {
                    "question1": assessment[1],
                    "question2": assessment[2],
                    "question3": assessment[3]
                }
            }, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="No assessments found")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to fetch assessments: {e}")

# POST & GET for Self-Reflection
@app.post("/api/self-reflection")
async def submit_self_reflection(reflection: SelfReflection):
    try:
        email = reflection.email
        strengths = reflection.strengths
        growth_areas = reflection.growthAreas
        career_goals = reflection.careerGoals
        created_at = updated_at = datetime.datetime.now()

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "INSERT INTO users.santhosh_kumarr.perf_self_reflection (email, strengths, growth_areas, career_goals, created, updated) VALUES (?, ?, ?, ?, ?, ?)",
                    (email, strengths, growth_areas, career_goals, created_at, updated_at)
                )
        return JSONResponse(content={"message": "Self-reflection submitted successfully!"}, status_code=201)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to handle self-reflection: {e}")

@app.get("/api/self-reflection")
async def get_self_reflection(profile: UserProfile):
    try:
        email = profile.email

        with get_db_connection() as connection:
            with connection.cursor() as cursor:
                cursor.execute(
                    "SELECT * FROM users.santhosh_kumarr.perf_self_reflection WHERE email = ? ORDER BY created DESC LIMIT 1",
                    (email,)
                )
                reflection = cursor.fetchone()

        if reflection:
            return JSONResponse(content={
                "self_reflection": {
                    "strengths": reflection[1],
                    "growthAreas": reflection[2],
                    "careerGoals": reflection[3]
                }
            }, status_code=200)
        else:
            raise HTTPException(status_code=404, detail="No self-reflection found")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to handle self-reflection: {e}")

# Logout - End user session
@app.post("/api/logout")
async def logout_user():
    try:
        # In FastAPI, typically you use JWT tokens or other methods for logout
        # This is just a placeholder since session management needs to be handled differently.
        return JSONResponse(content={"message": "Logout successful"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Logout failed: {e}")
    
@app.get("/health")
def health_check():
    # Check basic status (could include DB, services, etc.)
    return {"status": "healthy"}

