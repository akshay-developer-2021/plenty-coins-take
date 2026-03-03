from services import UserService, ProductService, OrderService
from database import db
from utils import format_currency, timestamp


def main():
    print(f"Store initialized at {timestamp()}")
    print()

    user_svc = UserService()
    product_svc = ProductService()
    order_svc = OrderService()

    alice = user_svc.register("Alice Johnson", "alice@example.com")
    bob = user_svc.register("Bob Smith", "bob@example.com")
    print(f"Registered: {alice}")
    print(f"Registered: {bob}")
    print()

    laptop = product_svc.create_product("Laptop Pro", 1299.99, "electronics", stock=10)
    headphones = product_svc.create_product("Wireless Headphones", 89.50, "electronics", stock=25)
    notebook = product_svc.create_product("Leather Notebook", 24.99, "stationery", stock=50)
    pen = product_svc.create_product("Fountain Pen", 45.00, "stationery", stock=30)
    print(f"Added {len(db.list_products())} products to catalog")
    print()

    electronics = product_svc.search(category="electronics")
    print(f"Electronics ({len(electronics)} items):")
    for p in electronics:
        print(f"  - {p.name}: {format_currency(p.price)} (stock: {p.stock})")
    print()

    budget_items = product_svc.search(max_price=50.0)
    print(f"Budget items under {format_currency(50)}: {[p.name for p in budget_items]}")
    print()

    order = order_svc.place_order(alice.id, [
        {"product_id": laptop.id, "quantity": 1},
        {"product_id": headphones.id, "quantity": 2},
    ])
    print(order_svc.get_receipt(order.id))
    print()

    order2 = order_svc.place_order(bob.id, [
        {"product_id": notebook.id, "quantity": 3},
        {"product_id": pen.id, "quantity": 1},
    ])
    order2.complete()
    print(order_svc.get_receipt(order2.id))
    print()

    print(f"Alice's orders: {len(db.get_user_orders(alice.id))}")
    print(f"Bob's orders: {len(db.get_user_orders(bob.id))}")

    user_svc.deactivate_user(bob.id)
    print(f"Bob active: {bob.is_active}")

    db.export_to_json("/tmp/store_export.json")
    print("Data exported to /tmp/store_export.json")


if __name__ == "__main__":
    main()
