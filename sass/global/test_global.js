casper.start('http://localhost:9001/styleguide/');

casper.thenOpen('http://localhost:9001/styleguide/global_-_typography.html').
	then(function() {
		phantomcss.screenshot('#test-typography', 'typography');
	});
