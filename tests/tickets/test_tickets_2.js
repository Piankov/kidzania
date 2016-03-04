var TicketsPage = require('../page-models/tickets');
var should = require('should');

describe('Check clicking dates', function(){
	this.timeout(20000);

    beforeEach(function(){
    		browser.localStorage('DELETE');
    });

	it('should appear totals', function () {
		// Click on any date
		// Check futter appeared and date is correct
		//this.skip();
		var date;
		var dateElem;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser.getElementDateByID(result.value[1].ELEMENT)
						.then(function(result){
							date = result;
						})
					.elementIdClick(result.value[1].ELEMENT)
					.getTotalDate()
						.then(function(result){
							result.should.be.equal(date);
						});
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
			.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser.getElementDateByID(result.value[2].ELEMENT)
							.then(function(result){
								date = result;
							})
						.elementIdClick(result.value[5].ELEMENT)
						.getTotalDate()
						.scroll('.calendar-item.high')
						.elementIdClick(result.value[2].ELEMENT)
						.getTotalDate()
							.then(function(result){
								result.should.be.equal(date);
							});
				});
	});

	it('should change date after closing totals and clicking on a new one', function () {
		// Click on any date
		// Check futter appeared 
		// Click on X near date
		// Check futter disappeared
		// Click on any other date
		// Check new date is correct
		//this.skip();
		var date;
		

		return browser
			.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.elements('.calendar-item.high')
				.then(function(result){
					return browser.getElementDateByID(result.value[3].ELEMENT)
							.then(function(result){
								date = result;
							})
							.elementIdClick(result.value[4].ELEMENT)
							.getTotalDate()
							.click('.tickets-date__close')
							.waitForExist('.tickets-date__format', 500, true)
							.elementIdClick(result.value[3].ELEMENT)
							.getTotalDate()
								.then(function(result){
									result.should.be.equal(date);
								});
				});

	})
})
