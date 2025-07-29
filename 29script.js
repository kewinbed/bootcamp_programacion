document.addEventListener('DOMContentLoaded', function () {
  fetch('data/Paises.json')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('graficoBarraspaises').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.pais),
          datasets: [{
            label: 'Porcentaje de Energía Renovable',
            data: data.map(item => item['promedio_renovables']),
            backgroundColor: 'rgba(4,1,178,6)',
            borderColor: 'rgba(4,12,15,1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'porcentaje (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Paises'
              }
            }
          }
        }
      });
    });


  fetch('data/Internacional.json')
    .then(response => response.json())
    .then(data => {
      const ctx = document.getElementById('graficoBarrasRegiones').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item.region),
          datasets: [{
            label: 'Porcentaje de Energía Renovable',
            data: data.map(item => item['promedio_renovables']),
            backgroundColor: 'rgba(4,1,178,6)',
            borderColor: 'rgba(4,12,15,1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'porcentaje (%)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Paises'
              }
            }
          }
        }
      });
    });
})


fetch('data/Historico.json')
.then(response => response.json())
.then(data => {
  const ctx = document.getElementById('graficoBarrascomparativo').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map(item => item.anno),
      datasets: [{
        label: 'Porcentaje de Energía Renovable',
        data: data.map(item => item['renovables']),
        label: data.map(item => item['region']),
        backgroundColor: 'rgba(4,1,178,6)',
        borderColor: 'rgba(4,12,15,1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'porcentaje (%)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Paises'
          }
        }
      }
    }
  });
});



