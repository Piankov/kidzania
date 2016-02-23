// Common functions
var assert = require('assert') 

module.exports = {
	getFormatedDate: function(date){
		return date.match(/-(\d\d)$/)[1] + ' ' + this.month[parseInt(date.match(/-(\d\d)-/)[1].replace(/^0/,""))-1]
	},
	languageHeader: ".header__lang",
	logoHeader: ".header__logo",
	calendar: ".calendar-grid",
	dateCalendar: ".calendar-item",
	dateCalendarProf: ".prof",
	totals: ".tickets-totals__fixed",
	dateTotals: ".tickets-date__format",
	closeDateTotals: ".tickets-date__close",
	month: ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
	
};
