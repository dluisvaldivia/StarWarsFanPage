"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Followers
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
    return response_body, 200


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalars()
    if email != "test" or password != "test":
        response_body['message'] = "Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id})
    response_body['message'] = f'bienvenido {email}'
    response_body['access_token'] = access_token
    return response_body, 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    response_body['logged_in_as'] = current_user
    return response_body, 200


@api.route('/users')
def users():
    response_body = {}
    rows = db.session.execute(db.select(Users)).scalars()
    result = [row.serialize() for row in rows]
    response_body['message'] = 'Listado de Usuarios y sus publicaciones(GET)'
    response_body['results'] = result
    return response_body, 200

    
# Endpoints de Publicaciones (Post) CRUD
@api.route('/posts', methods=['GET', 'POST'])
def posts():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Posts)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las Publicaciones (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        # validar si estoy recibiendo todas las claves (campos)
        row = Posts(title = data.get('title'),
                    description = data.get('description'),
                    body = data.get('body'),
                    date = datetime.now(),
                    image_url = data.get('image_url'),
                    user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def post(id):
    response_body = {}
    row = db.session.execute(db.select(Posts).where(Posts.id == id)).scalar()
    if not row:
        response_body['message'] = f'La publicacion: {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id} - (GET)'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
        row.user_id = data.get('user_id')
        db.session.commit()
        response_body['message'] = f'Publicación: {id} modificada - (PUT)'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(row)
        db.session.commit()
        response_body['message'] = f'Publicación: {id} eliminada - (DELETE)'
        response_body['results'] = {}
        return response_body, 200

# quiero ver todos los seguidores de todos los usuarios
#@api.route('/follower', methods=['GET'])

#quiero ver todos los followers de un usuario
#@api.route('/users/<int:id>/followers', methods=['GET']) #no lleva un post
    

#quiero ver todos los following de un usuario
#@api.route('/users/<int: id>/following', methods=['GET'])

#quiero ver todos los comentarios de un post
@api.route('/posts/<int:id>/comments', methods=['GET'])
def comments(id):
    row = db.session.execute(db.select(Comments).where(Comments == {id})).scalar()
    response_body = {}
    response_body['message'] = "lista de comentarios"
    response_body['results'] = row.serialize()
    return response_body, 200


#quiero ver todos los comentarios de un usario
#@api.route('/users/<int: id>/comments', methods=['GET'])

@api.route('/temp', methods=['GET'])
def temp():
    response_body = {}
    url = 'https://www.swapi.tech/api/people/'
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        print(data)
        response_body['results'] = data
    return response_body, 200