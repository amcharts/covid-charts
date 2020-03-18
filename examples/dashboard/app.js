/**
 * ---------------------------------------
 * This demo was created using amCharts 4.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v4/
 * ---------------------------------------
 */

// Themes begin
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_dark);
// Themes end

am4core.ready(function() {

	// function that returns current slide
	// if index is not set, get last slide
	function getSlideData(index) {
		if (index == undefined) {
			index = covid_world_timeline.length - 1;
		}

		var data = covid_world_timeline[index];

		// augment with names
		for(var i = 0; i < data.list.length; i++) {
			data.list[i].name = idToName(data.list[i].id);
		}
		return data;
	}

	function idToName(id) {
		return am4geodata_data_countries2[id] ? am4geodata_data_countries2[id].country : id;
	}

	// main container
	var container = am4core.create("chartdiv", am4core.Container);
	container.width = am4core.percent(100);
	container.height = am4core.percent(100);

	// you can adjust layout
	//container.layout = "vertical";

	// Create map instance
	var mapChart = container.createChild(am4maps.MapChart);
	mapChart.height = am4core.percent(80);

	var title = mapChart.titles.create();
	title.text = "[bold font-size: 20]Coronavirus map[/]";
	title.textAlign = "middle";

	var toolsContainer = container.createChild(am4core.Container);
	toolsContainer.layout = "vertical";
	toolsContainer.height = am4core.percent(30);
	toolsContainer.width = am4core.percent(100);
	toolsContainer.valign = "bottom";

	var slideData = getSlideData();
	var mapData = slideData.list;

	// Set map definition
	mapChart.geodata = am4geodata_worldLow;

	// Set projection
	mapChart.projection = new am4maps.projections.Miller();
	mapChart.panBehavior = "rotateLongLat";

	mapChart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.05;
	mapChart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#ffffff");
	mapChart.backgroundSeries.hidden = true;

	// Create map polygon series
	var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries());
	polygonSeries.exclude = ["AQ"];
	polygonSeries.useGeodata = true;
	polygonSeries.nonScalingStroke = true;
	polygonSeries.strokeWidth = 0.5;
	polygonSeries.calculateVisualCenter = true;


	var polygonTemplate = polygonSeries.mapPolygons.template;
	polygonTemplate.polygon.fill = am4core.color("#363439");
	polygonTemplate.polygon.stroke = am4core.color("#454545");

	var hs = polygonTemplate.polygon.states.create("hover")
	hs.properties.fill = am4core.color("#4d535e")

	var imageSeries = mapChart.series.push(new am4maps.MapImageSeries());
	imageSeries.data = mapData;
	imageSeries.dataFields.value = "confirmed";

	var imageTemplate = imageSeries.mapImages.template;
	imageTemplate.nonScaling = true

	var circle = imageTemplate.createChild(am4core.Circle);
	circle.fillOpacity = 0.7;
	circle.fill = am4core.color("#b31410");
	circle.tooltipText = "{name}: [bold]{value}[/]";


	imageSeries.heatRules.push({
		"target": circle,
		"property": "radius",
		"min": 4,
		"max": 30,
		"dataField": "value"
	})

	imageTemplate.adapter.add("latitude", function(latitude, target) {
		var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
		if (polygon) {
			return polygon.visualLatitude;
		}
		return latitude;
	})

	imageTemplate.adapter.add("longitude", function(longitude, target) {
		var polygon = polygonSeries.getPolygonById(target.dataItem.dataContext.id);
		if (polygon) {
			return polygon.visualLongitude;
		}
		return longitude;
	})

	var sliderContainer = toolsContainer.createChild(am4core.Container);

	sliderContainer.width = am4core.percent(100);
	sliderContainer.padding(0, 30, 15, 30);
	sliderContainer.layout = "horizontal";


	var playButton = sliderContainer.createChild(am4core.PlayButton);
	playButton.valign = "middle";
	playButton.events.on("toggled", function(event) {
		if (event.target.isActive) {
			//play();
		}
		else {
			//stop();
		}
	})

	var slider = sliderContainer.createChild(am4core.Slider);
	slider.valign = "middle";
	slider.margin(0, 0, 0, 0);
	slider.background.opacity = 0.3;
	slider.opacity = 0.7;
	slider.background.fill = am4core.color("#ffffff");
	slider.marginLeft = 30;
	slider.height = 15;
	slider.width = am4core.percent(100);

	var casesChart = toolsContainer.createChild(am4charts.XYChart);
	casesChart.data = covid_total_timeline;
	casesChart.leftAxesContainer.layout = "vertical"
	casesChart.valign = "bottom"


	var dateAxis = casesChart.xAxes.push(new am4charts.DateAxis());


	casesChart.cursor = new am4charts.XYCursor();
	casesChart.cursor.xAxis = dateAxis;
	casesChart.cursor.fullWidthLineX = true;
	casesChart.cursor.lineX.strokeOpacity = 0;
	casesChart.cursor.lineX.fillOpacity = 0.1;
	casesChart.cursor.lineX.fill = am4core.color("#ffffff")
	casesChart.legend = new am4charts.Legend();
	casesChart.legend.parent = casesChart.plotContainer;

	var valueAxis = casesChart.yAxes.push(new am4charts.ValueAxis());
	//valueAxis.marginBottom = 30;

	//var deathAxis = casesChart.yAxes.push(new am4charts.ValueAxis());

	var casesSeries = casesChart.series.push(new am4charts.LineSeries())
	casesSeries.dataFields.valueY = "confirmed";
	casesSeries.dataFields.dateX = "date";
	casesSeries.name = "Confirmed";

	var casesBullet = casesSeries.bullets.push(new am4charts.CircleBullet());
	casesBullet.circle.radius = 3;

	var recoveredSeries = casesChart.series.push(new am4charts.LineSeries())
	recoveredSeries.dataFields.valueY = "recovered";
	recoveredSeries.dataFields.dateX = "date";
	recoveredSeries.name = "Recovered";

	var recoveredBullet = recoveredSeries.bullets.push(new am4charts.CircleBullet());
	recoveredBullet.circle.radius = 3;


	var deathSeries = casesChart.series.push(new am4charts.ColumnSeries())
	deathSeries.dataFields.valueY = "deaths";
	deathSeries.dataFields.dateX = "date";
	//deathSeries.yAxis = deathAxis;
	deathSeries.name = "Deaths";

	var totalLabel = container.createChild(am4core.Label)
	totalLabel.isMeasured = false;
	totalLabel.text = "Total: 201 012";
	totalLabel.fontSize = 30;
	totalLabel.x = am4core.percent(25);
	totalLabel.horizontalCenter = "middle"
	totalLabel.y = 50;

	var recoveredLabel = container.createChild(am4core.Label)
	recoveredLabel.isMeasured = false;
	recoveredLabel.text = "Recovered: 99 012";
	recoveredLabel.fontSize = 30;
	recoveredLabel.x = am4core.percent(50);
	recoveredLabel.horizontalCenter = "middle"
	recoveredLabel.y = 50;


	var deathsLabel = container.createChild(am4core.Label)
	deathsLabel.isMeasured = false;
	deathsLabel.text = "Deaths: 9 012";
	deathsLabel.fontSize = 30;
	deathsLabel.horizontalCenter = "middle"
	deathsLabel.x = am4core.percent(75);
	deathsLabel.y = 50;


	var button = mapChart.createChild(am4core.Button);
	button.align = "right";
	button.marginTop = 40;
	button.marginRight = 40;
	button.valign = "top";
	button.label.text = "Show Globe";

	button.events.on("hit", function() {
		if (button.label.text == "Show Globe") {
			button.label.text = "Show Map";
			mapChart.projection = new am4maps.projections.Orthographic;
			mapChart.backgroundSeries.show();
			polygonSeries.exclude = [];
		}
		else {
			button.label.text = "Show Globe";
			mapChart.projection = new am4maps.projections.Miller;
			mapChart.backgroundSeries.hide();
			polygonSeries.data = [];
			polygonSeries.exclude = ["AQ"];
		}
	})

});