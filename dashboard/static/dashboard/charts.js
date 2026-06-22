
new Chart(document.getElementById('topProductsChart'), {
    type: 'bar',
    data: {
        labels: topProducts.map(item => item.product__name),
        datasets: [{
            label: 'Quantidade Vendida',
            data: topProducts.map(item => item.total_sold),
        }]
    }
});

new Chart(document.getElementById('sellerChart'), {
    type: 'bar',
    data: {
        labels: salesBySeller.map(item => item.seller__username),
        datasets: [{
            label: 'Total de vendas',
            data: salesBySeller.map(item => item.total),
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});

new Chart(document.getElementById('statusChart'), {
    type: 'pie',
    data: {
        labels: salesByStatus.map(item => item.status),
        datasets: [{
            data: salesByStatus.map(item => item.total),
        }]
    }
});

new Chart(document.getElementById('monthChart'), {
    type: 'line',
    data: {
        labels: salesByMonth.map(item => `Mês ${item.created_at__month}`),
        datasets: [{
            label: 'Total vendido',
            data: salesByMonth.map(item => item.total),
        }]
    }
});

new Chart(document.getElementById('productStockChart'), {
    type: 'bar',
    data: {
        labels: productStock.map(item => item.name),
        datasets: [{
            label: 'Estoque',
            data: productStock.map(item => item.total),
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});

new Chart(document.getElementById('regionChart'), {
    type: 'pie',
    data: {
        labels: salesByRegion.map(item => item.customer__state),
        datasets: [{
            label: 'Vendas por região',
            data: salesByRegion.map(item => item.total),
        }]
    }
});

new Chart(document.getElementById('customerChart'), {
    type: 'bar',
    data: {
        labels: salesByCustomer.map(item => item.customer__name),
        datasets: [{
            label: 'Vendas por cliente',
            data: salesByCustomer.map(item => item.total),
        }]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});





