from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

app_name = "sales_panel"    

urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name="sales_panel/login.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page="/login"), name="logout"),
    path('salesPanel/', views.init_sales_page, name="salespanel"),
    path('api/products/', views.api_sales_panel, name="api"),
]