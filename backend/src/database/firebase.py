import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from pathlib import Path


databaseURL = "https://ndi-tap-322908-default-rtdb.asia-southeast1.firebasedatabase.app/"
adminsdk_path = "../../ndi-tap-322908-firebase-adminsdk-i4uun-2c05f14015.json"
# Fetch the service account key JSON file contents
cred = credentials.Certificate(adminsdk_path)
# Initialize the app with a service account, granting admin privileges



firebase_admin.initialize_app(cred, {
    'databaseURL': databaseURL
})

def db_create(key, value):
    ref = db.reference('/{}'.format(key))
    ref.update(value)

def db_update(key, value):
    ref = db.reference('/{}'.format(key))
    ref.update(value)

def db_read(key):
    ref = db.reference('/{}'.format(key))
    return ref.get()