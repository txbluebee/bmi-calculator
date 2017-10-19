var weightInput = document.querySelector('.weight');

var footInput = document.querySelector('.foot');
var inchInput = document.querySelector('.inch');
var warningText = document.querySelector('.warningText');

weightInput.addEventListener('blur', checkNumber);
footInput.addEventListener('blur', checkNumber);
inchInput.addEventListener('blur', checkNumber);


function checkNumber(){
  var value = parseInt(this.value);
  if (isNaN(value)) {
    warningText.innerHTML = 'Please enter valid number!';
  } else {
    warningText.innerHTML = '';
  }
}
