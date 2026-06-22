from django.urls import path
from . import views

app_name = "customers"    

urlpatterns = [
    path("api/verifyCustomer/", views.verify_customer, name="verify_customer"),
    path("api/createCustomer/", views.create_customer, name="create_customer"),
]