
function exportAsPDF() {
    const doc = new window.jspdf.jsPDF({
        unit: "pt",
        orientation: "p",
        lineHeight: 1.3
    });

    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text("Blue Dart Freight", 20, 50);
    doc.line(10, 58, 585, 58);
    doc.setFont(undefined, 'normal');

    doc.setFontSize(14);
    doc.autoTable({
        startY: 100,
        body: getRows(),
        styles: {
            lineColor: [0, 0, 0],
            lineWidth: 0.2,
        },
        bodyStyles: {
            fillColor: [255, 255, 255],
            textColor: 0,
        },
        alternateRowStyles: {
            fillColor: [255, 255, 255],
        },
        columnStyles: {
            0: {
                fontStyle: 'bold',
            }
        },

        didDrawPage: function (data) {
        }
    });


    doc.setFontSize(12);
    doc.text(`Rupees ${getWord(total)} only.`, 20, 450)

    let currentDateAndTime = new Date();
    let out = `${currentDateAndTime.getDate()}-${currentDateAndTime.getMonth()+1}-${currentDateAndTime.getFullYear()} | ${currentDateAndTime.getHours()}:${currentDateAndTime.getMinutes()}:${currentDateAndTime.getSeconds()}`;

    doc.line(10, 470, 585, 470);
    doc.text(out, 20, 481);

    doc.save();
}

function getRows() {
    let rows = []

    rows.push(["Weight (kg)", weight]);
    rows.push(["Invoice Value", inv]);
    rows.push([`Dimension (l*w*h)`, `${l}*${w}*${h}`]);
    rows.push(["No. of Pkt", pktVal.value]);
    rows.push(["Freight", fr]);
    rows.push(["Over Weight", `${overWeight}`]);
    rows.push(["RAS Value", RAS]);
    rows.push(["Fuel Price", fuelPrice]);
    rows.push(["DOC", DOC]);
    rows.push(["Insurance", ins]);
    rows.push(["ODA", ODACharge]);
    rows.push(["Taxable Amount", taxAmt]);
    rows.push(["GST", gst]);
    rows.push(["TOTAL PAYABLE AMOUNT", total]);
    return rows;
}


const exportBtn = document.getElementById("genPDFbtn");
exportBtn.addEventListener('click', exportAsPDF);