from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from sales_panel.views import get_products, init_sales_page, verify_product_add
from django.contrib.auth import views as auth_views



urlpatterns = [
    path('admin/', admin.site.urls),
    path("auth/", include("login.urls", namespace="login")),
    path("", include("sales_panel.urls")),
    path("", include("customers.urls")),
    path("", include('dashboard.urls')),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

