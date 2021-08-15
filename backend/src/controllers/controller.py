from flask import jsonify, request
from database.database import Database
from database.firebase import db_create, db_update, db_read

import requests
import json


def index():
    return "index"

def safe_entry_api(nric):

    url = "https://sandbox.api.safeentry-qr.gov.sg:443/partner/v1/entry"

    payload = {
        "subType": "uinfin",
        "actionType": "checkout",
        "sub": nric,
        "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
        "mobileno": "92376345"
    }

    r = requests.post(url, data=json.dumps(payload))

    if r.status_code == 201:
        return True
    else:
        return r.json()

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

    nric = data.get("nric")
    nric = nric.upper()

    vaccine_status = from_db_get_vaccine_status(nric)

    safe_entry_response = safe_entry_api(nric)
    print(safe_entry_response)

    if safe_entry_response != True:
        print("error safe entry")
        return jsonify(safe_entry_response)

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