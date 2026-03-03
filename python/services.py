from models import User, Product, Order
from database import db
from utils import validate_email, format_currency, generate_receipt


class UserService:
    def register(self, name: str, email: str) -> User:
        if not validate_email(email):
            raise ValueError(f"Invalid email: {email}")

        existing = db.find_users_by_email(email)
        if existing:
            raise ValueError(f"Email already registered: {email}")

        user = User(name=name, email=email)
        db.add_user(user)
        return user

    def deactivate_user(self, user_id: str) -> User:
        user = db.get_user(user_id)
        if not user:
            raise KeyError(f"User not found: {user_id}")
        user.deactivate()
        return user


class ProductService:
    def create_product(self, name: str, price: float, category: str, stock: int = 0) -> Product:
        if price < 0:
            raise ValueError("Price cannot be negative")
        product = Product(name=name, price=price, category=category, stock=stock)
        db.add_product(product)
        return product

    def restock(self, product_id: str, quantity: int) -> Product:
        product = db.get_product(product_id)
        if not product:
            raise KeyError(f"Product not found: {product_id}")
        product.adjust_stock(quantity)
        return product

    def search(self, category: str = None, max_price: float = None) -> list[Product]:
        products = db.list_products(category=category)
        if max_price is not None:
            products = [p for p in products if p.price <= max_price]
        return products


class OrderService:
    def __init__(self):
        self.product_service = ProductService()

    def place_order(self, user_id: str, items: list[dict]) -> Order:
        user = db.get_user(user_id)
        if not user:
            raise KeyError(f"User not found: {user_id}")
        if not user.is_active:
            raise ValueError("Cannot place order for deactivated user")

        order = Order(user=user)
        for item in items:
            product = db.get_product(item["product_id"])
            if not product:
                raise KeyError(f"Product not found: {item['product_id']}")
            if not product.is_available:
                raise ValueError(f"Product out of stock: {product.name}")
            quantity = item.get("quantity", 1)
            product.adjust_stock(-quantity)
            order.add_item(product, quantity)

        db.add_order(order)
        return order

    def get_receipt(self, order_id: str) -> str:
        order = db.get_order(order_id)
        if not order:
            raise KeyError(f"Order not found: {order_id}")
        return generate_receipt(order)
