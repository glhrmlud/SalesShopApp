from django.contrib import admin
from .models import Sale, ItemSale

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'seller', 'status', 'get_total', 'created_at')
    list_filter = ('status',)

@admin.register(ItemSale)
class ItemSaleAdmin(admin.ModelAdmin):
    list_display = ('sale', 'product', 'quantity', 'unit_price')
