// Access DOM
var getBmi = document.querySelector('.btn-get-bmi');
var bmiResult = document.querySelector('.bmi-result');

// Show BMI history
var data = JSON.parse(localStorage.getItem('bmiData')) || [];
var bmiList = document.querySelector('.bmi-history ul');

// listen to Event
getBmi.addEventListener('click', getBmiData);

function bmiCalulator(foot, inch , weight){
  var total_inches = foot*12 + inch;
  return 703*(weight/Math.pow(total_inches,2));
}

addBmiData(f, i, w, d, s ){
  var bmiDataItem = {foot: f, inch: i, wight:w, date: d, stat: s};
  data.push({

  })
}

updateBmiData(items){

}

function getBmiData(e){
  var weightInput = parseInt(document.querySelector('.weight').value);
  var footInput = parseInt(document.querySelector('.foot').value);
  var inchInput = parseInt(document.querySelector('.inch').value);
  var bmiData = bmiCalulator(footInput, inchInput, weightInput).toFixed(2);
  console.log(bmiData);

  var str = '<div class="result-block">' +
              '<div class="circle">' +
                '<img src="../img/icons_loop.png">' +
                bmiData +
                '<span>bmi</span>' +
              '</div>' +
              '<div class="result-text"></div>' +
            '</div>';
  bmiResult.innerHTML = str;
  var resultBlock = document.querySelector('.result-block');
  var resultText = document.querySelector('.result-text');
  if (bmiData >= 40) {
    resultBlock.className += " overobese";
    resultText.innerHTML = 'extremely'+ '<br>' + 'obese';
  } else if (bmiData >= 30 && bmiData < 40) {
    resultBlock.className += " obese";
    resultText.innerHTML = 'obese';
  } else if (bmiData >= 25 && bmiData < 30) {
    resultBlock.className += " healthy";
    resultText.innerHTML = 'healthy';
  } else if (bmiData >= 18 && bmiData < 25) {
    resultBlock.className += " underweight";
    resultText.innerHTML = 'underweight';
  }
}
