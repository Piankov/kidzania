var TicketsPage = require('../page-models/tickets');
var should = require('should');

describe('Check clicking dates', function(){
	this.timeout(15000);

	browser.addCommand("getTotalDate", function() {
		return this.waitForExist(TicketsPage.dateTotals)
				.element(TicketsPage.dateTotals)
					.then(function(result) {
						return browser.elementIdText(result.value.ELEMENT);
					})
						//Why I can't just add .value to previous string?
						.then(function(result){
							return result.value;
						});
	});
	
	it('should appear totals', function () {

		var month;
		var date;
		var number;
		return browser.url('https://kidzania.ru/ru/tickets')
			/* Here I'd like to find all elements witch contain 'high' in 'class' attribute
			.elements('.calendar-item')
				.then(function(result){
					result.value.forEach(function(elem){
						return browser.elementIdAttribute(elem.ELEMENT,'class')
					})					
						.then(function(result){
							console.log('DEBUG:' + result.value);
							return browser;
						})
				})
			Although 'high' is mentioned in selector, I still get non-clickable objects as well
			*/
			.element('.calendar-item.high:nth-Child(3)')
				.then(function(result){
					return browser.elementIdAttribute(result.value.ELEMENT,'data-date-key')
				})
					.then(function(result){
						var tmpDate = result.value;
						date = tmpDate.match(/-(\d\d)$/)[1] + ' ' + TicketsPage.month[parseInt(tmpDate.match(/-(\d\d)-/)[1])-1];
						return browser;
					})
			.click('.calendar-item.high:nth-Child(3)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})
})
