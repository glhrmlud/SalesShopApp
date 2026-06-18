from django.contrib import admin
from .models import Customer

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('name', 'cpf', 'phone', 'city', 'state')
    search_fields = ('name', 'cpf')
