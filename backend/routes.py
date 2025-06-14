from flask import Blueprint, jsonify, request
from models import db, Entry

api = Blueprint('api', __name__)

@api.route('/entries', methods=['GET'])
def get_entries():
    entries = Entry.query.all()
    return jsonify([entry.to_dict() for entry in entries])

@api.route('/entries', methods=['POST'])
def create_entry():
    data = request.get_json()
    entry = Entry(title=data['title'], content=data['content'])
    db.session.add(entry)
    db.session.commit()
    return jsonify(entry.to_dict()), 201