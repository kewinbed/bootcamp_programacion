// configuracion de Supabase
const SUPABASE_URL = 'https://nijtzzwqswgvabjjntyh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5panR6endxc3dndmFiampudHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTE0MjAsImV4cCI6MjA2OTQ2NzQyMH0.k4kGMcRoCd4K-QqepqnrSyf7X9WE0lCR0bpQigRElko';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function (){
  //Autenticacion Anónima
  await supabase.auth.signInAnonymously();

  //Ejecutar todas las funciones
  fetchTopRegiones();
  fetchTop20Paises();
  fetchColombiavsSuramerica();

  // Grafico de Barras de las regiones con mayor produccion de energía
  async function fetchTopRegiones(){
    const { data, error } = await supabase
    .from('top_regiones')
    .select('*')
    .order('promedio_renovables', { ascending: false }) 
    .limit (20);    
    if (error) throw error;
    
    createBarChart('graficoBarrasregiones', data, 'region', 'promedio_renovables', 'Porcentaje de Energia Renovables', 'rgba(54, 162, 235, 0.6');
  }
  
  // Grafico de Barras de los 20 paises con mayor produccion de energía 
  async function fetchTop20Paises(){
    const { data, error } = await supabase
    .from('top_20_paises')
    .select('*')
    .order('promedio_renovables', { ascending: false });        
    if (error) throw error;
    
    createBarChart('graficoBarraspaises', data, 'pais', 'promedio_renovables', 'Porcentaje de Energia Renovables por region', 'rgba(54, 162, 235, 0.6)');
  } 

  // Funcion para crear graficos de barras
  function createBarChart(canvasId, data, labelfield, datafield, label, backgroundColor){
    const ctx = document.getElementById(canvasId).getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(item => item[labelfield]),
          datasets: [{
            label: label,
            data: data.map(item => item[datafield]),
            backgroundColor: backgroundColor,
            borderColor: backgroundColor.replace('0.6,', '1'),
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
                text: canvasId.includes('Paises') ? 'Paises':'regiones'
              }
            }
          }
        }
      });
    }
    

    //Grafico comparativo de lineas
    async function fetchColombiavsSuramerica(){
      const { data, error } = await supabase
      .from('colombia_suramerica')
      .select('*')
      .Lte('anno',2021)
      .order('anno', { ascending: true });          
      if (error) throw error;

      //procesar los datos que vienen de la consulta
      const colombiaData = data.filter(item => item.region === 'Colombia')
      const suramericaData = data.filter(item => item.region === 'South America');
      const years = [...new Set(data.map(item => item.anno))];
      const ctx=document.getElementById('graficoLineasComparativa').getContext('2d');    
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: years
            datasets: [{
              label: 'Colombia',
              data: colombiaData.map(item => item.Renovable),
              backgroundColor: rgba(54, 162, 235, 0.6)'),
              borderColor: backgroundColor.replace('0.6,', '1'),
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
                  text: canvasId.includes('Paises') ? 'Paises':'regiones'
                }
              }
            }
          }
        });
});