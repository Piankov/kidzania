browser.addCommand("getUrlAndTitle", function() {
		return { url: "AAA", title: "BBB" };
	})
browser.url('https://kidzania.ru/ru/about')
			.getUrlAndTitle();
