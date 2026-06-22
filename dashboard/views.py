from django.shortcuts import render
from django.db.models import Sum, Count
from sales.models import Sale, ItemSale

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

    context = {
        'top_products' : list(top_products),
        'sales_by_month' : list(sales_by_month),
        'sales_by_seller' : list(sales_by_seller),
        'sales_by_status' : list(sales_by_status)
    }

    return render(request, 'dashboard/dashboard.html', context)


