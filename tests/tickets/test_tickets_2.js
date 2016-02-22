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
					.then(function(result){
						console.log('Date:\t' + result.value);
						return result.value;
					});
	});
	
	it('should appear totals', function () {

		var month;
		var day;
		return browser.url('https://kidzania.ru/ru/tickets')
			//.waitForExist('.calendar-scroll-left')
			.element('.calendar-scroll-left')
				.then(function(result){
					return browser.elementIdText(result.value.ELEMENT);
				})
					.then(function(result){
						month = result.value;
						return browser;
					})
			.element('.calendar-item.high:nth-Child(3)')
				.then(function(result){
					return browser.elementIdText(result.value.ELEMENT);
				})
					.then(function(result){
						day = result.value;
						return browser;
					})
			.click('.calendar-item.high:nth-Child(3)')
				.then(function(result){
					console.log('MONTH' + month);
					console.log('GAY' + day);
				})
			.getTotalDate()
				.then(function(result){
					console.log(result);
				});
	})
})
