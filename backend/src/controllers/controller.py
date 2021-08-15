from flask import jsonify, request
from database.database import Database
from database.firebase import db_create, db_update, db_read

def index():
    return "index"

def checkin():
    database = Database("user")

    # data from request body
    data = request.get_json()

    print(data2)

    return jsonify(data)

def test():
    data = db_read("{}".format("users"))
    print(data)
    return jsonify(data)