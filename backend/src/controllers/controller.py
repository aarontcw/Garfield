from flask import jsonify, request
from database.database import Database
from database.firebase import db_create, db_update, db_read

def index():
    return "index"

def from_db_get_vaccine_status(nric):
    data =  db_read("{}/{}".format("users",nric))

    if data:
    
        temp = {
            "vaccineStatus": True if data["vaccineStatus"] == "True" else False
        }
    else:
        temp = {
            "vaccineStatus": "not found"
        }

    return temp

def checkin():

    # data from request body
    data = request.get_json()
    print("data", data)

    nric = data.get("nric")
    print("nric", nric)

    vaccine_status = from_db_get_vaccine_status(nric)
    print("vaccine_status", vaccine_status)

    if vaccine_status:
        # response 200
        return jsonify(vaccine_status)
    else:
        # TODO: repsonse 400
        return "not found"

def test():
    data = db_read("{}".format("users"))
    print(data)
    return jsonify(data)