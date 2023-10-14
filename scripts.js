// INPUT
const invoiceVal = document.getElementById('invoiceValue');
const lengthVal = document.getElementById('lengthValue');
const widthVal = document.getElementById('widthValue');
const heightVal = document.getElementById("heightValue");
const rateVal = document.getElementById('rateValue');

//OUTPUT
const weightVal = document.getElementById('weightValue');
const freightVal = document.getElementById('freightValue');
const overWeightVal = document.getElementById('overWeightValue');
const RASVal = document.getElementById('RASValue');
const fuelVal = document.getElementById('fuelValue');
const DOCVal = document.getElementById("DOCValue");
const insuranceVal = document.getElementById("insuranceValue");
const taxAmtVal = document.getElementById("taxAmtValue");
const gstAmtVal = document.getElementById("gstAmtValue");
const totalVal = document.getElementById("totalValue");




let inv, fr, r, DOC, ins, gst, total, taxAmt, fuelPrice, RAS, overWeight;
let l, h, w, weight;

invoiceVal.addEventListener('input', calculateValues);
heightVal.addEventListener('input', calculateValues);
widthVal.addEventListener('input', calculateValues);
lengthVal.addEventListener('input', calculateValues);
rateVal.addEventListener('input', calculateValues);

calculateValues()

function calculateValues(){
    // initializing
    inv = parseFloat(invoiceVal.value);
   l = parseFloat(lengthVal.value);
   w = parseFloat(widthVal.value);
   h = parseFloat(heightVal.value);
   r = parseFloat(rateVal.value);

    // weight
    weight = Math.round(l*w*h/27000*6);

   // freight Value
   fr = Math.round( weight * r);
   
   // overWeight calculations
   if(weight<=32) overWeight = 0;
   else if(weight<=70) overWeight = 0;
   else if(weight<=200) overWeight = 150;
   else if(weight<=700) overWeight = 1200;

   RAS = 2*weight;

   fuelPrice = Math.round(27/100.0 * (fr + overWeight + RAS));

   // constant DOC
   DOC = 50; 

   
   let pointInvVal = Math.round(0.1/100 * invoiceVal);
   if(pointInvVal >50) ins = pointInvVal;
   else ins = 50;
   
   taxAmt = r + fr + overWeight + RAS + fuelPrice + DOC + ins;
   
   gst = Math.round(18/100 * taxAmt);

   total = taxAmt + gst;


    weightVal.innerText = `${weight}kg`;
    freightVal.innerText = `₹${fr}`;
    overWeightVal.innerText = `₹${overWeight}`;
    RASVal.innerText = `₹${RAS}`;
    fuelVal.innerText = `₹${fuelPrice}`;
    DOCVal.innerText = `₹${DOC}`;
    insuranceVal.innerText = `₹${ins}`;
    taxAmtVal.innerText = `₹${taxAmt}`;
    gstAmtVal.innerText = `₹${gst}`;
    totalVal.innerText = `₹${total}`;

}

