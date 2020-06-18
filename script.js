const totalCases = document.querySelector('.total-cases');
const recoveryCases = document.querySelector('.recovery-cases');
const deathCases = document.querySelector('.death-cases');
const dataTable = document.querySelector('.data-table-body');
const changeSort = document.querySelector('.sort');
let dataFixs;
fetch('https://api.covid19api.com/world/total')
  .then((result) => result.json())
  .then((result) => {
    totalCases.innerHTML = numberWithCommas(result.TotalConfirmed);
    recoveryCases.innerHTML = numberWithCommas(result.TotalRecovered);
    deathCases.innerHTML = numberWithCommas(result.TotalDeaths);
    fetch('https://api.covid19api.com/summary')
      .then((result) => result.json())
      .then((result) => {
        dataFixs = result.Countries;
        console.log(dataFixs);
        dataTable.innerHTML = getDataTable(dataFixs);
      });
  });

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
function getDataTable(dataFixs) {
  return dataFixs.map((dataFix, i) => {
    return ` <tr>
        <th scope="row">${i + 1}</th>
        <td>${dataFix.Country}</td>
        <td>${numberWithCommas(dataFix.TotalConfirmed)}</td>
        <td>+ ${numberWithCommas(dataFix.NewConfirmed)}</td>
        <td>${numberWithCommas(dataFix.TotalDeaths)}</td>
        <td>${numberWithCommas(dataFix.TotalRecovered)}</td>
        <td>${dataFix.Date}</td>
      </tr>`;
  });
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
changeSort.addEventListener('change', handleSort);
