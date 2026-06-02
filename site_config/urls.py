from django.contrib import admin
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from sales_panel.views import api_sales_panel, init_sales_page

urlpatterns = [
    path('admin/', admin.site.urls),
    path('salesPanel/', init_sales_page),
    path('api/products/', api_sales_panel),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
