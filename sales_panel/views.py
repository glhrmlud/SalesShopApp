from django.http import JsonResponse, HttpResponse
from products.models import Products
# Create your views here.

def init_sales_page(request):
  return HttpResponse('BEM VINDO!!!')

def api_sales_panel(request):
  products = Products.objects.all()

  data_product = list(products.values('image', 'name', 'description', 'price', 'stock'))

  return JsonResponse({'products': data_product})

