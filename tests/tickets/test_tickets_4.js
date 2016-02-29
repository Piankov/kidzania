var TicketsPage = require('../page-models/tickets');
var should = require('should');
var Promise = require('bluebird');

describe('Check clicking dates', function(){
	this.timeout(15000);

	

	beforeEach(function(){
    		browser.localStorage('DELETE');
    });
	

	it('should appear totals', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Check futter appeared, date and slot are correct
		// Check adult message is shown
		// Close adult message
		// Check one 2-3 and one adult are added
		//this.skip();
		var date;
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.getElementDate('.calendar-item.high:nth-Child(6)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(6)')
			.scroll('.tickets-slots__item.high')			
			.click('.tickets-slots__item.high:nth-Child(1)')
			.scroll('.ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.waitForVisible('.tickets-adult-hint')
			.click('.tickets-adult-hint__close')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				})
			.getElementSlot('.tickets-slots__item.high:nth-Child(1)')
				.then(function(result){
					slot = result;
				})
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				})
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date)
				})
			.waitForExist('.icon-child-carriage')
			.waitForExist('.tickets-product__icon')
			.waitForExist('.tickets-product__quantity', 500, true)
	})

	it('should add and remove correctly', function () {
		// Click on any date
		// Click on any slot
		// Click on ticket card 2-3 years
		// Click on ticket card 4-14 years
		// Click add 2-3
		// Check "added 2" near button and 2x in totals for 2-3
		// Repeat for 4-14
		// Repeat for adult

		//this.skip();
		this.timeout(60000);
		var date;
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(6)')
			.scroll('.tickets-slots__item.high')			
			.click('.tickets-slots__item.high:nth-Child(1)')
			.scroll('.ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.waitForVisible('.tickets-adult-hint')
			.click('.tickets-adult-hint__close')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([1, 1, 1]);
				})			
			.click(TicketsPage.teen + ' .ticket_card_button')
			.click(TicketsPage.teen + ' .ticket_card_button')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([1, 3, 1]);
				})
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.click(TicketsPage.carriage + ' .ticket_card_button')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([5, 3, 1]);
				})
			.scroll(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.click(TicketsPage.adult + ' .ticket_card_button')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([5, 3, 4]);
				})
			.click(TicketsPage.adult + ' .ticket_card_button--simple')
			.click(TicketsPage.adult + ' .ticket_card_button--simple')
			.click(TicketsPage.adult + ' .ticket_card_button--simple')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([5, 3, 1]);
				})
			.click(TicketsPage.teen + ' .ticket_card_button--simple')
			.click(TicketsPage.teen + ' .ticket_card_button--simple')
			.click(TicketsPage.teen + ' .ticket_card_button--simple')
			.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([5, 0, 1]);
				})
			.clickX('.icon-child-carriage')
	       	.getTicketsNumbers()
				.then(function(result){
					result.should.be.eql([0, 0, 1]);
				});
			
	})
	

})
