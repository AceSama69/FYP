const ctx = document.getElementById('performanceChart');
new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Performance Score',
      data: [40, 55, 60, 75, 85, 90],
      borderColor: '#004aad',
      fill: true,
      backgroundColor: 'rgba(0,74,173,0.1)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' }
    }
  }
});
