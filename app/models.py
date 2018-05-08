import logging

logger = logging.getLogger(__name__)


class Product:
    def __init__(self, id=0, name='', price=0.0):
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


class Stock:
    products = {}

    def __init__(self):
        Stock.products[0] = Product(0, 'iPhone 8', 699.00)
        Stock.products[1] = Product(1, 'iPhone X', 999.00)
        Stock.products[2] = Product(2, 'Amazon Echo', 95.99)
        Stock.products[3] = Product(3, 'Fire TV', 49.99)
        Stock.products[4] = Product(4, 'Kindle', 59.99)
        Stock.products[5] = Product(5, 'MacBook Pro, 15\"', 2799.00)
        Stock.products[6] = Product(6, 'MacBook Pro, 13\"', 1799.00)
        Stock.products[7] = Product(7, 'Sony MDR-XB650BT Headphones', 48.99)
        Stock.products[8] = Product(8, 'Sony XB950N1 Noise Canceling Headphones', 148.99)
        Stock.products[9] = Product(9, 'Hanke Travel Backpack', 29.99)
        Stock.products[10] = Product(10, 'Kopack Anti Theft Backpack', 39.99)
        Stock.products[11] = Product(11, 'iPad 9.7\"', 329)
        Stock.products[12] = Product(12, 'iPad 12.9\"', 799)

    @staticmethod
    def all():
        # Return a copy of products rather than return products itself
        results = {}
        for id, product in Stock.products:
            results[id] = product.copy()
        return results

    @staticmethod
    def add_product(product):
        id = product.id
        if id in Stock.products:
            id = len(Stock.products)
            product.set_id(id)
        Stock.products[id] = product

    @staticmethod
    def delete_product(id):
        Stock.products.pop(id, None)


# only have one real wishlist stored in memory!
class Wishlist:
    instance = []
