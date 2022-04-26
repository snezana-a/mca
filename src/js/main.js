let string;

var getJSON = function(url, callback) {

    var xmlhttprequest = new XMLHttpRequest();
    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

getJSON('https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1',  function(err, data) {

    if (err != null) {
        console.error(err);
    } else {
        string = data;
        string.sort(function(a, b){
            return a.name.localeCompare(b.name);
        });
        printReceipt();
    }
});

function printReceipt() {
    let domestic = ". Domestic\n";
    let imported = ". Imported\n";
    var weight;
    var costDomestic = 0, costImported = 0, countDomestic = 0, countImported = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i].weight == undefined) {
            weight = "N/A";
        } else {
            weight = string[i].weight+"g";
        }
        if (string[i].domestic == true) {
            countDomestic++;
            domestic += `... ${string[i].name}\n\tPrice: $${string[i].price.toFixed(1)}\n\t${string[i].description.substring(0,10)}...\n\tWeight: ${weight}\n`;
            costDomestic += string[i].price;
        } else {
            countImported++;
            imported += `... ${string[i].name}\n\tPrice: $${string[i].price.toFixed(1)}\n\t${string[i].description.substring(0,10)}...\n\tWeight: ${weight}\n`;
            costImported += string[i].price;
        }
    }
    
    receipt = `${domestic} ${imported}Domestic cost: $${costDomestic.toFixed(1)}\nImported cost: $${costImported.toFixed(1)}\nDomestic count: ${countDomestic}\nImported count: ${countImported}`

    console.log(receipt);
}