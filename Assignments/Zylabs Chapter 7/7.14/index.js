function parseScores(scoresString) { 
   return scoresString.split(' ');
}
function buildDistributionArray(scoresArray) { 
   A=0, B=0, C=0, D=0, F=0;
   var i = 0;
     while(i<scoresArray.length){
       if(Number(scoresArray[i]>= 90) && Number(scoresArray[i]<= 100)){
         A = A + 1;
       }
       else if(Number(scoresArray[i] >= 80) && Number(scoresArray[i] < 90)){
         B = B + 1;
       }
       else if(Number(scoresArray[i] >= 70) && Number(scoresArray[i] < 80)){
         C = C + 1;
       }
       else if(Number(scoresArray[i] >= 60) && Number(scoresArray[i] < 70)){
         D = D + 1;
       }
       else if(Number(scoresArray[i] >= 1) && Number(scoresArray[i]  < 60)){
         F = F + 1;
       }
       i++;
     }
     return [A,B,C,D,F];
}
function setTableContent(userInput) { 
   var scores = parseScores(userInput);
   var arrayGrade = buildDistributionArray(scores);
   var getTable = document.getElementById('distributionTable');
   var flag = 0;
   var i = 0;

   while(i < arrayGrade.length){
     if(arrayGrade[i] != 0){
       flag = 1;
     }
     i++;
   }

   if(flag == 1){
     getTable.innerHTML =`
     <tr>
       <td><div style='height:0px' class='bar0'></div></td>
       <td><div style='height:0px' class='bar1'></div></td>
       <td><div style='height:0px' class='bar2'></div></td>
       <td><div style='height:0px' class='bar3'></div></td>
       <td><div style='height:0px' class='bar4'></div></td>
     </tr>
       <tr>
         <td>A</td>
         <td>B</td>
         <td>C</td>
         <td>D</td>
         <td>F</td>
       </tr>
       <tr>
         <td class="grade"></td>
         <td class="grade"></td>
         <td class="grade"></td>
         <td class="grade"></td>
         <td class="grade"></td>
       </tr>`;
       var j = 0;
       while(j < arrayGrade.length){
         var some = document.getElementsByClassName("bar"+j);
         document.getElementsByClassName("grade")[j].innerHTML = arrayGrade[j]+"";
         some[0].style.height = (10*arrayGrade[j])+"px";
         j++;
       }  
}
     else{
       getTable.innerHTML = "<tr><td>No graph to display</td></tr>"; 
     }
}
function bodyLoaded() {
   setTableContent("45 78 98 83 86 99 90 59");
}

