import re
from datetime import datetime
from models import Order


def validate_email(email: str) -> bool:
    pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
    return bool(re.match(pattern, email))


def format_currency(amount: float, currency: str = "USD") -> str:
    symbols = {"USD": "$", "EUR": "\u20ac", "GBP": "\u00a3"}
    symbol = symbols.get(currency, currency + " ")
    return f"{symbol}{amount:,.2f}"


def generate_receipt(order: Order) -> str:
    lines = [
        f"{'=' * 40}",
        f"  ORDER RECEIPT",
        f"  Order ID: {order.id[:8]}...",
        f"  Date: {order.created_at.strftime('%Y-%m-%d %H:%M')}",
        f"  Customer: {order.user.name}",
        f"{'=' * 40}",
    ]

    for item in order.items:
        product = item["product"]
        qty = item["quantity"]
        subtotal = product.price * qty
        lines.append(f"  {product.name:<20} x{qty:>3}  {format_currency(subtotal):>10}")

    lines.append(f"{'-' * 40}")
    lines.append(f"  {'TOTAL':<20}       {format_currency(order.total):>10}")
    lines.append(f"  Status: {order.status.upper()}")
    lines.append(f"{'=' * 40}")

    return "\n".join(lines)


def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    return text


def timestamp() -> str:
    return datetime.utcnow().isoformat() + "Z"
