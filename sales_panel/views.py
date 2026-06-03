from django.http import JsonResponse
from django.shortcuts import render
from products.models import Products
# Create your views here.

def init_sales_page(request):
  return render(request, 'sales_panel/sales_panel.html')

def api_sales_panel(request):
  products = Products.objects.all()

  data_product = []
  for product in products:
    data_product.append({
      'name': product.name,
      'description': product.description,
      'price': product.price,
      'stock': product.stock,
      'image': product.image.url if product.image else None,
    })
  return JsonResponse({'products': data_product})

