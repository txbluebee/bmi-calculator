// Access DOM
var getBmi = document.querySelector('.btn-get-bmi');
var bmiResult = document.querySelector('.bmi-result');

// Show BMI history
var bmiData = JSON.parse(localStorage.getItem('bmiData')) || [];
var bmiList = document.querySelector('.bmi-list');
// var deleteIcon = document.querySelector('.bmi-list');
// console.log(deleteIcon);
// listen to Event
displayBmiData(bmiData);
getBmi.addEventListener('click', getBmiData);
bmiList.addEventListener('click', deleteBmiData);
// Listen to Delete bmi history event;


function bmiCalulator(foot, inch , weight){
  var total_inches = foot*12 + inch;
  return 703*(weight/Math.pow(total_inches,2));
}

function addBmiData(h, w, b, s){
  var bmiDataItem = {height: h, weight: w, bmi:b, status: s, date: getToday()};
  bmiData.push(bmiDataItem);
  displayBmiData(bmiData);
  localStorage.setItem('bmiData', JSON.stringify(bmiData));
}

function deleteBmiData(e){
  e.preventDefault();
  console.log("delete me");
  console.log(e.target.nodeName);
  if (e.target.nodeName !== 'IMG'){return};
  var index = e.target.dataset.index;
  bmiData.splice(index, 1);
  displayBmiData(bmiData);
  localStorage.setItem('bmiData', JSON.stringify(bmiData));
}

function displayBmiData(items){
  var str = '';
  for (var i=0;i<items.length;i++){
    str += '<li class="'+ items[i].status+'">'+
              '<a href="#" class="deleteData data-index='+ i +'"><img src="./../img/circle_close.png"></a>'+
              '<ul class="bmi-items">'+
                '<li>'+ items[i].status + '</li>'+
                '<li>'+
                  '<span>BMI</span>' + items[i].bmi +
                '</li>'+
                '<li>'+
                  '<span>weight</span>' + items[i].weight +'<span>lbs</span>' +
                '</li>'+
                '<li>'+
                  '<span>height</span>' + items[i].height +'<span>ft</span>' +
                '</li>'+
                '<li>' + items[i].date + '</li>'+
              '</ul>'+
          '</li>';
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
  var footAndInch = document.querySelector('.foot').value + '.'+ document.querySelector('.inch').value
  var bmiDataOutput = bmiCalulator(footInput, inchInput, weightInput).toFixed(2);
  console.log(bmiData);
  var status = '';
  if (bmiDataOutput >= 40) {
    status = "overobese";
  } else if (bmiDataOutput >= 30 && bmiDataOutput < 40) {
    status = "obese";
  } else if (bmiDataOutput >= 25 && bmiDataOutput < 30) {
    status = 'overweight';
  } else if (bmiDataOutput >= 18 && bmiDataOutput < 25) {
    status = 'healthy';
  } else {
    status ='underweight';
  }
  addBmiData(footAndInch,weightInput,bmiDataOutput,status);
  var str = '<div class="result-block ' + status + '">' +
              '<div class="circle">' +
                '<img src="../img/icons_loop.png">' +
                bmiDataOutput +
                '<span>bmi</span>' +
              '</div>' +
              '<div class="result-text">'+ status+'</div>' +
            '</div>';
  bmiResult.innerHTML = str;
}
