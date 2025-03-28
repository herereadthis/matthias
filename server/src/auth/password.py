from passlib.context import CryptContext

# Update to use argon2id
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

def hash_password(password: str) -> str:
    """Generate an argon2id hash for the given password."""
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify that a plain text password matches the hashed password."""
    return pwd_context.verify(plain_password, hashed_password)
