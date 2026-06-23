from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

app_name = "sales_panel"    

urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name="login/login_sales_panel.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page="login/login_sales_panel.html"), name="logout"),
    path('salesPanel/', views.init_sales_page, name="salespanel"),
    path('api/products/', views.get_products, name="api_products"),
    path('api/verifyProductAdd/', views.verify_product_add, name='api_verify_product'),
    path('salesPanel/finalizar-venda/', views.finalize_sale_view, name="finalizar_venda"),
]