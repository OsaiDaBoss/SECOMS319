var cInputValue = document.getElementById('cinput');
var fInputValue = document.getElementById('finput');
var errorMSG = document.getElementById('errorMessage');
var image = document.getElementById('weatherimage');

window.addEventListener("DOMContentLoaded",domLoaded);

function domLoaded()
{
  document.getElementById("convertButton").addEventListener("click", checkInput);
  document.getElementById("cinput").addEventListener("input", clearFInput);
  document.getElementById("finput").addEventListener("input", clearCInput);
}

function convertCtoF(degreesCelsius)
{
  return(degreesCelsius*9/5 + 32);
}

function convertFtoC(degreesFahrenheit)
{
  return((degreesFahrenheit - 32)* 5/9);
}

function checkInput()
{
   if(cInputValue.value != "")
  {
    var celsiusInputValue = parseFloat(cInputValue.value);
      if(isNaN(celsiusInputValue))
      {
        errorMessage.innerHTML = cInputValue.value + " is not a number !";
        image.src =" "
      }
      else
      {
        var fahrenheit_value = convertCtoF(celsiusInputValue);
        fInputValue.value = fahrenheit_value;
        changeImage(fahrenheit_value);
        errorMessage.innerHTML = "";
      }
  }
  else
  {
      var fahrenheitInputValue = parseFloat(fInputValue.value);
      if(isNaN(fahrenheitInputValue))
      {
        errorMessage.innerHTML=fInputValue.value + " is not a number !";
        image.src =" "
      }
      else
      {
        cInputValue.value = convertFtoC(fahrenheitInputValue);
        changeImage(parseFloat(fInputValue.value)); 
        errorMessage.innerHTML="";
      }
  }
}

function clearFInput()
{
  fInputValue.value="";
}

function clearCInput()
{
  cInputValue.value="";
}

function changeImage(tempValue)
{

  if(tempValue < 32)
  {
    image.src = "cold.png";
  }
  else if(tempValue >= 32 && tempValue <=50)
  {
    image.src = "cool.png";
  }
  else
  {
    image.src ="warm.png";
  }
}

