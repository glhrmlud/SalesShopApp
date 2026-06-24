from django.shortcuts import render
from django.db.models import Sum, Count
from sales.models import Sale, ItemSale
from products.models import Products
from django.contrib.auth.decorators import login_required


@login_required
def dashboard(request):
    # Produto mais vendido
    top_products = (
        ItemSale.objects
        .values('product__name')
        .annotate(total_sold=Sum('quantity'))
        .order_by('-total_sold')[:5]
    )

    # Total de vendas por mes
    sales_by_month = [
        {
            'created_at__month' : item['created_at__month'],
            'total' : float(item['total'])
        }
        for item in Sale.objects
        .values('created_at__month')
        .annotate(total=Sum('itemsale__unit_price'))
        .order_by('created_at__month')
    ]

    # Vendas por vendedor
    sales_by_seller = (
        Sale.objects
        .values('seller__username')
        .annotate(total=Count('id'))
        .order_by('-total')
    )

    # Status das vendas
    sales_by_status = (
        Sale.objects
        .values('status')
        .annotate(total=Count('id'))
    )

    # Estoque dos produtos
    product_stock = (
        Products.objects
        .values('name')
        .annotate(total=Sum('stock'))
        .order_by('-total')
    )

    # Vendas por regiao
    raw_sales_by_region = (
        Sale.objects
        .values('customer__state')
        .annotate(total=Count('id'))
        .order_by('-total')
    )
    sales_by_region = [
        {
            'customer__state': item['customer__state'] if item['customer__state'] else 'Não Informado',
            'total': item['total']
        }
        for item in raw_sales_by_region
    ]

    # Vendas por cliente
    sales_by_customer = (
        Sale.objects
        .values('customer__name')
        .annotate(total=Count('id'))
        .order_by('-total')[:10]
    )

    context = {
        'top_products' : list(top_products),
        'sales_by_month' : list(sales_by_month),
        'sales_by_seller' : list(sales_by_seller),
        'sales_by_status' : list(sales_by_status),
        'product_stock' : list(product_stock),
        'sales_by_region' : sales_by_region,
        'sales_by_customer' : list(sales_by_customer),
    }

    return render(request, 'dashboard/dashboard.html', context)


