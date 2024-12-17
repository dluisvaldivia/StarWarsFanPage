from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime
from api.models import db, Users, Posts, Characters, Planets
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import requests


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body['message'] = 'Bad email or password'
        return response_body, 401
    print('************ Valor de user *************:', user.serialize())
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_admin': user.is_admin})
    response_body['message'] = f'Bienvenido {email}'
    response_body['access_token'] = access_token
    response_body['results'] = user.serialize()
    return response_body, 200


@api.route("/signup", methods=["POST"])
def signup():
    data = request.json
    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return jsonify({"Missing signup fields"}), 400
    
    existing_user = Users.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'Email Already in use'}), 409

    new_user = Users(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify('User Created Successfully', 'User ID:', new_user.email), 201


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
                    user_id = data.get('user_id'),)
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
        response_body['message'] = f'La Publicación: {id} no existe'
        response_body['results'] = {}
        return response_body, 404
    current_user = get_jwt_identity()
    if row.user_id != current_user['user_id']:
        response_body['message'] = f'Usted no puede gestionar la publicación: {id}'
        response_body['results'] = {}
        return response_body, 403
    if request.method == 'GET':
        response_body['message'] = f'Datos de la Publicación: {id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        print(data)
        # Validad que reciba todas las claves en body (json)
        # Asigno las claves del json a la columna correspondiente
        row.title = data.get('title')
        row.description = data.get('description')
        row.body = data.get('body')
        row.date = datetime.now()
        row.image_url = data.get('image_url')
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


@api.route('/temp', methods=['GET'])
def temp():
    response_body = {}
    url = 'https://jsonplaceholder.typicode.com/users'
    response = requests.get(url)
    print(response)
    if response.status_code == 200:
        data = response.json()
        for row in data:
            print(row)
            user = Users(email=row['email'],
                         firs_name=row['name'],
                         last_name=row['username'],
                         password='1234',
                         is_active=True,
                         is_admin=False)
            db.session.add(user)
            db.session.commit()
        response_body['results'] = data
    return response_body, 200


# STAR WARS API
@api.route('/characters', methods=['GET'])
def characters():
    characters = Characters.query.all()
    characters_list = []

    for character in characters:
        character_data = {
                'id': character.id,
                'name': character.name,
                'height': character.height,
                'mass': character.mass,
                'hair_color': character.hair_color,
                'skin_color': character.skin_color,
                'eye_color': character.eye_color,
                'birth_year': character.birth_year,
                'gender': character.gender
        }
    characters_list.append(character_data)
    return jsonify(characters_list)


@api.route('/characters', methods=['POST'])
def add_characters():
    data = request.get_json()
    new_character = Characters(
        name = data['name'],
        height = data['height'],
        mass = data['mass'],
        hair_color = data['hair_color'],
        skin_color = data['skin_color'],
        eye_color = data['eye_color'],
        birth_year = data['birth_year'],
        gender = data['gender']
    )
    db.session.add(new_character)
    db.session.commit()
    return jsonify({
        'name': new_character.name,
        'height': new_character.height,
        'mass': new_character.mass,
        'hair_color': new_character.hair_color,
        'skin_color': new_character.skin_color,
        'eye_color': new_character.eye_color,
        'birth_year': new_character.birth_year,
        'gender': new_character.gender
    }), 201


@api.route('/planets', methods=['GET'])
def planets(): 
    planets = Planets.query.all()
    planets_list = []

    for planet in planets:
        planet_data ={
            'id': planet.id,
            'name': planet.name,
            'climate': planet.climate,
            'terrain': planet.terrain,
            'residents': []            
        }
    planets_list.append(planet_data)
    return jsonify(planets_list)






