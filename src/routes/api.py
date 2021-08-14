from flask import Blueprint
from controllers.controller import index, checkin, test

api = Blueprint('api', __name__)

api.route('/', methods=['GET'])(index)
api.route('/checkin', methods=['POST'])(checkin)
api.route('/testdb', methods=['GET'])(test)