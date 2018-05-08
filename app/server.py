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
from app.models import Stock, Wishlist

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

######################################################################
# Error Handlers
######################################################################
import error_handlers


# TODO: the routings could be handled by the client side code, including: index, create wishlists.
######################################################################
# GET INDEX
######################################################################

# @app.route('/')
# def index():
#
#     return app.send_static_file('index.html')


######################################################################
# DELETE A PRODUCT
######################################################################
@app.route('/products/<int:id>', methods=['DELETE'])
def delete_products(id):
    """ Removes a Product from the database that matches the id
    This endpoint will delete a Product based the id specified in the path
    ---
    tags:
      - Products
    description: Deletes a Product from the database
    parameters:
      - name: id
        in: path
        description: ID of product to delete
        type: integer
        required: true
    responses:
      204:
        description: Product deleted
    """
    Product.catalog.delete(id)

    return make_response('', HTTP_204_NO_CONTENT)


######################################################################
# LIST All PRODUCTS IN STOCK
######################################################################
@app.route('/products', methods=['GET'])
def list_products():
    """
    Retrieves list of products from the stock
    This endpoint simply return all Products in stock.
    """
    results = Stock.all()

    return make_response(jsonify([product.serialize() for product in results]), HTTP_200_OK)


######################################################################
# RETRIEVE A PRODUCT BY ID
######################################################################
@app.route('/products/<int:id>', methods=['GET'])
def get_products(id):
    """ Retrieves a Product with a specific id
    This endpoint will return a Product based on it's id
    ---
    tags:
      - Products
    produces:
      - application/json
    parameters:
      - name: id
        in: path
        description: ID of product to retrieve
        type: integer
        required: true
    responses:
      200:
        description: Product returned
        schema:
          $ref: '#/definitions/Product'
      404:
        description: Product not found
    """
    product = Product.catalog.find(id)
    if not product:
        abort(HTTP_404_NOT_FOUND, "Product with id '{}' was not found.".format(id))

    return make_response(jsonify(product.serialize()), HTTP_200_OK)


######################################################################
# ADD A NEW PRODUCT
######################################################################
@app.route('/products', methods=['POST'])
def create_product():
    """ Creates a product and saves it
    This endpoint will create a Product based the data in the body that is posted!!
    ---
    tags:
      - Products
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - in: body
        name: body
        required: true
        schema:
          required:
            - name
            - price
            - id
            - image_id
            - description
          properties:
            name:
              type: string
              description: name for the product
            price:
              type: number
              format: float
              description: the price of product
            id:
              type: integer
              description: id for the product
            image_id:
              type: integer
              description: image id for the product
            description:
              type: string
              description: description for the product
            review_list:
              type: array
              default: []
              items:
                type: object
                properties:
                  username:
                    type: string
                    description: username for the reviewer
                  score:
                    type: integer
                    default: 100
                    description: score the product receive
                  date:
                    type: string
                    description: time that product receive review
                  detail:
                    type: string
                    description: review detail description
    responses:
      201:
        description: Product created
        schema:
          required:
            - name
            - price
            - id
            - image_id
            - description
          properties:
            name:
              type: string
              description: name for the product
            price:
              type: number
              format: float
              description: the price of product
            id:
              type: integer
              description: id for the product
            image_id:
              type: integer
              description: image id for the product
            description:
              type: string
              description: description for the product
            review_list:
              type: array
              default: []
              items:
                type: object
                properties:
                  username:
                    type: string
                    description: username for the reviewer
                  score:
                    type: integer
                    default: 100
                    description: score the product receive
                  date:
                    type: string
                    description: time that product receive review
                  detail:
                    type: string
                    description: review detail description
      400:
        description: Bad Request (the posted data was not valid)
    """
    data = {}
    # Check for form submission data
    if request.headers.get('Content-Type') == 'application/x-www-form-urlencoded':
        app.logger.info('Processing FORM data')
        data = {
            "id": request.form['id'],
            "name": request.form['name'],
            "price": request.form['price'],
            "image_id": request.form['image_id'],
            "description": request.form['description'],
            "review_list": request.form['review_list'].split("\t")
        }
    else:
        app.logger.info('Processing JSON data')
        data = request.get_json()
        if 'price' in data:
            data['price'] = int(data['price'])
    product = Product()
    product.deserialize(data)
    Product.catalog.save(product)  # this will auto generate an id for product
    message = product.serialize()
    return make_response(jsonify(message), HTTP_201_CREATED,
                         {'Location': url_for('get_products', id=product.id, _external=True)})


######################################################################
# UPDATE AN EXISTING PRODUCT
######################################################################
@app.route('/products/<int:id>', methods=['PUT'])
def update_products(id):
    """ Updates a product in the catalog
    This endpoint will update a Product based the body that is posted
    ---
    tags:
      - Products
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - name: id
        in: path
        description: ID of product to retrieve
        type: integer
        required: true
      - in: body
        name: body
        schema:
          required:
            - name
            - price
            - id
            - image_id
            - description
            - review_list
          properties:
            name:
              type: string
              description: name for the product
            price:
              type: number
              format: float
              description: the price of product
            id:
              type: integer
              description: id for the product
            image_id:
              type: integer
              description: image id for the product
            description:
              type: string
              description: description for the product

    responses:
      200:
        description: Product Updated
        schema:
          $ref: '#/definitions/Product'
      400:
        description: Bad Request (the posted data was not valid)
    """
    check_content_type('application/json')
    product = Product.catalog.find(id)
    if not product:
        abort(HTTP_404_NOT_FOUND, "Product with id '{}' was not found.".format(id))

    data = request.get_json()
    if 'price' in data:
        data['price'] = int(data['price'])
    product.deserialize(data)
    Product.catalog.save(product)
    return make_response(jsonify(product.serialize()), HTTP_200_OK)


######################################################################
# ACTION ON AN EXISTING PRODUCT: ADD REVIEW
######################################################################
@app.route('/products/<int:id>/review', methods=['PUT'])
def review_products(id):
    """ Adds a review to product in the catalog
    This endpoint will update a Product's review based the body that is posted
    ---
    tags:
      - Products
    paths:
      - /products/<int:id>/review
    consumes:
      - application/json
    produces:
      - application/json
    parameters:
      - name: id
        in: path
        description: ID of product to retrieve
        type: integer
        required: true
      - in: body
        name: body
        schema:

          required:
            - username
            - score
            - date
            - detail
          properties:
            username:
              type: string
              description: username for the reviewer
            score:
              type: integer
              description: score the product receive
            date:
              type: string
              description: time that product receive review
            detail:
              type: string
              description: review detail description

    responses:
      200:
        description: Review Updated
        schema:
          $ref: '#/definitions/Review'
      400:
        description: Bad Request (the posted data was not valid)
    """
    product = Product.catalog.find(id)
    if product:
        payload = request.get_json()
        # Ensure that required attributes are provided:
        if ('username' not in payload or 'score' not in payload):
            abort(400)
        # Pass on new review to product:
        review = Review(username=payload['username'], date=payload['date'],
                        score=payload['score'], detail=payload['detail'])
        review_list = product.get_review_list()
        review_list.append(review)
        product.set_review_list(review_list)
        Product.catalog.save(product)
        message = product.serialize()
        return_code = HTTP_200_OK
    else:
        message = {'error': 'Product with id: %s was not found' % str(id)}
        return_code = HTTP_404_NOT_FOUND

    return jsonify(message), return_code


######################################################################
#   U T I L I T Y   F U N C T I O N S
######################################################################

@app.before_first_request
def init_db(redis=None):
    """ Initlaize the model """
    Product.catalog.init_db(redis)


# load sample data
def data_load(payload):
    """ Loads a Product into the database """
    product = Product(name=payload['name'], price=payload['price'])
    Product.catalog.save(product)


def data_reset():
    """ Removes all Pets from the database """
    Product.catalog.remove_all()


def check_content_type(content_type):
    """ Checks that the media type is correct """
    if request.headers['Content-Type'] == content_type:
        return
    app.logger.error('Invalid Content-Type: %s',
                     request.headers['Content-Type'])
    abort(status.HTTP_415_UNSUPPORTED_MEDIA_TYPE,
          'Content-Type must be {}'.format(content_type))


def initialize_logging(log_level=logging.INFO):
    """ Initialized the default logging to STDOUT """
    if not app.debug:
        print
        'Setting up logging...'
        # Set up default logging for submodules to use STDOUT
        # datefmt='%m/%d/%Y %I:%M:%S %p'
        fmt = '[%(asctime)s] %(levelname)s in %(module)s: %(message)s'
        logging.basicConfig(stream=sys.stdout, level=log_level, format=fmt)
        # Make a new log handler that uses STDOUT
        handler = logging.StreamHandler(sys.stdout)
        handler.setFormatter(logging.Formatter(fmt))
        handler.setLevel(log_level)
        # Remove the Flask default handlers and use our own
        handler_list = list(app.logger.handlers)
        for log_handler in handler_list:
            app.logger.removeHandler(log_handler)
        app.logger.addHandler(handler)
        app.logger.setLevel(log_level)
        app.logger.info('Logging handler established')

######################################################################
#   M A I N
######################################################################
# if __name__ == "__main__":
#     print "*********************************"
#     print " P R O D U C T   S H O P   S E R V I C E "
#     print "*********************************"
#     initialize_logging()
#     phone_review_list = [Review(username="applefan", score="4", detail="OK"),
#                          Review(username="helloworld",
#                                 score="4", detail="As expected"),
#                          Review(username="pythonfan", score="3", detail="So So")]
#     pc_review_list = [Review(username="applelover", score="5", detail="Excellent"),
#                       Review(username="tvfan", score="5",
#                              detail="Loving this!!"),
#                       Review(username="devops team member",
#                              score="5", detail="Highly recommend!"),
#                       Review(username="nyu", score="5", detail="Nice!")]
#     Product.catalog.save(
#         Product("iPhone 8", 649, 0, review_list=phone_review_list))
#     Product.catalog.save(
#         Product("MacBook Pro", 1799, 1, review_list=pc_review_list))
#     app.run(host='0.0.0.0', port=int(PORT), debug=DEBUG)
