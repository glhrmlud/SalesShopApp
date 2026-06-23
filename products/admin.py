from django.contrib import admin
# Register your models here.
from .models import Products

class ProductsAdmin(admin.ModelAdmin):
  list_display = ('id', 'name', 'description', 'price', 'stock')

  search_fields = ('name', 'price')

  list_editable = ('name', 'description', 'price', 'stock')

  list_per_page = 12
  
admin.site.register(Products, ProductsAdmin)
