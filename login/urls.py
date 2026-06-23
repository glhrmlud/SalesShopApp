from django.urls import path
from django.contrib.auth import views as auth_views

app_name = "login"    

urlpatterns = [
    path("login/", auth_views.LoginView.as_view(template_name="login/login_sales_panel.html"), name="login"),
    path("logout/", auth_views.LogoutView.as_view(next_page="login:login"), name="logout"),
]