import json
import os
from typing import Optional
from models import User, Product, Order


class InMemoryDB:
    def __init__(self):
        self._users: dict[str, User] = {}
        self._products: dict[str, Product] = {}
        self._orders: dict[str, Order] = {}

    def add_user(self, user: User) -> User:
        self._users[user.id] = user
        return user

    def get_user(self, user_id: str) -> Optional[User]:
        return self._users.get(user_id)

    def find_users_by_email(self, email: str) -> list[User]:
        return [u for u in self._users.values() if u.email == email]

    def add_product(self, product: Product) -> Product:
        self._products[product.id] = product
        return product

    def get_product(self, product_id: str) -> Optional[Product]:
        return self._products.get(product_id)

    def list_products(self, category: Optional[str] = None) -> list[Product]:
        products = list(self._products.values())
        if category:
            products = [p for p in products if p.category == category]
        return products

    def add_order(self, order: Order) -> Order:
        self._orders[order.id] = order
        return order

    def get_order(self, order_id: str) -> Optional[Order]:
        return self._orders.get(order_id)

    def get_user_orders(self, user_id: str) -> list[Order]:
        return [o for o in self._orders.values() if o.user.id == user_id]

    def export_to_json(self, filepath: str):
        data = {
            "users": [
                {"id": u.id, "name": u.name, "email": u.email, "is_active": u.is_active}
                for u in self._users.values()
            ],
            "products": [
                {"id": p.id, "name": p.name, "price": p.price, "category": p.category, "stock": p.stock}
                for p in self._products.values()
            ],
            "order_count": len(self._orders),
        }
        with open(filepath, "w") as f:
            json.dump(data, f, indent=2)


db = InMemoryDB()
