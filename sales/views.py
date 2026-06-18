from django.shortcuts import render
from django.http import JsonResponse
import json
from sales_panel.views import verify_product_add
from sales.models import Customer, ItemSale, Sale

def verify_customer(request):
  if request.method == 'POST':
    customer_data = json.loads(request.body)
    customer_cpf = customer_data.cpf
    try:
      customer = Customer.objects.get(cpf=customer_cpf)
      return JsonResponse({
        'status':'customer found',
        'cpf':customer.cpf,
        'name':customer.name,
        'boolean': True,
      }, status=201)
    except json.JSONDecodeError:
      return JsonResponse({
        'status': 'error',
        'mesage': 'Client dont exist',
        'boolean': False,
      }, status=400)
  return JsonResponse({
    'status':'error',
    'mesage':'wrong method',
    'boolean': False,
  }, status = 405)

def create_customer(request):
  if request.method == 'POST':
    customer_data = json.loads(request.body)
    customer_data_clean = {k: v for k, v in customer_data.items() if v}
    try:
      new_register = Customer.objects.create(**customer_data_clean)
      return JsonResponse({
        'status': 'sucess',
        'id' : new_register.id,
        'name': new_register.name,
        'boolean': True,
      }, status = 201)
    except json.JSONDecodeError:
      return JsonResponse({
        'status': 'error',
        'mesage': 'erro create client',
        'boolean': False,
      }, status=400)
  return JsonResponse({
    'status':'error',
    'mesage':'wrong method',
    'boolean': False,
  }, status = 405)

def get_cart():
  pass


