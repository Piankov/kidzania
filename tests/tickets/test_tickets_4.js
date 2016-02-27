var TicketsPage = require('../page-models/tickets');
var should = require('should');

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
			.click('.tickets-action-groups-cell[data-reactid=".0.0.0.2.1.$group-0"] .tickets_group-list_item[data-reactid=".0.0.0.2.1.$group-0.0.1.$1"] .ticket_card_button')
			.waitForVisible('.tickets-adult-hint')
			.click('.tickets-adult-hint__close')
			.getElementSlot('.tickets-slots__item.high:nth-Child(1)')
				.then(function(result){
					slot = result;
				})
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});


	})
	

})
