from flask import Flask
from flask_restx import Api
from company.company_controller import api as company_ns
from login.login_controller import api as login_ns
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
authorizations = {"bearer": {"type": "apiKey", "in": "header", "name": "Authorization"}}
api = Api(app, authorizations=authorizations)
    
api.add_namespace(company_ns, path='/company')
api.add_namespace(login_ns, path='/login')

if __name__ == '__main__':
    app.run(debug=True)