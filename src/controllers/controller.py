from flask import jsonify, request
from database.database import Database

def index():
    return "index"

def checkin():
    database = Database("user")

    # data from request body
    data = request.get_json()

    print(data2)

    return jsonify(data)

def test():
    database = Database()
    data = database.test()
    print(data)
    return jsonify(data)