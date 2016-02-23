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
	browser.addCommand("getElementDate", function(selector) {
		return this.element(selector)
					.then(function(result) {
						return browser.elementIdAttribute(result.value.ELEMENT,'data-date-key')
					})
						.then(function(result){
							return TicketsPage.getFormatedDate(result.value);
						});
	});

	it('should appear totals', function () {
		// Click on any date
		// Check futter appeared and date is correct
		//this.skip();
		var date;
		return browser.url('https://kidzania.ru/ru/tickets')
			/* TODO:
			Here I'd like to find all elements witch contain 'high' in 'class' attribute
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
			.getElementDate('.calendar-item.high:nth-Child(4)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(4)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})

	it('should change date in totals', function () {
		// Click on any date
		// Check futter appeared 
		// Click on any other date
		// Check new date is correct
		//this.skip();
		var date;
		return browser
			//TODO: Make deleteCookie remove footer
			.deleteCookie()
			.url('https://kidzania.ru/ru/tickets')
			.getElementDate('.calendar-item.high:nth-Child(3)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(36)')
			.getTotalDate()
			.scroll('.calendar-item.high')
			.click('.calendar-item.high:nth-Child(3)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})

	it('should change date after closing totals', function () {
		// Click on any date
		// Check futter appeared 
		// Click on X near date
		// Check futter disappeared
		// Click on any other date
		// Check new date is correct
		//this.skip();
		var date;

		
		return browser.url('https://kidzania.ru/ru/tickets')
			.getElementDate('.calendar-item.high:nth-Child(34)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(2)')
			.getTotalDate()
			.click(TicketsPage.closeDateTotals)
			.waitForExist(TicketsPage.dateTotals, 500, true)
			.click('.calendar-item.high:nth-Child(34)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				});

	})
})
