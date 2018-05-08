"""
This service is written with Python Flask
Paths
-----
GET   /products - Retrieves a list of product from the database
GET   /products/{id} - Retrirves a product with a specific id
POST  /products - Creates a product in the datbase from the posted database
PUT   /products/{id} - Updates a product in the database fom the posted database
DELETE /products/{id} - Removes a product from the database that matches the id
"""

import sys
import os
import logging
from functools import wraps
from flask import Flask, jsonify, request, url_for, make_response, abort
from flask_api import status  # HTTP Status Codes
from werkzeug.exceptions import NotFound
from app.models import Product, Wishlist

# Pull options from environment
DEBUG = (os.getenv('DEBUG', 'False') == 'True')
PORT = os.getenv('PORT', '5000')

# Create Flask application
app = Flask(__name__)
app.config['LOGGING_LEVEL'] = logging.INFO

# Status Codes
HTTP_200_OK = 200
HTTP_201_CREATED = 201
HTTP_204_NO_CONTENT = 204
HTTP_400_BAD_REQUEST = 400
HTTP_404_NOT_FOUND = 404
HTTP_409_CONFLICT = 409
HTTP_415_UNSUPPORTED_MEDIA_TYPE = 415


# TODO: the routings could be handled by the client side code, including: index, create wishlists.
######################################################################
# GET INDEX
######################################################################

# @app.route('/')
# def index():
#
#     return app.send_static_file('index.html')


######################################################################
# LIST All PRODUCTS IN STOCK
######################################################################
@app.route('/products', methods=['GET'])
def list_products():
    """
    Retrieves list of products from the stock
    This endpoint simply return all Products in stock.
    """
    results = Product.all()

    return make_response(jsonify([product.serialize() for product in results]), HTTP_200_OK)


######################################################################
# ADD A NEW PRODUCT
######################################################################
@app.route('/products', methods=['POST'])
def add_product():
    """ Creates a product and saves it
    This endpoint will create a Product based the data in the body that is posted!!
    """
    data = {}
    # Check for form submission data
    if request.headers.get('Content-Type') == 'application/x-www-form-urlencoded':
        app.logger.info('Processing FORM data')
        data = {
            'name': request.form['name'],
            'price': request.form['price'],
        }
    else:
        app.logger.info('Processing JSON data')
        data = request.get_json()
    product = Product(id=-1)
    product.deserialize(data)
    product.add_to_stock()  # this will auto generate an id for product
    msg = product.serialize()
    return make_response(jsonify(msg), HTTP_201_CREATED)


def check_content_type(content_type):
    """ Checks that the media type is correct """
    if request.headers['Content-Type'] == content_type:
        return
    app.logger.error('Invalid Content-Type: %s',
                     request.headers['Content-Type'])
    abort(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
          'Content-Type must be {}'.format(content_type))