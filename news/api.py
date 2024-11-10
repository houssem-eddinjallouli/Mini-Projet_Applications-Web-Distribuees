# Product Service

from flask import Flask
from flask_restful import Resource, Api
import py_eureka_client.eureka_client as eureka_client
import logging
#logging.basicConfig(level=logging.INFO)


# https://newsapi.org/v2/everything?
# https://newsapi.org/v2/top-headlines?

# &q=apple
# &q=tesla
# &from=2024-10-09

# &from=2024-11-08
# &to=2024-11-08
# &sortBy=publishedAt
# &sortBy=popularity
# &country=us
# &category=business
# &sources=techcrunch
# &domains=wsj.com

#&apiKey=2fa68d41cdc94df286e72a842b0c2ab6

#https://newsapi.org/v2/everything?q=school&sortBy=popularity&apiKey=2fa68d41cdc94df286e72a842b0c2ab6
app = Flask(__name__)
api = Api(app)

class Product(Resource):
    def get(self):
        return {
            'products': [
                'Product 1',
                'Product 2',
                'Product 3',
                'Product 3',
                'Product 3',
                'Product 3',
                'Product 3',
                'Product 4']
            }
    
api.add_resource(Product, '/')

your_rest_server_port = 5001
eureka_client.init(
    eureka_server="http://discovery-server:8090/eureka",
    app_name="python-microservice",
    instance_port=your_rest_server_port
)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
