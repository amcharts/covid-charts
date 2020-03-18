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

	var backgroundColor = am4core.color("#1e2128");
	var confirmedColor = am4core.color("#ff0000");
	var recoveredColor = am4core.color("#00ff00");
	var deathsColor = am4core.color("#000000");

	var buttonStrokeColor = am4core.color("#ffffff");

	// function that returns current slide
	// if index is not set, get last slide
	function getSlideData(index) {
		if (index == undefined) {
			index = covid_world_timeline.length - 1;
		}

		var data = covid_world_timeline[index];

		// augment with names
		for (var i = 0; i < data.list.length; i++) {
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
	title.fontSize = "1.4em";
	title.y = 20;
	title.text = "COVID-19 Map, World data";
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
	imageTemplate.nonScaling = true;

	// in order items with 0 value to be hidden
	imageTemplate.adapter.add("opacity", function(opacity, target) {
		if (target.dataItem.value == 0) {
			return 0;
		}
		return opacity;
	})

	var circle = imageTemplate.createChild(am4core.Circle);
	circle.fillOpacity = 0.5;
	circle.fill = am4core.color("#b31410");
	circle.tooltipText = "{name}: [bold]{value}[/]";


	imageSeries.heatRules.push({
		"target": circle,
		"property": "radius",
		"min": 3,
		"max": 40,
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
		} else {
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
	casesChart.maskBullets = false;

	var dateAxis = casesChart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.stroke = am4core.color("#000000");


	casesChart.cursor = new am4charts.XYCursor();
	casesChart.cursor.behavior = "none";
	casesChart.cursor.xAxis = dateAxis;
	casesChart.cursor.fullWidthLineX = true;
	casesChart.cursor.lineX.strokeOpacity = 0;
	casesChart.cursor.lineX.fillOpacity = 0.1;
	casesChart.cursor.lineX.fill = am4core.color("#ffffff")
	casesChart.legend = new am4charts.Legend();
	casesChart.legend.parent = casesChart.plotContainer;
	casesChart.fontSize = "0.8em";

	var valueAxis = casesChart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
	valueAxis.renderer.baseGrid.disabled = true;

	var recoveredSeries = casesChart.series.push(new am4charts.LineSeries())
	recoveredSeries.dataFields.valueY = "recovered";
	recoveredSeries.dataFields.dateX = "date";
	recoveredSeries.name = "Recovered";
	recoveredSeries.strokeOpacity = 0.5;
	recoveredSeries.stroke = recoveredColor;
	recoveredSeries.maskBullets = false;
	recoveredSeries.hidden = true;


	var confirmedSeries = casesChart.series.push(new am4charts.LineSeries())
	confirmedSeries.dataFields.valueY = "confirmed";
	confirmedSeries.dataFields.dateX = "date";
	confirmedSeries.stroke = confirmedColor;
	confirmedSeries.strokeOpacity = 0.5;
	confirmedSeries.fill = confirmedSeries.stroke;
	confirmedSeries.name = "Confirmed";
	confirmedSeries.maskBullets = false;

	var casesBullet = confirmedSeries.bullets.push(new am4charts.CircleBullet());
	casesBullet.circle.fillOpacity = 1;
	casesBullet.circle.fill = backgroundColor;
	casesBullet.circle.radius = 3;

	var deathSeries = casesChart.series.push(new am4charts.LineSeries())
	deathSeries.maskBullets = false;
	deathSeries.dataFields.valueY = "deaths";
	deathSeries.dataFields.dateX = "date";
	deathSeries.fill = deathsColor;
	deathSeries.stroke = deathsColor;
	deathSeries.name = "Deaths";
	deathSeries.hidden = true;

	var deathsBullet = deathSeries.bullets.push(new am4charts.CircleBullet());
	deathsBullet.circle.fillOpacity = 1;
	deathsBullet.circle.fill = backgroundColor;
	deathsBullet.circle.radius = 3;

	var recoveredBullet = recoveredSeries.bullets.push(new am4charts.CircleBullet());
	recoveredBullet.circle.radius = 3;
	recoveredBullet.circle.fill = backgroundColor;





	// buttons


	// confirmed button
	var confirmedButton = container.createChild(am4core.Button)
	confirmedButton.isMeasured = false;
	confirmedButton.label.text = "Confirmed: 201 012";
	confirmedButton.label.valign = "middle"
	confirmedButton.fontSize = "1.3em";
	confirmedButton.x = am4core.percent(50);
	confirmedButton.horizontalCenter = "middle"
	confirmedButton.y = 70;
	confirmedButton.background.cornerRadius(30, 30, 30, 30);
	confirmedButton.background.strokeOpacity = 0.3
	confirmedButton.background.fillOpacity = 0;
	confirmedButton.background.stroke = buttonStrokeColor;
	confirmedButton.states.create("active");
	confirmedButton.setStateOnChildren = true;

	var confirmedActiveHoverState = confirmedButton.background.states.create("hoverActive");
	confirmedActiveHoverState.properties.fillOpacity = 0;

	var confirmedCircle = new am4core.Circle();
	confirmedCircle.radius = 10;
	confirmedCircle.fillOpacity = 0.3;
	confirmedCircle.fill = buttonStrokeColor;
	confirmedCircle.strokeOpacity = 0;
	confirmedCircle.valign = "middle";
	confirmedCircle.marginRight = 10;

	var confirmedActiveState = confirmedCircle.states.create("active");
	confirmedActiveState.properties.fill = confirmedColor;
	confirmedActiveState.properties.fillOpacity = 0.5;

	confirmedButton.icon = confirmedCircle;
	confirmedButton.isActive = true;

	confirmedButton.events.on("hit", function(event) {
		imageSeries.dataFields.value = "confirmed";
		imageSeries.invalidateData();
		imageSeries.mapImages.template.children.getIndex(0).fill = confirmedColor;
		confirmedButton.isActive = true;
		recoveredButton.isActive = false;
		confirmedSeries.show();
		recoveredSeries.hide();
		deathSeries.hide();
	})

	// recovered button
	var recoveredButton = container.createChild(am4core.Button)
	recoveredButton.isMeasured = false;
	recoveredButton.label.text = "Recovered: 201 012";
	recoveredButton.label.valign = "middle"
	recoveredButton.fontSize = "1.3em";
	recoveredButton.x = am4core.percent(25);
	recoveredButton.horizontalCenter = "middle"
	recoveredButton.y = 70;
	recoveredButton.background.cornerRadius(30, 30, 30, 30);
	recoveredButton.background.strokeOpacity = 0.3
	recoveredButton.background.fillOpacity = 0;
	recoveredButton.background.stroke = buttonStrokeColor;
	recoveredButton.states.create("active");
	recoveredButton.setStateOnChildren = true;

	var recoveredActiveHoverState = recoveredButton.background.states.create("hoverActive");
	recoveredActiveHoverState.properties.fillOpacity = 0;

	var recoveredCircle = new am4core.Circle();
	recoveredCircle.radius = 10;
	recoveredCircle.fillOpacity = 0.2;
	recoveredCircle.fill = buttonStrokeColor;
	recoveredCircle.strokeOpacity = 0;
	recoveredCircle.valign = "middle";
	recoveredCircle.marginRight = 10;

	var recoveredActiveState = recoveredCircle.states.create("active");
	recoveredActiveState.properties.fill = recoveredColor;
	recoveredActiveState.properties.fillOpacity = 0.5;

	recoveredButton.icon = recoveredCircle;
	recoveredButton.isActive = false;

	recoveredButton.events.on("hit", function(event) {
		imageSeries.dataFields.value = "recovered";
		imageSeries.invalidateData();
		imageSeries.mapImages.template.children.getIndex(0).fill = recoveredColor;
		recoveredButton.isActive = true;
		confirmedButton.isActive = false;
		recoveredSeries.show();
		confirmedSeries.hide();
		deathSeries.hide();		
	})

	// deaths button
	var deathsButton = container.createChild(am4core.Button)
	deathsButton.isMeasured = false;
	deathsButton.label.text = "Deaths: 8 012";
	deathsButton.label.valign = "middle"
	deathsButton.fontSize = "1.3em";
	deathsButton.x = am4core.percent(75);
	deathsButton.horizontalCenter = "middle"
	deathsButton.y = 70;
	deathsButton.background.cornerRadius(30, 30, 30, 30);
	deathsButton.background.strokeOpacity = 0.3
	deathsButton.background.fillOpacity = 0;
	deathsButton.background.stroke = buttonStrokeColor;
	deathsButton.states.create("active");
	deathsButton.setStateOnChildren = true;

	var deathsActiveHoverState = deathsButton.background.states.create("hoverActive");
	deathsActiveHoverState.properties.fillOpacity = 0;

	var deathsCircle = new am4core.Circle();
	deathsCircle.radius = 10;
	deathsCircle.fillOpacity = 0.3;
	deathsCircle.fill = buttonStrokeColor;
	deathsCircle.strokeOpacity = 0;
	deathsCircle.valign = "middle";
	deathsCircle.marginRight = 10;

	var deathsActiveState = deathsCircle.states.create("active");
	deathsActiveState.properties.fill = deathsColor;
	deathsActiveState.properties.fillOpacity = 0.5;

	deathsButton.icon = deathsCircle;
	deathsButton.isActive = false;

	deathsButton.events.on("hit", function(event) {
		imageSeries.dataFields.value = "deaths";
		imageSeries.invalidateData();
		imageSeries.mapImages.template.children.getIndex(0).fill = deathsColor;
		deathsButton.isActive = true;
		confirmedButton.isActive = false;
		deathSeries.show();
		recoveredSeries.hide();
		confirmedSeries.hide();		
	})

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
		} else {
			button.label.text = "Show Globe";
			mapChart.projection = new am4maps.projections.Miller;
			mapChart.backgroundSeries.hide();
			polygonSeries.data = [];
			polygonSeries.exclude = ["AQ"];
		}
	})

	/**
	 * Country/state list
	 */

	function populateCountries(list) {
		var table = $("#areas tbody");
		table.find(".area").remove();
		for (var i = 0; i < list.length; i++) {
			var area = list[i];
			var tr = $("<tr>").addClass("area").data("areaid", area.id).appendTo(table);
			var cb = $("<input type='checkbox'>").addClass("area-selector").data("areaid", area.id).on("change", updateSelection);
			$("<td>").appendTo(tr).append(cb);
			$("<td>").appendTo(tr).data("areaid", area.id).html(area.name).on("click", function() {
				highlighArea($(this).data("areaid"));
			});
			$("<td>").addClass("value").appendTo(tr).html(area.confirmed);
			$("<td>").addClass("value").appendTo(tr).html(area.deaths);
			$("<td>").addClass("value").appendTo(tr).html(area.recovered);

		}
		$("#areas").DataTable({
			"paging": false,
			"columnDefs": [{
				"targets": 0,
				"orderable": false
			}]
		}).column("2")
			.order("desc")
			.draw();;
	}

	populateCountries(slideData.list);

	function highlighArea(id) {
		mapChart.zoomToMapObject(polygonSeries.getPolygonById(id));
	}

	function updateSelection() {
		var selected = [];
		$(".area-selector:checked").each(function() {
			selected.push($(this).data("areaid"));
		});
		console.log(selected);
	}


});