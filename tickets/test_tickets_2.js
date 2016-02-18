var TicketsPage = require('./page-models/tickets');
var assert = require('assert') 
var webdriverio = require('webdriverio');

var steps = [
	"Discription:\tClick differen dates",
    "1. Open 'Билеты' page (Russian) (https://kidzania.ru/ru/tickets/)",
	"2. Click on the first (grey) date in calendar",
	"3. Check nothing have changed",
	"4. Click on any available date",
	"5. Check correct date appeared in footer",
	"6. Click X",
	"7. Check footer has disappeared",
	"8. Click on any profilaxy date",
	"9. Check nothing have changed",
	"10. Click on any available date",
	"11. Check correct date appeared in footer",
	"12. Click on any other available date",
	"13. Check date in footer have changed correctly" 
]

var options = {
    desiredCapabilities: {
        browserName: 'chrome'
    }
};

console.log(steps[0]);
 
var client = webdriverio
    .remote(options)
	.init();
	
console.log(steps[1]);
	
var language = "ru/"
var currentURL = TicketsPage.mainURL+language+'tickets/'
client.url(currentURL)
		.then(function(result){
			console.log(steps[2]);
			console.log(steps[3]);
		})	
	.elements(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(0)')
		.then(function(result){
			//Check it's not  link
			console.log(result);
			console.log(steps[4]);
		})	
	.click(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(1)')
	.waitForVisible(TicketsPage.totals, 3000)		
	.element(TicketsPage.dateTotals)
		.then(function(result){
			console.log(steps[5]);
			//Check date appeared
			console.log(result);
			console.log(steps[6]);
		})
	.click(TicketsPage.closeDateTotals)
	.isVisible(TicketsPage.dateTotals)
		.then(function(result){
			console.log(steps[7])
			assert.equal(result, false, 'FAIL');
			console.log('DEBUG: isVisible='+result);
			console.log(steps[8])
		})		
	.end();
