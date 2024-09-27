from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    firs_name = db.Column(db.String(), unique=False, nullable=True)
    last_name = db.Column(db.String(), unique=False, nullable=True)

    def __repr__(self):
        return f'<User: {self.id} - {self.email}>'

    def serialize(self):
        # Do not serialize the password, its a security breach
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active}


class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, unique=False, nullable=False)
    description = db.Column(db.String, unique=False, nullable=True)
    body = db.Column(db.String, unique=False, nullable=False)
    date = db.Column(db.DateTime, nullable=False)  # Valor por defecto
    image_url = db.Column(db.String)   # La url, la obtenmos de cloudinary
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('posts_to', lazy='select'))

    def __repr__(self):
        return f'post: {self.id} - {self.title}'

class Comments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, unique=False, nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'))
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('comments_to', lazy='select'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('comments_to', lazy='select'))


class Medias(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    media_type = db.Column(db.Enum('image', 'video', 'podcast', name='media_type'))
    url = db.Column(db.String)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), unique=True)
    post_to = db.relationship('Posts', foreign_keys=[post_id], backref=db.backref('media_to', lazy='select'))


class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    following_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    following_to = db.relationship('Users', foreign_keys=[following_id], backref=db.backref('following_to', lazy='select'))
    follower_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    follower_to = db.relationship('Users', foreign_keys=[follower_id], backref=db.backref('follower_to', lazy='select'))

    def __repr__(self):
        return f'following: {self.following_id} - follower: {self.follower_id}'