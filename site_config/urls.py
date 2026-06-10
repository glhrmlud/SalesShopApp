from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from sales_panel.views import api_sales_panel, init_sales_page
from django.contrib.auth import views as auth_views

app_name = "sales_panel"

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", include("sales_panel.urls")),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
