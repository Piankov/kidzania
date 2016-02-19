var TicketsPage = require('./page-models/tickets');
var assert = require('assert') 
var webdriverio = require('webdriverio');

var steps = [
	"Discription:\tClick differen dates",
    "1. Open 'Билеты' page (Russian) (https://kidzania.ru/ru/tickets/)",
	"2. If the first date in calendar is grey try to click it",
	"3. Check nothing have changed",
	"4. Click on any available date",
	"5. Check correct date appeared in footer",
	"6. Click X",
	"7. Check footer has disappeared",
	"8. Click on any profilaxy date",
	"9. Check nothing have changed",
	"10. Click on any available holyday date",
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
var currentURL = TicketsPage.mainURL+language+'tickets/';
client.url(currentURL)
		.then(function(result){
			console.log(steps[2]);
			console.log(steps[3]);
		})	
	.elements(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(0)')
		.then(function(result){
			//TODO:Check if it's grey or not
			//TODO: If it's grey - check it's not cleackable
			console.log(steps[4]);
		})
	//TODO: it should be not only .calendar-item but .high as well
	.click(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(1)')
		.then(function(result){
			//TODO: Save date of clicked button
		})
	.waitForVisible(TicketsPage.totals, 3000)		
	.element(TicketsPage.dateTotals)
		.then(function(result){
			console.log(steps[5]);
			//TODO: Check correct date appeared
			console.log(result.value);
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
	.elements(TicketsPage.calendar+ ' *' +TicketsPage.dateCalendarProf)
		.then(function(result){
			/*???: 
			All with class high are cleackable:
				class="calendar-item high"
				class="calendar-item holyday high"
				class="calendar-item first-of-week high"
			
			I'm trying to find all elements with "prof" class:
				class="calendar-item first-of-week none prof"
			
			this works fine:
			.elements(".calendar-grid .calendar-item")
			
			but this doesn't:
			.elements(".calendar-grid .prof")
			*/
			console.log(result.value);
			console.log(steps[9]);
			//TODO: Check all these elements are not a links
			console.log(steps[10]);

		})
	//TODO should click on any date with "holyday" and "high" in class
	.click(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(5)')
		.then(function(result){
				//TODO: Save date of clicked button
		})
	.waitForVisible(TicketsPage.totals, 3000)		
	.element(TicketsPage.dateTotals)
		.then(function(result){
			console.log(steps[11]);
			//TODO: Check correct date appeared
			console.log(result.value);
			console.log(steps[12]);
		})
	//TODO should click on any date with "high" in class
	//??? Why can't click?!
	.click(TicketsPage.calendar + ' ' +TicketsPage.dateCalendar+':nth-Child(1)')
		.then(function(result){
				//TODO: Save date of clicked button
		})
	/*TODO:
	Should be smth like:
	.waitForVisible(TicketsPage.totals, 3000)
	but totals already visible. 
	Probably should just wait for several seconds
	*/
	.element(TicketsPage.dateTotals)
		.then(function(result){
			console.log(steps[11]);
			//TODO: Check correct date appeared
			console.log(result.value);
			console.log(steps[12]);
		})
	
	.end();
