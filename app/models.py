import logging
import threading

logger = logging.getLogger(__name__)


class DataValidationError(Exception):
    """ Used for an data validation errors when deserializing """
    pass


class Product:
    lock = threading.Lock()
    stock = {}
    index = -1

    def __init__(self, id=-1, name='', price=0.0):
        self.id = int(id)
        self.name = name
        self.price = float(price)

    def serialize(self):
        """ Serializes a Product into a dictionary """
        result = {'id': self.id,
                  'name': self.name,
                  'price': self.price
                  }
        return result

    def deserialize(self, data):
        """ Deserializes a Product from a dictionary """
        if not isinstance(data, dict):
            raise DataValidationError('Invalid data: must be a dictionary')
        try:
            self.name = data['name']
            self.price = data['price']
        except KeyError as err:
            raise DataValidationError('Invalid data: missing ' + err.args[0])

    def add_to_stock(self):
        # if id already exists, update
        # if not, generate a new id
        id = self.id
        if id == -1 or id not in Product.stock:
            id = Product.generate_next_id()
            self.set_id(id)
        Product.stock[id] = self

    def delete_from_stock(self):
        Product.stock.pop(self.id, None)

    def get_id(self):
        return self.id

    def set_id(self, id):
        self.id = int(id)

    def get_name(self):
        return self.name

    def set_name(self, name):
        self.name = name

    def get_price(self):
        return self.price

    def set_price(self, price):
        self.price = float(price)

    def copy(self):
        # return a copy of product
        return Product(self.id, self.name, self.price)

    # static methods
    @staticmethod
    def generate_next_id():
        with Product.lock:
            Product.index += 1
        return Product.index

    @staticmethod
    def initialize_stock():
        with Product.lock:
            Product.stock[0] = Product(0, 'iPhone 8', 699.00)
            Product.stock[1] = Product(1, 'iPhone X', 999.00)
            Product.stock[2] = Product(2, 'Amazon Echo', 95.99)
            Product.stock[3] = Product(3, 'Fire TV', 49.99)
            Product.stock[4] = Product(4, 'Kindle', 59.99)
            Product.stock[5] = Product(5, 'MacBook Pro, 15\"', 2799.00)
            Product.stock[6] = Product(6, 'MacBook Pro, 13\"', 1799.00)
            Product.stock[7] = Product(7, 'Sony MDR-XB650BT Headphones', 48.99)
            Product.stock[8] = Product(8, 'Sony XB950N1 Noise Canceling Headphones', 148.99)
            Product.stock[9] = Product(9, 'Hanke Travel Backpack', 29.99)
            Product.stock[10] = Product(10, 'Kopack Anti Theft Backpack', 39.99)
            Product.stock[11] = Product(11, 'iPad 9.7\"', 329)
            Product.stock[12] = Product(12, 'iPad 12.9\"', 799)
            Product.index = 12

    @staticmethod
    def all():
        # Return a copy of products rather than return products itself
        results = {}
        for id, product in Product.stock:
            results[id] = product.copy()
        return results

    @staticmethod
    def delete_all():
        with Product.lock:
            Product.stock.clear()
            Product.index = -1


# only have one real wishlist stored in memory!
class Wishlist:
    lock = threading.Lock()
    lists = {}
    index = -1

    def __init__(self, id=-1, product_ids=None):
        self.id = int(id)
        if product_ids is None:
            self.product_ids = []
        else:
            self.product_ids = product_ids


