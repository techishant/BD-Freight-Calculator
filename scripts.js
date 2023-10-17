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
let l, h, w, weight, pkt;

let isDimensionsUpdated = false;
let isOverWeightUpdated = false;
let isInputWeightUpdated = false;
let isRasUpdated = false;



// if invoice Value, rate or ODA charge value is updated
invoiceVal.addEventListener('input', calculateValues);
rateVal.addEventListener('input', calculateValues);
pktVal.addEventListener('input', calculateValues);
ODAchargeVal.addEventListener('input', calculateValues);

// if dimensions - height, width, length value is updated
heightVal.addEventListener('input', function () {
    isDimensionsUpdated = true;
    calculateValues();
});
widthVal.addEventListener('input', function () {
    isDimensionsUpdated = true;
    calculateValues();
});
lengthVal.addEventListener('input', function () {
    isDimensionsUpdated = true;
    calculateValues();
});


overWeightVal.addEventListener('input', function () {
    isOverWeightUpdated = true;
    calculateValues();
});

inputWeightVal.addEventListener('input', function () {
    isInputWeightUpdated = true;
    calculateValues();
});

RASVal.addEventListener('input', function () {
    isRasUpdated = true;
    calculateValues();
})

isDimensionsUpdated = true;
calculateValues()

function calculateValues() {
    // initializing
    inv = parseFloat(invoiceVal.value);
    pkt = parseInt(pktVal.value);
    l = parseFloat(lengthVal.value);
    w = parseFloat(widthVal.value);
    h = parseFloat(heightVal.value);
    r = parseFloat(rateVal.value);
    ODACharge = parseFloat(ODAchargeVal.value);

   

    // if either dimensions is updated the weight should be re-calculated
    if (isDimensionsUpdated) {
        weight = Math.round(l * w * h / 27000 * 6 * pkt);
        isDimensionsUpdated = false;
    }

    // if Weight input is updated change weight to user input else keep the one calculated above;
    if (isInputWeightUpdated) {
        weight = parseFloat(inputWeightVal.value);
        isInputWeightUpdated = false;
    } else {
        inputWeightVal.value = weight;
    }



    // if weight is less than 10 force it to 10 as minimum weight should be 10kgs.
    if (weight < 10) weight = 10;

    // freight Value
    fr = Math.round(weight * r);

    // overWeight calculations

    // if over overweight is updated by user [ i recommend not touching this bit]
    if (isOverWeightUpdated) {
        overWeight = parseFloat(overWeightVal.value);
        isOverWeightUpdated = false;
    } else {
        if (weight <= 32) overWeight = 0;
        else if (weight <= 70) overWeight = 0;
        else if (weight <= 200) overWeight = 150;
        else if (weight <= 700) overWeight = 1200;
    }
    overWeightVal.value = overWeight;

    if (isRasUpdated) {
        RAS = Math.round(parseFloat(RASVal.value));
        isRasUpdated = false;
    } else {
        RAS = 2 * weight;
        RASVal.value = RAS;
    }

    // Calculate Fuel Price
    fuelPrice = Math.round(27 / 100.0 * (fr + overWeight + RAS));

    // constant DOC
    DOC = 50;

    // PointIncVal = Automatic Insurance i.e., (0.1% * invoice)
    let pointInvVal = Math.round(0.1 / 100 * inv);
    // The final inusrance should be minimum 50
    if (pointInvVal > 50) ins = pointInvVal;
    else ins = 50;

    taxAmt = fr + overWeight + RAS + fuelPrice + DOC + ins + ODACharge;

    gst = Math.round(18 / 100 * taxAmt);

    total = taxAmt + gst;


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

