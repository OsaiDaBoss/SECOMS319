/*
Osaid Samman
March 6, 2023
oasamman
*/

function myresolve(t){
    return "Sucess!! Promise waited ["+t+"] ms";
}

function sleep (t) {
    let mypromise = new Promise((resolve, reject) => {
      setTimeout(() => {resolve(myresolve(t))}, t)
    });
    mypromise.then(
        result => {
            let container = document.getElementById("promisehere");
            let div = document.createElement("div");
            div.innerHTML= result;
            container.appendChild(div);
        },
        error => alert(error)
    );
}

sleep(3000);
