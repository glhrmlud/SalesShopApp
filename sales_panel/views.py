from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
import json
from products.models import Products
# Create your views here.

@login_required
def init_sales_page(request):
  return render(request, 'sales_panel/view.html')

def get_products(request):
  offset = int(request.GET.get('offset', 0))
  limit = 12 if offset == 0 else 10
  end = offset + limit

  products = list(Products.objects.values('id','image', 'name', 'description', 'price', 'stock')[offset:end])

  for p in products:
    if p['image']:
      p['image'] = f"{settings.MEDIA_URL}{p['image']}"
    else:
      p['image'] = None

  next_offset = end if len(products) == limit else None

  return JsonResponse({
    'products': products,
    'nextOffset': next_offset,
  })

def verify_product_add(request):
  if request.method == 'POST':
    data = json.loads(request.body)
    product_id = data.get('id')
    try:  
      product = Products.objects.get(id=product_id)
      if product.stock > 0:
        return JsonResponse({
        'id': product.id,
        'name': product.name,
        'price': product.price,
      })
    except json.JSONDecodeError:
      return JsonResponse({'status': 'erro', 'mensagem': 'Dados inválidos'}, status=400)
  return JsonResponse({'status': 'erro', 'mensagem': 'Método não permitido'}, status=405)

