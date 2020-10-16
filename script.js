const totalCases = document.querySelector('.total-cases');
const recoveryCases = document.querySelector('.recovery-cases');
const deathCases = document.querySelector('.death-cases');
const dataTable = document.querySelector('.data-table-body');
const changeSort = document.querySelector('.sort');
const changeSortByCountry = document.querySelector('.sort-alphabet');
const tableInputSearch = document.querySelector('#tableSearch');
let dataFixs;

//--------------------------------------------
//get data world (3 summary)
function getWorldData() {
  return fetch('https://api.covid19api.com/world/total')
    .then((result) => {
      if (!result.ok) {
        throw new Error(result.statusText);
      }
      return result.json();
    })
    .then((result) => {
      return result;
    });
}
//display world data (3 summary)
async function displayWorldData() {
  try {
    const result = await getWorldData();
    totalCases.innerHTML = numberWithCommas(result.TotalConfirmed);
    recoveryCases.innerHTML = numberWithCommas(result.TotalRecovered);
    deathCases.innerHTML = numberWithCommas(result.TotalDeaths);
  } catch (err) {
    alert(err);
  }
}

// ---------------------------------------------
//get summary data world almost all
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
//display summary data almost all
async function displaySummaryData() {
  try {
    const dataSummary = await getSummaryData();
    dataFixs = dataSummary.Countries;
    dataTable.innerHTML = getDataTable(dataFixs);
  } catch (err) {
    alert(err);
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function getDataTable(dataFixs) {
  return dataFixs
    .map((dataFix, i) => {
      return ` <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataFix.Country}</td>
        <td>${numberWithCommas(dataFix.TotalConfirmed)}</td>
        <td>+ ${numberWithCommas(dataFix.NewConfirmed)}</td>
        <td>${numberWithCommas(dataFix.TotalDeaths)}</td>
        <td>${numberWithCommas(dataFix.TotalRecovered)}</td>
        <td>${dataFix.Date}</td>
      </tr>`;
    })
    .join('');
}
function handleSort() {
  if (this.value == 'sortlargest') {
    dataFixs.sort((a, b) => (a.TotalConfirmed < b.TotalConfirmed ? 1 : -1));
  }
  if (this.value == 'sortsmalles') {
    dataFixs.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed ? 1 : -1));
  }
  dataTable.innerHTML = getDataTable(dataFixs);
}
function handleSortByCountry() {
  if (this.value == 'a_z') {
    dataFixs.sort((a, b) => (a.Country > b.Country ? 1 : -1));
  }
  if (this.value == 'z_a') {
    dataFixs.sort((a, b) => (a.Country < b.Country ? 1 : -1));
  }
  dataTable.innerHTML = getDataTable(dataFixs);
}
function handleSearch() {
  let txtValue;
  const filter = this.value.toUpperCase();
  const table = document.querySelector('.data-table-body');
  const trs = table.querySelectorAll('tr');
  trs.forEach((tr) => {
    const td = tr.querySelectorAll('td')[0]; // take the index td always to 0 = country
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr.style.display = '';
      } else {
        tr.style.display = 'none';
      }
    }
  });
}
changeSort.addEventListener('change', handleSort);
changeSortByCountry.addEventListener('change', handleSortByCountry);
tableInputSearch.addEventListener('keyup', handleSearch);
window.addEventListener('load', displayWorldData);
window.addEventListener('load', displaySummaryData);
