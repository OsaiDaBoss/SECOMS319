window.addEventListener('DOMContentLoaded', domLoaded);
function convertCtoF(degreesCelsius) {
    var CtoF = degreesCelsius * 9 / 5 + 32;
    return CtoF;
}

function convertFtoC(degreesFahrenheit) {
    var FtoC = (degreesFahrenheit - 32) * 5 / 9;
    return FtoC;
}

function domLoaded() {
    var convertBtn = document.getElementById("convertButton");
    var errMsg = document.getElementById("errorMessage");
    var celsiusIn = document.getElementById("cInput");
    var fahrenheitIn = document.getElementById("fInput");
    var img = document.getElementById("weatherImage")
    convertBtn.addEventListener("click", function () {
        var celsius = parseFloat(celsiusIn.value);
        var fahrenheit = parseFloat(fahrenheitIn.value);

        if (isNaN(celsius)) celsius = 0;
        if (isNaN(fahrenheit)) fahrenheit = 0;
        errMsg.innerHTML = "";
        if (fahrenheit < 32) {
            img.setAttribute("src", "cold.png");
        }
        else if (fahrenheit >= 32 && fahrenheit <= 50) {
            img.setAttribute("src", "cool.png");
        }

        else if (fahrenheit > 50) {
            img.setAttribute("src", "warm.png");
        }

        else {
            console.log("non");
        }

        if (celsius != 0) { 
            console.log("here")
            if (Math.sign(celsius) == 1 || Math.sign(celsius) == -1) {
                
                ans = convertCtoF(celsius);
                if (ans < 32) {
                    img.setAttribute("src", "cold.png");
                }

                else if (ans >= 32 && ans <= 50) {
                    img.setAttribute("src", "cool.png");
                }
                else if (ans > 50) {
                    img.setAttribute("src", "warm.png");
                }

                else {
                    console.log("non");
                }
                fahrenheitIn.value = ans;
            }

            else {
                img.setAttribute("src", "");
                errMsg.innerHTML = `${cInput.value} is not a number`;
            }
        }

        else if (fahrenheit != 0)
        {
            if (Math.sign(fahrenheit) == 1 || Math.sign(fahrenheit) == -1)
            {
                ans = convertFtoC(fahrenheit);
                celsiusIn.value = ans;
            }

            else { 
                img.setAttribute("src", "");
                errMsg.innerHTML =`${fInput.value} is not a number`;
            }
         }
        else if(isNaN(fInput.value)) { 
            errMsg.innerHTML = `${fInput.value} is not a number`;
        }
        else if(isNaN(cInput.value)) { 
            errMsg.innerHTML = `${cInput.value} is not a number`;
        }
    });

    celsiusIn.addEventListener('input', function () {
        fahrenheitIn.value = "";
    });

    fahrenheitIn.addEventListener('input', function () {
        celsiusIn.value = "";
    });

}