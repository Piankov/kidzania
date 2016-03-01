var TicketsPage = require('../page-models/tickets');
var should = require('should');
var Promise = require('bluebird');

describe('Check clicking slots', function(){
	this.timeout(15000);

	beforeEach(function(){
    		browser.localStorage('DELETE');
    });

	it('should appear totals', function () {
		// Click on any date
		// Click on any slot
		// Check futter appeared and slot is correct
		//this.skip();
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(6)')
			.scroll('.tickets-slots__item.high')
			.getElementSlot('.tickets-slots__item.high:nth-Child(2)')
				.then(function(result){
					slot = result;
				})
			.click('.tickets-slots__item.high:nth-Child(2)')
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});
	})

	it('should change slot in totals', function () {
		// Click on any date
		// Click on any slot
		// Click on any other slot
		// Check slot in footer has changed
		//this.skip();
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(11)')
			.scroll('.tickets-slots__item.high')
			.getElementSlot('.tickets-slots__item.high:nth-Child(6)')
				.then(function(result){
					slot = result;
				})
			.click('.tickets-slots__item.high:nth-Child(1)')
			.click('.tickets-slots__item.high:nth-Child(6)')
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});
	})

	it('should save slot when date is canceled', function () {
		// Click on any date
		// Click on any slot
		// Click on X near the date in footer
		// Check "Выберите дату" appeared (RU) and slot hasn't been changed
		// Click on any date (which contains this slot)
		// Date appeared and slot hasn't been changed
		//this.skip();
		var slot;
		var date;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(9)')
			.scroll('.tickets-slots__item.high')
			.getElementSlot('.tickets-slots__item.high:nth-Child(2)')
				.then(function(result){
					slot = result;
				})
			.click('.tickets-slots__item.high:nth-Child(2)')
			.click('.tickets-date__close')
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				})
			.element('.tickets-dateslot-group .tickets-totals__blank')
				.then(function(result) {
						return browser.elementIdText(result.value.ELEMENT);
					})
						.then(function(result){
							result.value.should.be.equal(TicketsPage.txtChooseDate());
						})
			.getElementDate('.calendar-item.high:nth-Child(11)')
				.then(function(result){
					date = result;
				})
			.click('.calendar-item.high:nth-Child(11)')
			.getTotalDate()
				.then(function(result){
					result.should.be.equal(date);
				})
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});
	})

	it('should change slot 17-21 to 16-20 when date is changed', function () {
		// Click on first date containing 17-21 slot
		// Click on 17-21 slot
		// Click on first date not containing 17-21 slot (16-20 is available)
		// Check "Выберите дату" appeared (RU) and slot hasn't been changed
		// Click on any date (which contains this slot)
		// Date appeared and slot hasn't been changed
		//this.skip();
		this.timeout(150000);
		var slot;
		var first8 = true;
		var finish = false
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.scroll('.tickets-slots__item.high')
			.elements('.calendar-item.high', function(err, res){
           		return Promise.each(res.value, function (elem, index) {    
    				if (!finish){
	    				return new Promise(function (resolve) {
	       					browser.elementIdClick(elem.ELEMENT)
	       						.elements('.tickets-slots__item', function(err, res){
			          				if ((res.value.length == 8) && (first8)){
			          					first8 = false;
			          					browser.elementIdClick(res.value[7].ELEMENT);
			          				}
			          				if ((res.value.length == 7) && (!first8)){
			          					finish = true;
			          				}
			          				resolve();
	       					});
	    				});
	    			}
				});
        	})
        	.getElementSlot('.tickets-slots__item.high:nth-Child(7)')
				.then(function(result){
					slot = result;
				})
        	.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});

    })

    it('should remove slot after clicking X', function () {
		// Click on any date
		// Click on any slot
		// Click on X
		// Check slot in footer disappeared
		// Click on any other slot
		// Check slot in footer has changed
		//this.skip();
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(11)')
			.scroll('.tickets-slots__item.high')
			.click('.tickets-slots__item.high:nth-Child(4)')
			.click('.tickets-slot__close')
			.element('.tickets-dateslot-group .tickets-totals__blank')
				.then(function(result) {
						return browser.elementIdText(result.value.ELEMENT);
					})
						.then(function(result){
							result.value.should.be.equal(TicketsPage.txtChooseSlot());
						})
			.getElementSlot('.tickets-slots__item.high:nth-Child(3)')
				.then(function(result){
					slot = result;
				})
			.click('.tickets-slots__item.high:nth-Child(3)')
			.getTotalSlot()
				.then(function(result){
					result.should.be.equal(slot);
				});
	})

})
