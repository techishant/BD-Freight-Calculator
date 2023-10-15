// INPUT
const invoiceVal = document.getElementById('invoiceValue');
const lengthVal = document.getElementById('lengthValue');
const widthVal = document.getElementById('widthValue');
const heightVal = document.getElementById("heightValue");
const rateVal = document.getElementById('rateValue');
const pktVal = document.getElementById('pktValue');
const inputWeightVal = document.getElementById('inputWeightValue');
const overWeightVal = document.getElementById('overWeightValue');
const ODAchargeVal = document.getElementById('ODAchargeValue');

//OUTPUT
const weightVal = document.getElementById('weightValue');
const freightVal = document.getElementById('freightValue');
const RASVal = document.getElementById('RASValue');
const fuelVal = document.getElementById('fuelValue');
const DOCVal = document.getElementById("DOCValue");
const insuranceVal = document.getElementById("insuranceValue");
const taxAmtVal = document.getElementById("taxAmtValue");
const gstAmtVal = document.getElementById("gstAmtValue");
const totalVal = document.getElementById("totalValue");




let inv, fr, r, DOC, ins, gst, total, taxAmt, fuelPrice, RAS, overWeight, ODACharge;
let l, h, w, weight;

invoiceVal.addEventListener('input', calculateValues);
heightVal.addEventListener('input', calculateValuesOnDimensionUpdate);
widthVal.addEventListener('input', calculateValuesOnDimensionUpdate);
lengthVal.addEventListener('input', calculateValuesOnDimensionUpdate);
rateVal.addEventListener('input', calculateValues);
ODAchargeVal.addEventListener('input', calculateValues);
overWeightVal.addEventListener('input', calculateValuesOnOverWeightUpdate);

inputWeightVal.addEventListener('input', calculateValuesonVariableInput)

let isDimensionsUpdated = false;
let isOverWeightUpdated = false;
let isInputWeightUpdated = false;

function calculateValuesonVariableInput(){
    isInputWeightUpdated = true;
    calculateValues();
}

function calculateValuesOnDimensionUpdate(){
    isDimensionsUpdated = true;
    calculateValues();
}

function calculateValuesOnOverWeightUpdate(){
    isOverWeightUpdated = true;
    calculateValues();
}


calculateValues()

function calculateValues(){
    // initializing
    inv = parseFloat(invoiceVal.value);
   l = parseFloat(lengthVal.value);
   w = parseFloat(widthVal.value);
   h = parseFloat(heightVal.value);
   r = parseFloat(rateVal.value);
   ODACharge = parseFloat(ODAchargeVal.value);

    // weight
    weight = Math.round(l*w*h/27000*6);
    
    if(!isInputWeightUpdated){
        inputWeightVal.value = weight;
    }else{
        weight = parseFloat(inputWeightVal.value);
        isInputWeightUpdated = false;
    }
    if(isDimensionsUpdated){
        weight = Math.round(l*w*h/27000*6);
        isDimensionsUpdated = false;
    }

    


    if(weight < 10) weight = 10;
   // freight Value
   fr = Math.round( weight * r);
   
   // overWeight calculations
   

   if(isOverWeightUpdated){
    overWeight = parseFloat(overWeightVal.value);
    isOverWeightUpdated = false;
   }else{
    if(weight<=32) overWeight = 0;
   else if(weight<=70) overWeight = 0;
   else if(weight<=200) overWeight = 150;
   else if(weight<=700) overWeight = 1200;
   }
   overWeightVal.value = overWeight;

   RAS = 2*weight;

   fuelPrice = Math.round(27/100.0 * (fr + overWeight + RAS));

   // constant DOC
   DOC = 50; 

   
   let pointInvVal = Math.round(0.1/100 * inv);
   if(pointInvVal > 50) ins = pointInvVal;
   else ins = 50;
   
//    console.log(ODACharge)
   taxAmt = fr + overWeight + RAS + fuelPrice + DOC + ins + ODACharge;
   
   gst = Math.round(18/100 * taxAmt);

   total = taxAmt + gst;

//    overWeightVal.innerText = `₹${overWeight}`;

    weightVal.innerText = `${weight}kg`;
    freightVal.innerText = `₹${fr}`;
    RASVal.innerText = `₹${RAS}`;
    fuelVal.innerText = `₹${fuelPrice}`;
    DOCVal.innerText = `₹${DOC}`;
    insuranceVal.innerText = `₹${ins}`;
    taxAmtVal.innerText = `₹${taxAmt}`;
    gstAmtVal.innerText = `₹${gst}`;
    totalVal.innerText = `₹${total}`;

}

