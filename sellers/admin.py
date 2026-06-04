from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import Sellers


class SellerInline(admin.StackedInline):

  model = Sellers
  can_delete = False
  verbose_name_plural = "Dados do vendedor"



class SellerAdmin(BaseUserAdmin):

  inlines = [SellerInline]

  list_display = ("username", "get_register", "get_cpf",  "is_superuser", "is_staff")


  def get_cpf(self, instance):
    try:
      return instance.seller_profile.cpf
    except Sellers.DoesNotExist:
      return "-"
  get_cpf.short_description = "CPF (Vendedor)"

  def get_register(self, instance):
    try:
      return instance.seller_profile.register
    except Sellers.DoesNotExist:
      return "-"
  get_register.short_description = "Registro"


admin.site.unregister(User)
admin.site.register(User, SellerAdmin)