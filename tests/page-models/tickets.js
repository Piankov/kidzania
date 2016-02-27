// Common functions
var assert = require('assert') 

module.exports = {
	getFormatedDate: function(date){
		var day = date.match(/-(\d\d)$/)[1].replace(/^0/,"");
		if (this.language == 0) {
			if ((day == 1)||(day == 21)||(day == 31)) day += 'st';
			if ((day == 2)||(day == 22)) day += 'nd';
			if ((day == 3)||(day == 23)) day += 'rd';
			if (parseInt(day) > 3) day += 'th';
		}
		return day + ' ' + this.month[this.language][parseInt(date.match(/-(\d\d)-/)[1].replace(/^0/,""))-1];
	},
	language: 1, //0 - English, 1 - Russian

	tickets23: '.tickets-action-groups-cell[data-reactid=".0.0.0.2.1.$group-0"] .tickets_group-list_item[data-reactid=".0.0.0.2.1.$group-0.0.1.$1"] .ticket_card_button',
	month: [['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]],
	
	langLink: function(){
		return this.langLinkArray[this.language];
	},
	langLinkArray: ['en/', 'ru/'],
	txtChooseDate: function(){
		return this.txtChooseDateArray[this.language];
	},
	txtChooseDateArray: ['Choose date', 'Выберите дату'],
	txtChooseSlot: function(){
		return this.txtChooseSlotArray[this.language];
	},
	txtChooseSlotArray: ['Choose session', 'Выберите сеанс']


};
