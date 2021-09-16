/*jslint browser:true */
"use strict";


function addMonths (element) {
var annualUsageKw = 0, dailyUsageKw = 0, i = 0, x = 0;
var months = document.getElementById(element).getElementsByTagName('input');
// console.log(months);

for (let i = 0; i < months.length; i++) {
    x = Number(months[i].value);
    annualUsageKw += x; 
}

dailyUsageKw = annualUsageKw/365;
return dailyUsageKw; 

}

function sunHours() {
var hours; 
var theZone = document.forms.solarForm.zone.selectedIndex;
 theZone +=1;
 switch(theZone) {
    case 1:
        hours = 6;
        break; 
    case 2:
        hours = 5.5; 
        break;
    case 3:
        hours = 5; 
        break;
    case 4: 
        hours = 4.5; 
        break;
    case 5: 
        hours = 4.2;
        break;
    case 6:
        hours = 3.5;
        break
    default: 
        hours = 0;
 }
 return hours; 

}

function calculatePanel () {
var userChoice = document.forms.solarForm.panel.selectedIndex;
var panelOptions = document.forms.solarForm.panel.options;
var power = panelOptions[userChoice].value;
var name = panelOptions[userChoice].text;
var x = [power, name];

return x; 

}





 function calculateSolar() {

 var dailyUsageKw = addMonths('mpc');
//  console.log(dailyUsageKw);

 var sunHoursPerDay = sunHours();
//  console.log(sunHoursPerDay);
 
 var minimumKWNeeds = dailyUsageKw/sunHoursPerDay;
//  console.log(minimumKWNeeds);

 var realKwNeeds = minimumKWNeeds * 1.25;
//  console.log(realKwNeeds);

 var realWattNeeds = realKwNeeds * 1000;
//  console.log(realWattNeeds);

 var panelInfo = calculatePanel();
 var panelOutput = panelInfo[0];
 var panelName = panelInfo[1];

//  console.log(panelOutput);
//  console.log(panelName);

 var panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
//  console.log(panelsNeeded);



var feedback = ""; 
feedback += `<p>Based on your average dialy use of ${Math.round(dailyUsageKw)} Kwh, you will need ${panelsNeeded} panels</p>`;
feedback += "<h2>Additional Details</h2>";
feedback += `<p>Your Average daily electricity consumption: ${Math.round(dailyUsageKw)} Kwh per day. </p>`;
feedback += `<p>Average Sunshine hours per day: ${sunHoursPerDay} hours</p>`;
feedback += `<p>Realistic watts needed per hour: ${Math.round(realWattNeeds)} watts/hour.</p>`;
feedback += `<p>The ${panelName} panel you selected generates about ${panelOutput} watts per hour</p>`;

document.getElementById('feedback').innerHTML = feedback;


}
 



