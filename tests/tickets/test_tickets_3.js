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
	browser.addCommand("getTotalSlot", function() {
		return this.waitForExist(TicketsPage.slotTotals)
				.element(TicketsPage.slotTotals)
					.then(function(result) {
						return browser.elementIdText(result.value.ELEMENT);
					})
						.then(function(result){
							return result.value;
						});
	});
	browser.addCommand("getElementSlot", function(selector) {
		return this.element(selector)
					.then(function(result) {
						return browser.elementIdText(result.value.ELEMENT)
					})
						.then(function(result){
							return result.value;
						});
	});

	it('should appear totals', function () {
		// Click on any date
		// Click on any slot
		// Check futter appeared and slot is correct
		this.skip();
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(7)')
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
		this.skip();
		var slot;
		return browser.url('https://kidzania.ru/' + TicketsPage.langLink() + 'tickets')
			.click('.calendar-item.high:nth-Child(15)')
			.scroll('.tickets-slots__item.high')
			.getElementSlot('.tickets-slots__item.high:nth-Child(4)')
				.then(function(result){
					slot = result;
				})
			.click('.tickets-slots__item.high:nth-Child(1)')
			.click('.tickets-slots__item.high:nth-Child(4)')
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
		this.skip();
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
			.click(TicketsPage.closeDateTotals)
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


})
