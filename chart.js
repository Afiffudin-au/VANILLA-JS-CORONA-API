let data
let country = []
let cases = []
let backgroundColor = [];
function getSummaryData() {
  return fetch('https://api.covid19api.com/summary')
    .then((result) => {
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      return result.json();
    })
    .then((result) => result);
}
async function display(){
  const summary = await getSummaryData();
  data = summary.Countries
  data.map(dat=>{
    country.push(dat.Country);
    cases.push(dat.TotalConfirmed);
  })
  for(let i = 0; i<country.length; i++){
    let r = Math.floor(Math.random()* 255); 
    let g = Math.floor(Math.random()* 255); 
    let b = Math.floor(Math.random()* 255); 
    let a = Math.floor(Math.random()* 10); 
    backgroundColor.push(`rgba(${r}, ${g}, ${b}, ${a})`);
  }
  dataChart(country,cases)
}
function dataChart(country,cases){
  var ctx = document.getElementById('myChart');
  ctx.width = window.innerWidth;
  ctx.height = window.innerHeight; 
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: country,
      datasets: [
        {
          label: '# Cases',
          data: cases,
	  	    backgroundColor: backgroundColor
          ,
          borderColor:backgroundColor,
					borderWidth: 1
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      plugins: {
        zoom: {
          // Container for pan options
          pan: {
            // Boolean to enable panning
            enabled: true,

            // Panning directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow panning in the y direction
            mode: 'xy',
          },

          // Container for zoom options
          zoom: {
            // Boolean to enable zooming
            enabled: true,

            // Zooming directions. Remove the appropriate direction to disable
            // Eg. 'y' would only allow zooming in the y direction
            mode: 'xy',
          },
        },
      },
    },
  });
}
window.addEventListener('load',display); 



