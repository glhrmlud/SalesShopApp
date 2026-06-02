from django.contrib import admin
from .models import Sellers
# Register your models here.
# Personalização de exibição
class SellerAdmin(admin.ModelAdmin):
  list_display = ('cpf', 'name', 'register')

  search_fields = ('name', 'cpf', 'register')

  list_editable = ('name', 'register')

  list_per_page = 12

admin.site.register(Sellers, SellerAdmin)