from flask import Flask
from routes.api import api
from config import db_config
from mysql.connector.constants import ClientFlag
app = Flask(__name__)

app.register_blueprint(api, url_prefix='/api')

@app.route('/')
def index():
    return "Hello World"

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="5001")
