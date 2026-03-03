from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime
import uuid


@dataclass
class User:
    name: str
    email: str
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = field(default_factory=datetime.utcnow)
    is_active: bool = True

    def deactivate(self):
        self.is_active = False

    def __str__(self):
        return f"User({self.name}, {self.email})"


@dataclass
class Product:
    name: str
    price: float
    category: str
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    stock: int = 0
    description: Optional[str] = None

    @property
    def is_available(self):
        return self.stock > 0

    def adjust_stock(self, quantity: int):
        self.stock = max(0, self.stock + quantity)


@dataclass
class Order:
    user: User
    items: list = field(default_factory=list)
    id: str = field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = field(default_factory=datetime.utcnow)
    status: str = "pending"

    @property
    def total(self):
        return sum(item["product"].price * item["quantity"] for item in self.items)

    def add_item(self, product: Product, quantity: int = 1):
        self.items.append({"product": product, "quantity": quantity})

    def complete(self):
        self.status = "completed"
