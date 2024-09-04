"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route("/user", methods=["POST"])
def create_user():
    # Get request data
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        raise APIException("Email and password are required fields", 400)
    
    # Search email to comprobate if already exist
    user_exist = User.query.filter_by(email=email).first()
    
    print(user_exist)
    if user_exist:
        raise APIException("User email already exist in DB", 400)
    
    newUser = User(
        email=email,
        password=password,
        is_active=True
    )
    
    db.session.add(newUser)
    db.session.commit()
    
    return jsonify({ "message": "User created successfully" }), 201

@api.route('/token', methods=['POST'])
def create_token():
    # Get request username and password
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    # Search user in DB
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None:
        raise APIException("Invalid credentials", 401)
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({ "token": access_token, "user_id": user.id }), 200

@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    return jsonify({ "id": user.id, "email": user.email }), 200