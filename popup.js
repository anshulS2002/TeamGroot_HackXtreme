$(document).ready(function() {
	let stopwatch;
	let running = false;
	let seconds = 0;

	function formatTime (seconds) {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${ String(hours).padStart(2, '0') }:${ String(minutes).padStart(2, '0') }:${ String(secs).padStart(2, '0') }`;
	}

	function updateStopwatchDisplay () {
		$('#stopwatch-display').text(formatTime(seconds));
	}

	function startStopwatch () {
		stopwatch = setInterval(function() {
			seconds++;
			updateStopwatchDisplay();
		}, 1000);
		$('#start-stop').text('Stop');
		running = true;
	}

	$('#start-stop').on('click', function() {
		if (running) {
			clearInterval(stopwatch);
			$(this).text('Start');
		} else {
			startStopwatch();
		}
		running = !running;
	});

	$('#reset').on('click', function() {
		clearInterval(stopwatch);
		seconds = 0;
		updateStopwatchDisplay();
		$('#start-stop').text('Start');
		running = false;
	});
	startStopwatch();

	// News
	const newsPara = document.getElementById("news_para");
	if (newsPara) {
		fetch("https://newsapi.org/v2/everything?q=gaming&from=2023-09-05&sortBy=publishedAt&apiKey=83bc4c8c56c6467a90ec6900dd94a637")
			.then((response) => response.json())
			.then((newsData) => {
				console.log(newsData);
				const articles = newsData?.articles;
				console.log(articles)
				if (articles && articles.length > 0) {
					const latestArticle = articles[0];
					const newsTitle = latestArticle?.title;
					const newsURL = latestArticle?.url;
					console.log(latestArticle);
					if (newsPara) {
						newsPara.innerHTML = `<a href="${ newsURL }" target="_blank">${ newsTitle }</a>`;
					}
				} else {
					newsPara.innerHTML = "No gaming news available at the moment. Check back later for updates.";
					console.error('No articles found')
				}
			})
			.catch((error) => {
				console.error("Error fetching news data:", error);
				if (newsPara) {
					newsPara.innerHTML = "Error fetching news data. Please try again later.";
				}
			});
	}
});