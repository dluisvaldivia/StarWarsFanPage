"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend"
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
        # Opción 2
        # result = []
        # for row in rows:
        #    result.append(row.serialize())
        # Opción 1 - list comprehension
        # var  = [ objetivo for iterador in lista ]
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
                    user_id = data.get('user_id'),)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una Publicación (POST)'
        response_body['results'] = row.serialize()
        return response_body, 200


@api.route('/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def post(id):
    response_body = {}
    # validar que id exista en la base de datos
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id} - (GET)'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'PUT':
        response_body['message'] = f'Publicación: {id} modificada - (PUT)'
        response_body['results'] = {}
        return response_body, 200
    if request.method == 'DELETE':

        response_body['message'] = f'Publicación: {id} eliminada - (DELETE)'
        response_body['results'] = {}
        return response_body, 200

@api.route('/medias', methods=['GET', 'POST'])
@api.route('/medias/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/comments', methods=['GET', 'POST'])
def comments():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(comments)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'listado de mensajes (GET)'
        response_body['results'] = result
@api.route('/comments/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/followers', methods=['GET', 'POST'])
@api.route('/followers/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/following', methods=['GET', 'POST'])
@api.route('/following/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/planets', methods=['GET', 'POST'])
@api.route('/planets/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/characters', methods=['GET', 'POST'])
@api.route('/characters/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/character-favorites', methods=['GET', 'POST'])
@api.route('/character-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])

@api.route('/planet-favorites', methods=['GET', 'POST'])
@api.route('/planet-favorites/<int:id>', methods=['GET', 'PUT', 'DELETE'])