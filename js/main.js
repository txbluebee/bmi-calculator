// Access DOM
var getBmi = document.querySelector('.btn-get-bmi');
var bmiResult = document.querySelector('.bmi-result');

// Show BMI history
var bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];
var bmiList = document.querySelector('.bmi-list');

// listen to Event
displayBmiData(bmiData);
getBmi.addEventListener('click', getBmiData);

function bmiCalulator(foot, inch , weight){
  var total_inches = foot*12 + inch;
  return 703*(weight/Math.pow(total_inches,2));
}

function addBmiData(f, i, w, s){
  var bmiDataItem = {foot: f, inch: i, wight:w, status: s, date: getToday()};
  bmiData.push(bmiDataItem);
  displayBmiData(bmiData);
  localStorage.setItem('bmiData', JSON.stringify(bmiData));
}

function displayBmiData(items){
  var str = '';
  for (var i=0;i<items.length;i++){
    str += '<li>' + items[i].foot + '</li>';
  }
  bmiList.innerHTML = str;
}

function getToday(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) dd = '0'+ dd;
  if (mm < 10) mm = '0'+mm;
  today = mm+'-'+dd+'-'+yyyy;
  return today;
}


function getBmiData(e){
  var weightInput = parseInt(document.querySelector('.weight').value);
  var footInput = parseInt(document.querySelector('.foot').value);
  var inchInput = parseInt(document.querySelector('.inch').value);
  var bmiData = bmiCalulator(footInput, inchInput, weightInput).toFixed(2);
  console.log(bmiData);
  var status = '';
  if (bmiData >= 40) {
    status = "overobese";
  } else if (bmiData >= 30 && bmiData < 40) {
    status = "obese";
  } else if (bmiData >= 25 && bmiData < 30) {
    status = 'overweight';
  } else if (bmiData >= 18 && bmiData < 25) {
    status = 'healthy';
  } else {
    status ='underweight';
  }
  addBmiData(footInput,inchInput,weightInput,status);
  var str = '<div class="result-block ' + status + '">' +
              '<div class="circle">' +
                '<img src="../img/icons_loop.png">' +
                bmiData +
                '<span>bmi</span>' +
              '</div>' +
              '<div class="result-text">'+ status+'</div>' +
            '</div>';
  bmiResult.innerHTML = str;
}
