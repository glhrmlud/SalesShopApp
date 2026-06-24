from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import RedirectView



urlpatterns = [
    path('', RedirectView.as_view(url='/salesPanel', permanent=False)),
    path('admin/login/', RedirectView.as_view(pattern_name='login:login', permanent=False)),
    path('admin/', admin.site.urls),
    path("auth/", include("login.urls", namespace="login")),
    path("", include("sales_panel.urls")),
    path("", include("customers.urls")),
    path("", include('dashboard.urls')),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

