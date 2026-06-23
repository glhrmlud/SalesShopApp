
new Chart(document.getElementById('topProductsChart'), {
    type: 'bar',
    data: {
        labels: topProducts.map(item => item.product__name),
        datasets: [{
            label: 'Quantidade Vendida',
            data: topProducts.map(item => item.total_sold),
            backgroundColor: 'rgba(99, 102, 241, 0.8)',
            borderRadius: 8,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
        scales: {
            x: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } },
            y: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } }
        }
    }
});

new Chart(document.getElementById('sellerChart'), {
    type: 'bar',
    data: {
        labels: salesBySeller.map(item => item.seller__username),
        datasets: [{
            label: 'Total de vendas',
            data: salesBySeller.map(item => item.total),
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderRadius: 8,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
        scales: {
            x: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } },
            y: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } , ticks: { stepSize: 1, color: '#ffffff99' } }
        }
    }
});

new Chart(document.getElementById('statusChart'), {
    type: 'pie',
    data: {
        labels: salesByStatus.map(item => item.status),
        datasets: [{
            data: salesByStatus.map(item => item.total),
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(239, 68, 68, 0.8)',
            ],
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
    }
});

new Chart(document.getElementById('monthChart'), {
    type: 'line',
    data: {
        labels: salesByMonth.map(item => `Mês ${item.created_at__month}`),
        datasets: [{
            label: 'Total vendido',
            data: salesByMonth.map(item => item.total),
            borderColor: 'rgba(245, 158, 11, 0.8)',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            pointBackgroundColor: 'rgba(245, 158, 11, 0.8)',
            fill: true,
            tension: 0.4,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
        scales: {
            x: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } },
            y: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } }
        }
    }
});

new Chart(document.getElementById('productStockChart'), {
    type: 'bar',
    data: {
        labels: productStock.map(item => item.name),
        datasets: [{
            label: 'Estoque',
            data: productStock.map(item => item.total),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderRadius: 8,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
        scales: {
            x: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } },
            y: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } }
        }
    }
});

new Chart(document.getElementById('regionChart'), {
    type: 'pie',
    data: {
        labels: salesByRegion.map(item => item.customer__state || 'Não Informado'),
        datasets: [{
            label: 'Vendas por região',
            data: salesByRegion.map(item => item.total),
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(245, 158, 11, 0.8)',
                'rgba(239, 68, 68, 0.8)',
                'rgba(59, 130, 246, 0.8)',
            ],
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
    }
});


new Chart(document.getElementById('customerChart'), {
    type: 'bar',
    data: {
        labels: salesByCustomer.map(item => item.customer__name),
        datasets: [{
            label: 'Vendas por cliente',
            data: salesByCustomer.map(item => item.total),
            backgroundColor: 'rgba(236, 72, 153, 0.8)',
            borderRadius: 8,
        }]
    },
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#ffffff99' } } },
        scales: {
            x: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } },
            y: { ticks: { color: '#ffffff99' }, grid: { color: '#ffffff11' } , ticks: { stepSize: 1, color: '#ffffff99' } }
        }
    }
});






