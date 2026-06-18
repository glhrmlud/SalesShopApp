from django.urls import path
from . import views

app_name = "sales"    

urlpatterns = [
    path("api/verifyCustomer/", views.verify_customer, name="verify_customer"),
    path("api/createCustomer/", views.create_customer, name="create_customer"),
    # path("/api/getCart/", views.get_cart, name="get_cart"),
]