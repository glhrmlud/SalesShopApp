from django.http import JsonResponse
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction
import json

from products.models import Products
from customers.models import Customer
from sales.models import Sale, ItemSale



@login_required
def init_sales_page(request):
  customer = Customer.objects.all().order_by('name')
  return render(request, 'sales_panel/view.html', {'customer': customer})

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

@login_required
def finalize_sale_view(request):
  if request.method == 'POST':
    try:
      data = json.loads(request.body)
      customer_id = data.get('customer_id')
      items = data.get('items')

      if not customer_id or not items:
        return JsonResponse({'status': 'erro', 'mensagem': 'Dados de venda incompletos.'}, status=400)

      with transaction.atomic():
        customer = Customer.objects.get(id=customer_id)
        seller = request.user

        new_sale = Sale.objects.create(
          customer=customer,
          seller=seller,
          status='completed'
        )

        for item in items:
          product = Products.objects.get(id=item['id'])
          qtd = int(item['quantidade'])

          if product.stock < qtd:
            raise ValueError(f"Estoque insuficiente para {product.name}. Disponivel: {product.stock}")

          product.stock -= qtd
          product.save()

          ItemSale.objects.create(
            sale=new_sale,
            product=product,
            quantity=qtd,
            unit_price=product.price
          )

        return JsonResponse({'status': 'success', 'sale_id': new_sale.id})

    except Customer.DoesNotExist:
      return JsonResponse({'status': 'erro', 'mensagem': 'Cliente selecionado não existe.'}, status=404)

    except Products.DoesNotExist:
      return JsonResponse({'status': 'erro', 'mensagem': 'Um dos produtos do carrinho nao existe.'}, status=404)

    except ValueError as e:
      return JsonResponse({'status': 'erro', 'mensagem': str(e)}, status=400)

    except Exception as e:
      return JsonResponse({'status': 'erro', 'mensagem': f'Erro interno: {str(e)}'}, status=500)

  return JsonResponse({'status': 'erro', 'mensagem': 'Metodo nao permitido'}, status=405)



