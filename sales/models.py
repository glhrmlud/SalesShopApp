from django.db import models
from django.contrib.auth.models import User
from products.models import Products
from customers.models import Customer


class Sale(models.Model):
    STATUS_CHOICE = [
        ('pending', 'Pendente'),
        ('completed', 'Concluída'),
        ('cancelled', 'Cancelada'),
    ]

    customer = models.ForeignKey(Customer, on_delete=models.PROTECT)
    seller = models.ForeignKey(User, on_delete=models.PROTECT)
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sale #{self.id} - {self.customer.name}"

    def get_total(self):
        return sum(item.unit_price * item.quantity for item in self.itemsale_set.all())

class ItemSale(models.Model):
    sale = models.ForeignKey(Sale, on_delete=models.CASCADE)
    product = models. ForeignKey(Products, on_delete=models.PROTECT)
    quantity = models.PositiveIntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Sale #{self.sale.id})"

