from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
import py_eureka_client.eureka_client as eureka_client
import logging
import os

app = Flask(__name__)
api = Api(app)

# SQLAlchemy Configuration
POSTGRES_USER = os.getenv('POSTGRES_USER', 'houssemino')
POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD', 'houssemino')
POSTGRES_DB = os.getenv('POSTGRES_DB', 'product_db')
POSTGRES_HOST = os.getenv('POSTGRES_HOST', 'postgresql')
POSTGRES_PORT = os.getenv('POSTGRES_PORT', '5432')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize logging
logging.basicConfig(level=logging.INFO)

db = SQLAlchemy(app)

# Product model
class ProductModel(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(255), nullable=False)

# CRUD Resources
class Product(Resource):
    def get(self):
        try:
            products = ProductModel.query.all()
            return jsonify({'products': [{'id': p.id, 'name': p.name, 'description': p.description} for p in products]})
        except Exception as e:
            logging.error(f"Error fetching products: {e}")
            return {'message': 'Error fetching products'}, 500

    def post(self):
        try:
            product_data = request.get_json()
            if not product_data or not product_data.get('name') or not product_data.get('description'):
                return {'message': 'Invalid product data'}, 400
            product = ProductModel(name=product_data['name'], description=product_data['description'])
            db.session.add(product)
            db.session.commit()
            return {'message': 'Product added successfully!'}, 201
        except Exception as e:
            logging.error(f"Error adding product: {e}")
            return {'message': 'Error adding product'}, 500

class ProductDelete(Resource):
    def delete(self, product_id):
        try:
            product = ProductModel.query.get_or_404(product_id)
            db.session.delete(product)
            db.session.commit()
            return {'message': 'Product deleted successfully!'}
        except Exception as e:
            logging.error(f"Error deleting product: {e}")
            return {'message': 'Error deleting product'}, 500

api.add_resource(Product, '/products')
api.add_resource(ProductDelete, '/products/<int:product_id>')

# Eureka Client setup
your_rest_server_port = 5001
eureka_client.init(
    eureka_server=os.getenv('EUREKA_SERVER', 'http://discovery-server:8090/eureka'),
    app_name="python-microservice",
    instance_port=your_rest_server_port
)

if __name__ == '__main__':
    try:
        logging.info("Creating database tables...")
        db.create_all()  # Create tables if they do not exist
        logging.info("Database tables created successfully")
    except Exception as e:
        logging.error(f"Error creating tables: {e}")
        raise  # Re-raise the exception to prevent the app from starting if there's a DB issue
    
    app.run(host='0.0.0.0', port=5001, debug=True)
