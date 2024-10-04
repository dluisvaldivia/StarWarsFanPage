from flask_sqlalchemy import SQLAlchemy
from datetime import datetime


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    first_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_admin': self.is_admin,
                'first_name': self.first_name,
                'last_name': self.last_name,
                'posts': [row.serialize() for row in self.posts_to]}
    

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)  # Valor por defecto
    image_url = db.Column(db.String)   # La url, la obtenmos de cloudinary
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.title}'

    def serialize(self):
        return {'id': self.id,
                'title': self.title,
                'description': self.description,
                'body': self.body,
                'date': self.date,
                'image_url': self.image_url,
                'user_id': self.user_id,}


class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comments_to', lazy='select'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))
    
    def __repr__(self):
        return f'comment: {self.id} - {self.body}'

    def serialize(self):
        return {'id': self.id,
                'body': self.body,
                'post_id': self.post_id,
                'user_id': self.user_id,}


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name='media_type'))
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), unique=True)
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('medias_to', lazy='select'))

    def __repr__(self):
        return f'medias: {self.id}'

    def serialize(self):
        return {'id': self.id,
                'media_type': self.media_type,
                'url': self.url,
                'post_id': self.post_id}


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))

    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'

    def serialize(self):
        return {'id': self.id,
                'following_id': self.follower_id,
                'follower_id': self.follower_id}


class CharacterFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('character_favorites_to', lazy='select'))
    character_id = db.Column(db.Integer, db.ForeignKey('characters.id'), unique=False)
    character_to = db.relationship('Characters', foreign_keys=[character_id], backref=db.backref('character_user_favorite_to', lazy='select'))

    def __repr__(self):
        return f'character_favorite: {self.id} - {self.user_id}'

    def serialize(self):
        return{ 'id': self.id,
                'user_id': self.user_id,
                'character_id': self.character_id,}


class Characters(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String, unique=False, nullable=True)
    height = db.Column(db.String, unique=False, nullable=True)
    mass = db.Column(db.String, unique=False, nullable=True)
    hair_color = db.Column(db.String, unique=False, nullable=True)
    skin_color = db.Column(db.String, unique=False, nullable=True)
    eye_color = db.Column(db.String, unique=False, nullable=True)
    birth_year = db.Column(db.String, unique=False, nullable=True)
    gender = db.Column(db.String, unique=False, nullable=True)

    def __repr__(self):
        return f'character {self.id} - {self.name}'

    def serialize(self):
        return{ 'id': self.id,
                'name': self.name,
                'height': self.height,
                'mass': self.mass,
                'hair_color': self.hair_color,
                'skin_color': self.skin_color,
                'eye_color': self.eye_color,
                'birth_year': self.birth_year,
                'gender': self.gender}


class PlanetFavorites(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=False)
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('planet_favorites_to', lazy='select'))
    planet_id = db.Column(db.Integer, db.ForeignKey('planets.id'), unique=False)
    planet_to = db.relationship('Planets', foreign_keys=[planet_id], backref=db.backref('planet_user_favorites_to'), lazy='select')

    def __repr__(self):
        return f'planet_favorite: {self.user_id} - {self.planet_id}'
    
    def serialize(self):
        return{'id': self.id,
                'user_id': self.user_id,
                'planet_id': self.planet_id}


class Planets(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=True)
    diameter = db.Column(db.String, unique=False, nullable=True)
    rotation_period = db.Column(db.String, unique=False, nullable=True)
    orbital_period = db.Column(db.String, unique=False, nullable=True)
    gravity = db.Column(db.String, unique=False, nullable=True)
    population = db.Column(db.String, unique=False, nullable=True)
    climate = db.Column(db.String, unique=False, nullable=True)
    terrain = db.Column(db.String, unique=False, nullable=True)

    def __repr__(self):
        return f'planet: {self.id} - {self.name}'
    
    def serialize(self):
        return{ 'name': self.name,
                'diameter': self.diameter,
                'rotation_period': self.rotation_period,
                'orbital_period': self.orbital_period,
                'gravity': self.gravity,
                'population': self.population,
                'climate': self.climate,
                'terrain': self.terrain}