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
	var activeColor = am4core.color("#ff8726");
	var confirmedColor = am4core.color("#d21a1a");
	var recoveredColor = am4core.color("#45d21a");
	var deathsColor = am4core.color("#1a6cd2");

	var buttonStrokeColor = am4core.color("#ffffff");
	var currentIndex;

	var countryIndexMap = {};

	var list = covid_world_timeline[0].list;
	for (var i = 0; i < list.length; i++) {
		var country = list[i]
		countryIndexMap[country.id] = i;
	}


	for (var i = 0; i < covid_total_timeline.length; i++) {
		var di = covid_total_timeline[i];
		di.active = di.confirmed - di.recovered;
	}

	var lastDate = new Date(covid_total_timeline[covid_total_timeline.length - 1].date);
	var currentDate = lastDate;

	function getTitle(name) {
		return "COVID-19, " + name + ", " + mapChart.dateFormatter.format(currentDate, "dd MMM, yyyy");
	}

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

	var buttonsContainer = container.createChild(am4core.Container);
	buttonsContainer.layout = "grid";
	buttonsContainer.width = am4core.percent(90);
	buttonsContainer.x = 10;
	buttonsContainer.y = 15;
	buttonsContainer.zIndex = 1000;

	// Create map instance
	var mapChart = container.createChild(am4maps.MapChart);

	mapChart.zoomControl = new am4maps.ZoomControl();
	mapChart.zoomControl.align = "right";
	mapChart.zoomControl.marginRight = 15;
	mapChart.zoomControl.valign = "middle";
	mapChart.zoomControl.minusButton.events.on("hit", showWorld);
	mapChart.height = am4core.percent(80);
	mapChart.zoomEasing = am4core.ease.sinOut;
	mapChart.seriesContainer.events.on("hit", showWorld);


	var title = mapChart.titles.create();
	title.fontSize = "1.4em";
	title.y = 70;
	title.align = "left";
	title.text = getTitle("World");
  title.horizontalCenter = "left";
  title.marginLeft = 20;

	var toolsContainer = container.createChild(am4core.Container);
	toolsContainer.layout = "vertical";
	toolsContainer.height = am4core.percent(30);
	toolsContainer.width = am4core.percent(100);
	toolsContainer.valign = "bottom";
	toolsContainer.background.fill = am4core.color("#000000");
	toolsContainer.background = new am4core.RoundedRectangle();
	toolsContainer.background.cornerRadius(30,30,0,0)
	toolsContainer.background.fillOpacity = 0.15;
	toolsContainer.paddingTop = 15;
	toolsContainer.paddingBottom = 15;


	var slideData = getSlideData();
	// as we will be modifying, make a copy
	var mapData = am4core.array.copy(JSON.parse(JSON.stringify(slideData.list)));
	var max = { confirmed: 0, recovered: 0, deaths: 0 };

	// the last day will have most
	for (var i = 0; i < mapData.length; i++) {
		var di = mapData[i];
		if (di.confirmed > max.confirmed) {
			max.confirmed = di.confirmed;
		}
		if (di.recovered > max.recovered) {
			max.recovered = di.recovered;
		}
		if (di.deaths > max.deaths) {
			max.deaths = di.deaths
		}
		max.active = max.confirmed;
	}

	// Set map definition
	mapChart.geodata = am4geodata_worldLow;

	// Set projection
	mapChart.projection = new am4maps.projections.Miller();
	mapChart.panBehavior = "move";

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
	polygonSeries.dataFields.id = "id";
	//	polygonSeries.dataFields.value = "deaths";
	//polygonSeries.data = mapData;

	var polygonTemplate = polygonSeries.mapPolygons.template;
	polygonTemplate.polygon.fill = am4core.color("#3b3b3b");
	polygonTemplate.polygon.fillOpacity = 0.4
	polygonTemplate.polygon.stroke = am4core.color("#000000");
	polygonTemplate.polygon.strokeOpacity = 0.15
	polygonTemplate.setStateOnChildren = true;
	polygonTemplate.states.create("hover")
	polygonTemplate.states.create("active")

	polygonTemplate.events.on("hit", handleCountryHit);
	polygonTemplate.events.on("over", handleCountryOver);
	polygonTemplate.events.on("out", handleCountryOut);
	mapChart.deltaLongitude = -10;


	var hs = polygonTemplate.polygon.states.create("hover")
	hs.properties.fill = am4core.color("#000000")

	var polygonHoverState = polygonTemplate.polygon.states.create("active")
	polygonHoverState.properties.fill = am4core.color("#000000")

	var imageSeries = mapChart.series.push(new am4maps.MapImageSeries());
	imageSeries.data = mapData;
	imageSeries.dataFields.value = "confirmed";
	imageSeries.dataFields.id = "id";

	imageSeries.events.on("dataitemsvalidated", function() {
		imageSeries.dataItems.each((dataItem) => {
			var mapImage = dataItem.mapImage;
			var circle = mapImage.children.getIndex(0);
			if (mapImage.dataItem.value == 0) {
				circle.hide(0);
			}
			else if (circle.isHidden || circle.isHiding) {
				circle.show();
			}
		})
	})

	imageSeries.tooltip.background.fillOpacity = 0.2;
	imageSeries.tooltip.getStrokeFromObject = true;
	imageSeries.tooltip.getFillFromObject = false;
	imageSeries.tooltip.background.fillOpacity = 0.2;
	imageSeries.tooltip.background.fill = am4core.color("#000000");


	var imageTemplate = imageSeries.mapImages.template;
	imageTemplate.nonScaling = true;
	imageTemplate.states.create("hover");
	imageTemplate.strokeOpacity = 0;
	imageTemplate.fillOpacity = 0.5;
	imageTemplate.tooltipText = "{name}: [bold]{value}[/]";
	imageTemplate.adapter.add("tooltipY", function(tooltipY, target) {
		return -target.children.getIndex(0).radius;
	})

	var circle = imageTemplate.createChild(am4core.Circle);

	var imageHoverState = imageTemplate.states.create("hover");
	imageHoverState.properties.fillOpacity = 1;

	// adjust heat rule if zoomed
	mapChart.events.on("zoomlevelchanged", function(event) {
		/*
		imageSeries.heatRules.getIndex(0).min = 3 * (1 / mapChart.zoomLevel);
		imageSeries.heatRules.getIndex(0).max = 30 * mapChart.zoomLevel;
		imageSeries.dataItems.each(function(dataItem) {
			dataItem.dispatch("calculatedvaluechanged");
		})*/
	})

	//imageTemplate.hiddenState.properties.opacity = 0;
	circle.hiddenState.properties.scale = 0.0001;
	circle.hiddenState.transitionDuration = 2000;
	circle.defaultState.transitionDuration = 2000;
	circle.defaultState.transitionEasing = am4core.ease.elasticOut;
	circle.applyOnClones = true;

	imageSeries.heatRules.push({
		"target": circle,
		"property": "radius",
		"min": 3,
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
	sliderContainer.padding(0, 15, 15, 10);
	sliderContainer.layout = "horizontal";

	var slider = sliderContainer.createChild(am4core.Slider);
	slider.valign = "middle";
	slider.background.opacity = 0.4;
	slider.opacity = 0.7;
	slider.background.fill = am4core.color("#ffffff");
	slider.marginLeft = 20;
	slider.marginRight = 35;
	slider.height = 15;
	slider.start = 1;
	slider.width = am4core.percent(100);

	slider.events.on("rangechanged", function(event) {
		var index = Math.round((covid_world_timeline.length - 1) * slider.start);
		updateData(getSlideData(index).list);
		updateTotals(index);
	})

	slider.startGrip.events.on("drag", () => {
		stop();
		if (sliderAnimation) {
			sliderAnimation.setProgress(slider.start);
		}
	});

	var playButton = sliderContainer.createChild(am4core.PlayButton);
	playButton.valign = "middle";
	playButton.events.on("toggled", function(event) {
		if (event.target.isActive) {
			play();
		} else {
			stop();
		}
	})

	function updateTotals(index) {
		if (!isNaN(index)) {
			var di = covid_total_timeline[index];
			var date = new Date(di.date);
			var position = dateAxis.dateToPosition(date);
			position = dateAxis.toGlobalPosition(position);
			var x = dateAxis.positionToCoordinate(position);
			if (casesChart.cursor) {
				casesChart.cursor.triggerMove({ x: 0, y: 0 }, "soft");
				casesChart.cursor.triggerMove({ x: x, y: 0 }, "soft");
			}
			for (var key in buttons) {
				buttons[key].label.text = key.toUpperCase() + ": " + di[key];
			}
			currentIndex = index;
		}
	}

	function updateData(data) {
		imageSeries.dataItems.each(function(dataItem) {
			dataItem.dataContext.confirmed = 0;
			dataItem.dataContext.deaths = 0;
			dataItem.dataContext.recovered = 0;
			dataItem.dataContext.active = 0;
		})

		for (var i = 0; i < data.length; i++) {
			var di = data[i];
			var image = imageSeries.getImageById(di.id);
			if (image) {
				image.dataItem.dataContext.confirmed = di.confirmed;
				image.dataItem.dataContext.deaths = di.deaths;
				image.dataItem.dataContext.recovered = di.recovered;
				image.dataItem.dataContext.active = di.confirmed - di.recovered;
			}
		}
		imageSeries.invalidateRawData();
	}

	var casesChart = toolsContainer.createChild(am4charts.XYChart);
	casesChart.data = covid_total_timeline;
	casesChart.leftAxesContainer.layout = "vertical"
	casesChart.paddingRight = 30;
	casesChart.paddingLeft = 30;
	casesChart.maskBullets = false;
	casesChart.zoomOutButton.disabled = true;

	var dateAxis = casesChart.xAxes.push(new am4charts.DateAxis());
	dateAxis.renderer.minGridDistance = 50;
	dateAxis.renderer.grid.template.stroke = am4core.color("#000000");
	dateAxis.max = lastDate.getTime() + am4core.time.getDuration("day", 3);

	casesChart.cursor = new am4charts.XYCursor();
	casesChart.cursor.behavior = "none";
	casesChart.cursor.lineY.disabled = true;
	casesChart.cursor.xAxis = dateAxis;
	casesChart.legend = new am4charts.Legend();
	casesChart.legend.parent = casesChart.plotContainer;
	casesChart.fontSize = "0.8em";

	var valueAxis = casesChart.yAxes.push(new am4charts.ValueAxis());
	valueAxis.renderer.grid.template.stroke = am4core.color("#000000");
	valueAxis.renderer.baseGrid.disabled = true;
	valueAxis.tooltip.disabled = true;
	valueAxis.extraMax = 0.05;
	valueAxis.renderer.inside = true;
	valueAxis.renderer.labels.template.verticalCenter = "bottom";
	valueAxis.renderer.labels.template.padding(2, 2, 2, 2);

	var activeSeries = addSeries("active", activeColor);
	activeSeries.hidden = false;
	var confirmedSeries = addSeries("confirmed", confirmedColor);
	var recoveredSeries = addSeries("recovered", recoveredColor);
	var deathsSeries = addSeries("deaths", deathsColor);

	function addSeries(name, color) {
		var series = casesChart.series.push(new am4charts.LineSeries())
		series.dataFields.valueY = name;
		series.dataFields.dateX = "date";
		series.name = name.toUpperCase();
		series.strokeOpacity = 0.5;
		series.stroke = color;
		series.maskBullets = false;
		series.hidden = true;
		series.sequencedInterpolation = true;
		series.hideTooltipWhileZooming = true;

		var bullet = series.bullets.push(new am4charts.CircleBullet());
		bullet.circle.fillOpacity = 1;
		bullet.circle.fill = backgroundColor;
		bullet.circle.radius = 3 * 1.2;
		bullet.setStateOnChildren = true;
		var bhs = bullet.states.create("hover");

		var hs = bullet.circle.states.create("hover");
		hs.properties.fillOpacity = 1;
		hs.properties.fill = color;
		hs.properties.scale = 1.2;

		series.tooltip.pointerOrientation = "down";
		series.tooltip.getStrokeFromObject = true;
		series.tooltip.getFillFromObject = false;
		series.tooltip.background.fillOpacity = 0.2;
		series.tooltip.background.fill = am4core.color("#000000");
		series.tooltip.dy = -3;
		series.tooltipText = "{valueY}";

		return series;
	}


	// buttons

	function addButton(name, color) {
		var button = buttonsContainer.createChild(am4core.Button)
		button.label.text = name.toUpperCase() + ": " + max[name];
		button.label.valign = "middle"
		button.fontSize = "1.1em";
		button.background.cornerRadius(30, 30, 30, 30);
		button.background.strokeOpacity = 0.3
		button.background.fillOpacity = 0;
		button.background.stroke = buttonStrokeColor;
		button.background.padding(2, 5, 2, 5);
		button.states.create("active");
		button.setStateOnChildren = true;
		button.valign = "top";

		var activeHoverState = button.background.states.create("hoverActive");
		activeHoverState.properties.fillOpacity = 0;

		var circle = new am4core.Circle();
		circle.radius = 10;
		circle.fillOpacity = 0.3;
		circle.fill = buttonStrokeColor;
		circle.strokeOpacity = 0;
		circle.valign = "middle";
		circle.marginRight = 10;

		button.dummyData = name;
		button.icon = circle;

		var activeState = circle.states.create("active");
		activeState.properties.fill = color;
		activeState.properties.fillOpacity = 0.5;

		button.events.on("hit", handleHit);

		return button;
	}

	function handleHit(event) {
		selectType(event.target.dummyData);
	}

	function selectType(name) {
		var activeButton = buttons[name];
		activeButton.isActive = true;

		for (var key in buttons) {
			if (buttons[key] != activeButton) {
				buttons[key].isActive = false;
			}
		}

		imageSeries.dataFields.value = name;
		imageSeries.invalidateData();
		imageSeries.mapImages.template.fill = colors[name];
		imageSeries.mapImages.template.stroke = colors[name];
		imageSeries.mapImages.template.children.getIndex(0).fill = colors[name];

		var activeSeries = series[name];
		activeSeries.show();

		for (var key in series) {
			if (series[key] != activeSeries) {
				series[key].hide();
			}
		}

		imageSeries.heatRules.getIndex(0).maxValue = max[name];
	}

	var activeButton = addButton("active", activeColor);
	var confirmedButton = addButton("confirmed", confirmedColor);
	var recoveredButton = addButton("recovered", recoveredColor);
	var deathsButton = addButton("deaths", deathsColor);


	var buttons = { active: activeButton, confirmed: confirmedButton, recovered: recoveredButton, deaths: deathsButton };
	var series = { active: activeSeries, confirmed: confirmedSeries, recovered: recoveredSeries, deaths: deathsSeries };
	var colors = { active: activeColor, confirmed: confirmedColor, recovered: recoveredColor, deaths: deathsColor };

	var mapGlobeSwitch = mapChart.createChild(am4core.SwitchButton);
	mapGlobeSwitch.align = "right"
	mapGlobeSwitch.y = 15;
	mapGlobeSwitch.leftLabel.text = "Map";
	mapGlobeSwitch.rightLabel.text = "Globe";
	mapGlobeSwitch.verticalCenter = "top";


	mapGlobeSwitch.events.on("toggled", function() {
		if (mapGlobeSwitch.isActive) {
			mapChart.projection = new am4maps.projections.Orthographic;
			mapChart.backgroundSeries.show();
			mapChart.panBehavior = "rotateLongLat";
			polygonSeries.exclude = [];
		} else {
			mapChart.projection = new am4maps.projections.Miller;
			mapChart.backgroundSeries.hide();
			mapChart.panBehavior = "move";
			polygonSeries.data = [];
			polygonSeries.exclude = ["AQ"];
		}
	})

	selectType("active");

	var sliderAnimation;

	function play() {

		if (!sliderAnimation) {
			sliderAnimation = slider.animate({ property: "start", to: 1, from: 0 }, 50000, am4core.ease.linear).pause();
			sliderAnimation.events.on("animationended", () => {
				playButton.isActive = false;
			})
		}

		if (slider.start >= 1) {
			slider.start = 0;
			sliderAnimation.start();
		}
		sliderAnimation.resume();
		playButton.isActive = true;
	}

	function stop() {
		if (sliderAnimation) {
			sliderAnimation.pause();
		}
		playButton.isActive = false;
	}

	/**
	 * Country/state list
	 */

	function populateCountries(list) {
		var table = $("#areas tbody");
		table.find(".area").remove();
		for (var i = 0; i < list.length; i++) {
			var area = list[i];
			var tr = $("<tr>").addClass("area").data("areaid", area.id).appendTo(table).on("click", function() {
				selectCountry(polygonSeries.getPolygonById($(this).data("areaid")));
			}).hover(function() {
				rollOverCountry(polygonSeries.getPolygonById($(this).data("areaid")));
			});
			$("<td>").appendTo(tr).data("areaid", area.id).html(area.name);
			$("<td>").addClass("value").appendTo(tr).html(area.confirmed);
			$("<td>").addClass("value").appendTo(tr).html(area.deaths);
			$("<td>").addClass("value").appendTo(tr).html(area.recovered);

		}
		$("#areas").DataTable({
			"paging": false,
			"select": true
		}).column("1")
			.order("desc")
			.draw();;
	}

	populateCountries(slideData.list);

	function handleCountryHit(event) {
		selectCountry(event.target);
	}

	function handleCountryOver(event) {
		rollOverCountry(event.target);
	}

	function handleCountryOut(event) {
		rollOutCountry(event.target);
	}

	function selectCountry(mapPolygon) {
		polygonSeries.hideTooltip();
		if (mapPolygon.isActive) {
			showWorld();
			return;
		}

		var chartData = [];
		var countryIndex = countryIndexMap[mapPolygon.dataItem.id];

		for (var i = 0; i < casesChart.data.length; i++) {
			var di = covid_world_timeline[i].list;

			var countryData = di[countryIndex];

			var dataContext = casesChart.data[i];

			dataContext.recovered = countryData.recovered;
			dataContext.confirmed = countryData.confirmed;
			dataContext.deaths = countryData.deaths;
			dataContext.active = countryData.confirmed - countryData.recovered;
		}

		casesChart.invalidateRawData();
		
		polygonSeries.mapPolygons.each(function(polygon) {
			if (polygon != mapPolygon) {
				polygon.isActive = false;
				polygon.isHover = false;
			}
		})

		title.text = getTitle(mapPolygon.dataItem.dataContext.name);

		mapPolygon.isActive = true;
		// meaning it's globe
		if (mapGlobeSwitch.isActive) {
			// animate deltas
			if (mapChart.zoomLevel != 1) {
				var zoomOutAnimation = mapChart.goHome();
				zoomOutAnimation.events.on("animationended", function() {
					rotateAndZoom(mapPolygon);
				});
			}
			else {
				rotateAndZoom(mapPolygon);
			}

		}
		else {
			mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
		}
	}

	function rollOverCountry(mapPolygon) {
		polygonSeries.mapPolygons.each(function(polygon) {
			polygon.isHover = false;
		})
		mapPolygon.isHover = true;

		var image = imageSeries.getImageById(mapPolygon.dataItem.id);

		if (image) {
			image.isHover = true;
		}
	}

	function rollOutCountry(mapPolygon) {
		var image = imageSeries.getImageById(mapPolygon.dataItem.id)

		if (image) {
			image.isHover = false;
		}
	}

	function rotateAndZoom(mapPolygon) {
		polygonSeries.hideTooltip();
		var animation = mapChart.animate([{ property: "deltaLongitude", to: -mapPolygon.visualLongitude }, { property: "deltaLatitude", to: -mapPolygon.visualLatitude }], 1000)
		animation.events.on("animationended", function() {
			mapChart.zoomToMapObject(mapPolygon, getZoomLevel(mapPolygon));
		})
	}


	function getZoomLevel(mapPolygon) {
		var w = mapPolygon.polygon.bbox.width;
		var h = mapPolygon.polygon.bbox.width;

		return Math.min(mapChart.seriesWidth / (w * 2), mapChart.seriesHeight / (h * 2))
	}

	function showWorld() {
		mapChart.goHome();

		title.text = getTitle("World");

		polygonSeries.mapPolygons.each(function(polygon) {
			polygon.isActive = false;
			polygon.isHover = false;
		})
	}

});