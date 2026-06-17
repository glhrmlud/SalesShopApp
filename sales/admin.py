from django.contrib import admin
from .models import Customer, Sale, ItemSale

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'cpf', 'phone', 'city', 'state')
    search_fields = ('name', 'cpf')

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'seller', 'status', 'get_total', 'created_at')
    list_filter = ('status',)

@admin.register(ItemSale)
class ItemSaleAdmin(admin.ModelAdmin):
    list_display = ('sale', 'product', 'quantity', 'unit_price')
