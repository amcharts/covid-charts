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

	var mapData = [
		{ "id": "AF", "name": "Afghanistan", "value": 32358260, "color": mapChart.colors.getIndex(0) },
		{ "id": "AL", "name": "Albania", "value": 3215988, "color": mapChart.colors.getIndex(1) },
		{ "id": "DZ", "name": "Algeria", "value": 35980193, "color": mapChart.colors.getIndex(2) },
		{ "id": "AO", "name": "Angola", "value": 19618432, "color": mapChart.colors.getIndex(2) },
		{ "id": "AR", "name": "Argentina", "value": 40764561, "color": mapChart.colors.getIndex(3) },
		{ "id": "AM", "name": "Armenia", "value": 3100236, "color": mapChart.colors.getIndex(1) },
		{ "id": "AU", "name": "Australia", "value": 22605732, "color": "#8aabb0" },
		{ "id": "AT", "name": "Austria", "value": 8413429, "color": mapChart.colors.getIndex(1) },
		{ "id": "AZ", "name": "Azerbaijan", "value": 9306023, "color": mapChart.colors.getIndex(1) },
		{ "id": "BH", "name": "Bahrain", "value": 1323535, "color": mapChart.colors.getIndex(0) },
		{ "id": "BD", "name": "Bangladesh", "value": 150493658, "color": mapChart.colors.getIndex(0) },
		{ "id": "BY", "name": "Belarus", "value": 9559441, "color": mapChart.colors.getIndex(1) },
		{ "id": "BE", "name": "Belgium", "value": 10754056, "color": mapChart.colors.getIndex(1) },
		{ "id": "BJ", "name": "Benin", "value": 9099922, "color": mapChart.colors.getIndex(2) },
		{ "id": "BT", "name": "Bhutan", "value": 738267, "color": mapChart.colors.getIndex(0) },
		{ "id": "BO", "name": "Bolivia", "value": 10088108, "color": mapChart.colors.getIndex(3) },
		{ "id": "BA", "name": "Bosnia and Herzegovina", "value": 3752228, "color": mapChart.colors.getIndex(1) },
		{ "id": "BW", "name": "Botswana", "value": 2030738, "color": mapChart.colors.getIndex(2) },
		{ "id": "BR", "name": "Brazil", "value": 196655014, "color": mapChart.colors.getIndex(3) },
		{ "id": "BN", "name": "Brunei", "value": 405938, "color": mapChart.colors.getIndex(0) },
		{ "id": "BG", "name": "Bulgaria", "value": 7446135, "color": mapChart.colors.getIndex(1) },
		{ "id": "BF", "name": "Burkina Faso", "value": 16967845, "color": mapChart.colors.getIndex(2) },
		{ "id": "BI", "name": "Burundi", "value": 8575172, "color": mapChart.colors.getIndex(2) },
		{ "id": "KH", "name": "Cambodia", "value": 14305183, "color": mapChart.colors.getIndex(0) },
		{ "id": "CM", "name": "Cameroon", "value": 20030362, "color": mapChart.colors.getIndex(2) },
		{ "id": "CA", "name": "Canada", "value": 34349561, "color": mapChart.colors.getIndex(4) },
		{ "id": "CV", "name": "Cape Verde", "value": 500585, "color": mapChart.colors.getIndex(2) },
		{ "id": "CF", "name": "Central African Rep.", "value": 4486837, "color": mapChart.colors.getIndex(2) },
		{ "id": "TD", "name": "Chad", "value": 11525496, "color": mapChart.colors.getIndex(2) },
		{ "id": "CL", "name": "Chile", "value": 17269525, "color": mapChart.colors.getIndex(3) },
		{ "id": "CN", "name": "China", "value": 1347565324, "color": mapChart.colors.getIndex(0) },
		{ "id": "CO", "name": "Colombia", "value": 46927125, "color": mapChart.colors.getIndex(3) },
		{ "id": "KM", "name": "Comoros", "value": 753943, "color": mapChart.colors.getIndex(2) },
		{ "id": "CD", "name": "Congo, Dem. Rep.", "value": 67757577, "color": mapChart.colors.getIndex(2) },
		{ "id": "CG", "name": "Congo, Rep.", "value": 4139748, "color": mapChart.colors.getIndex(2) },
		{ "id": "CR", "name": "Costa Rica", "value": 4726575, "color": mapChart.colors.getIndex(4) },
		{ "id": "CI", "name": "Cote d'Ivoire", "value": 20152894, "color": mapChart.colors.getIndex(2) },
		{ "id": "HR", "name": "Croatia", "value": 4395560, "color": mapChart.colors.getIndex(1) },
		{ "id": "CU", "name": "Cuba", "value": 11253665, "color": mapChart.colors.getIndex(4) },
		{ "id": "CY", "name": "Cyprus", "value": 1116564, "color": mapChart.colors.getIndex(1) },
		{ "id": "CZ", "name": "Czech Rep.", "value": 10534293, "color": mapChart.colors.getIndex(1) },
		{ "id": "DK", "name": "Denmark", "value": 5572594, "color": mapChart.colors.getIndex(1) },
		{ "id": "DJ", "name": "Djibouti", "value": 905564, "color": mapChart.colors.getIndex(2) },
		{ "id": "DO", "name": "Dominican Rep.", "value": 10056181, "color": mapChart.colors.getIndex(4) },
		{ "id": "EC", "name": "Ecuador", "value": 14666055, "color": mapChart.colors.getIndex(3) },
		{ "id": "EG", "name": "Egypt", "value": 82536770, "color": mapChart.colors.getIndex(2) },
		{ "id": "SV", "name": "El Salvador", "value": 6227491, "color": mapChart.colors.getIndex(4) },
		{ "id": "GQ", "name": "Equatorial Guinea", "value": 720213, "color": mapChart.colors.getIndex(2) },
		{ "id": "ER", "name": "Eritrea", "value": 5415280, "color": mapChart.colors.getIndex(2) },
		{ "id": "EE", "name": "Estonia", "value": 1340537, "color": mapChart.colors.getIndex(1) },
		{ "id": "ET", "name": "Ethiopia", "value": 84734262, "color": mapChart.colors.getIndex(2) },
		{ "id": "FJ", "name": "Fiji", "value": 868406, "color": "#8aabb0" },
		{ "id": "FI", "name": "Finland", "value": 5384770, "color": mapChart.colors.getIndex(1) },
		{ "id": "FR", "name": "France", "value": 63125894, "color": mapChart.colors.getIndex(1) },
		{ "id": "GA", "name": "Gabon", "value": 1534262, "color": mapChart.colors.getIndex(2) },
		{ "id": "GM", "name": "Gambia", "value": 1776103, "color": mapChart.colors.getIndex(2) },
		{ "id": "GE", "name": "Georgia", "value": 4329026, "color": mapChart.colors.getIndex(1) },
		{ "id": "DE", "name": "Germany", "value": 82162512, "color": mapChart.colors.getIndex(1) },
		{ "id": "GH", "name": "Ghana", "value": 24965816, "color": mapChart.colors.getIndex(2) },
		{ "id": "GR", "name": "Greece", "value": 11390031, "color": mapChart.colors.getIndex(1) },
		{ "id": "GT", "name": "Guatemala", "value": 14757316, "color": mapChart.colors.getIndex(4) },
		{ "id": "GN", "name": "Guinea", "value": 10221808, "color": mapChart.colors.getIndex(2) },
		{ "id": "GW", "name": "Guinea-Bissau", "value": 1547061, "color": mapChart.colors.getIndex(2) },
		{ "id": "GY", "name": "Guyana", "value": 756040, "color": mapChart.colors.getIndex(3) },
		{ "id": "HT", "name": "Haiti", "value": 10123787, "color": mapChart.colors.getIndex(4) },
		{ "id": "HN", "name": "Honduras", "value": 7754687, "color": mapChart.colors.getIndex(4) },
		{ "id": "HK", "name": "Hong Kong, China", "value": 7122187, "color": mapChart.colors.getIndex(0) },
		{ "id": "HU", "name": "Hungary", "value": 9966116, "color": mapChart.colors.getIndex(1) },
		{ "id": "IS", "name": "Iceland", "value": 324366, "color": mapChart.colors.getIndex(1) },
		{ "id": "IN", "name": "India", "value": 1241491960, "color": mapChart.colors.getIndex(0) },
		{ "id": "ID", "name": "Indonesia", "value": 242325638, "color": mapChart.colors.getIndex(0) },
		{ "id": "IR", "name": "Iran", "value": 74798599, "color": mapChart.colors.getIndex(0) },
		{ "id": "IQ", "name": "Iraq", "value": 32664942, "color": mapChart.colors.getIndex(0) },
		{ "id": "IE", "name": "Ireland", "value": 4525802, "color": mapChart.colors.getIndex(1) },
		{ "id": "IL", "name": "Israel", "value": 7562194, "color": mapChart.colors.getIndex(0) },
		{ "id": "IT", "name": "Italy", "value": 60788694, "color": mapChart.colors.getIndex(1) },
		{ "id": "JM", "name": "Jamaica", "value": 2751273, "color": mapChart.colors.getIndex(4) },
		{ "id": "JP", "name": "Japan", "value": 126497241, "color": mapChart.colors.getIndex(0) },
		{ "id": "JO", "name": "Jordan", "value": 6330169, "color": mapChart.colors.getIndex(0) },
		{ "id": "KZ", "name": "Kazakhstan", "value": 16206750, "color": mapChart.colors.getIndex(0) },
		{ "id": "KE", "name": "Kenya", "value": 41609728, "color": mapChart.colors.getIndex(2) },
		{ "id": "KP", "name": "Korea, Dem. Rep.", "value": 24451285, "color": mapChart.colors.getIndex(0) },
		{ "id": "KR", "name": "Korea, Rep.", "value": 48391343, "color": mapChart.colors.getIndex(0) },
		{ "id": "KW", "name": "Kuwait", "value": 2818042, "color": mapChart.colors.getIndex(0) },
		{ "id": "KG", "name": "Kyrgyzstan", "value": 5392580, "color": mapChart.colors.getIndex(0) },
		{ "id": "LA", "name": "Laos", "value": 6288037, "color": mapChart.colors.getIndex(0) },
		{ "id": "LV", "name": "Latvia", "value": 2243142, "color": mapChart.colors.getIndex(1) },
		{ "id": "LB", "name": "Lebanon", "value": 4259405, "color": mapChart.colors.getIndex(0) },
		{ "id": "LS", "name": "Lesotho", "value": 2193843, "color": mapChart.colors.getIndex(2) },
		{ "id": "LR", "name": "Liberia", "value": 4128572, "color": mapChart.colors.getIndex(2) },
		{ "id": "LY", "name": "Libya", "value": 6422772, "color": mapChart.colors.getIndex(2) },
		{ "id": "LT", "name": "Lithuania", "value": 3307481, "color": mapChart.colors.getIndex(1) },
		{ "id": "LU", "name": "Luxembourg", "value": 515941, "color": mapChart.colors.getIndex(1) },
		{ "id": "MK", "name": "Macedonia, FYR", "value": 2063893, "color": mapChart.colors.getIndex(1) },
		{ "id": "MG", "name": "Madagascar", "value": 21315135, "color": mapChart.colors.getIndex(2) },
		{ "id": "MW", "name": "Malawi", "value": 15380888, "color": mapChart.colors.getIndex(2) },
		{ "id": "MY", "name": "Malaysia", "value": 28859154, "color": mapChart.colors.getIndex(0) },
		{ "id": "ML", "name": "Mali", "value": 15839538, "color": mapChart.colors.getIndex(2) },
		{ "id": "MR", "name": "Mauritania", "value": 3541540, "color": mapChart.colors.getIndex(2) },
		{ "id": "MU", "name": "Mauritius", "value": 1306593, "color": mapChart.colors.getIndex(2) },
		{ "id": "MX", "name": "Mexico", "value": 114793341, "color": mapChart.colors.getIndex(4) },
		{ "id": "MD", "name": "Moldova", "value": 3544864, "color": mapChart.colors.getIndex(1) },
		{ "id": "MN", "name": "Mongolia", "value": 2800114, "color": mapChart.colors.getIndex(0) },
		{ "id": "ME", "name": "Montenegro", "value": 632261, "color": mapChart.colors.getIndex(1) },
		{ "id": "MA", "name": "Morocco", "value": 32272974, "color": mapChart.colors.getIndex(2) },
		{ "id": "MZ", "name": "Mozambique", "value": 23929708, "color": mapChart.colors.getIndex(2) },
		{ "id": "MM", "name": "Myanmar", "value": 48336763, "color": mapChart.colors.getIndex(0) },
		{ "id": "NA", "name": "Namibia", "value": 2324004, "color": mapChart.colors.getIndex(2) },
		{ "id": "NP", "name": "Nepal", "value": 30485798, "color": mapChart.colors.getIndex(0) },
		{ "id": "NL", "name": "Netherlands", "value": 16664746, "color": mapChart.colors.getIndex(1) },
		{ "id": "NZ", "name": "New Zealand", "value": 4414509, "color": "#8aabb0" },
		{ "id": "NI", "name": "Nicaragua", "value": 5869859, "color": mapChart.colors.getIndex(4) },
		{ "id": "NE", "name": "Niger", "value": 16068994, "color": mapChart.colors.getIndex(2) },
		{ "id": "NG", "name": "Nigeria", "value": 162470737, "color": mapChart.colors.getIndex(2) },
		{ "id": "NO", "name": "Norway", "value": 4924848, "color": mapChart.colors.getIndex(1) },
		{ "id": "OM", "name": "Oman", "value": 2846145, "color": mapChart.colors.getIndex(0) },
		{ "id": "PK", "name": "Pakistan", "value": 176745364, "color": mapChart.colors.getIndex(0) },
		{ "id": "PA", "name": "Panama", "value": 3571185, "color": mapChart.colors.getIndex(4) },
		{ "id": "PG", "name": "Papua New Guinea", "value": 7013829, "color": "#8aabb0" },
		{ "id": "PY", "name": "Paraguay", "value": 6568290, "color": mapChart.colors.getIndex(3) },
		{ "id": "PE", "name": "Peru", "value": 29399817, "color": mapChart.colors.getIndex(3) },
		{ "id": "PH", "name": "Philippines", "value": 94852030, "color": mapChart.colors.getIndex(0) },
		{ "id": "PL", "name": "Poland", "value": 38298949, "color": mapChart.colors.getIndex(1) },
		{ "id": "PT", "name": "Portugal", "value": 10689663, "color": mapChart.colors.getIndex(1) },
		{ "id": "PR", "name": "Puerto Rico", "value": 3745526, "color": mapChart.colors.getIndex(4) },
		{ "id": "QA", "name": "Qatar", "value": 1870041, "color": mapChart.colors.getIndex(0) },
		{ "id": "RO", "name": "Romania", "value": 21436495, "color": mapChart.colors.getIndex(1) },
		{ "id": "RU", "name": "Russia", "value": 142835555, "color": mapChart.colors.getIndex(1) },
		{ "id": "RW", "name": "Rwanda", "value": 10942950, "color": mapChart.colors.getIndex(2) },
		{ "id": "SA", "name": "Saudi Arabia", "value": 28082541, "color": mapChart.colors.getIndex(0) },
		{ "id": "SN", "name": "Senegal", "value": 12767556, "color": mapChart.colors.getIndex(2) },
		{ "id": "RS", "name": "Serbia", "value": 9853969, "color": mapChart.colors.getIndex(1) },
		{ "id": "SL", "name": "Sierra Leone", "value": 5997486, "color": mapChart.colors.getIndex(2) },
		{ "id": "SG", "name": "Singapore", "value": 5187933, "color": mapChart.colors.getIndex(0) },
		{ "id": "SK", "name": "Slovak Republic", "value": 5471502, "color": mapChart.colors.getIndex(1) },
		{ "id": "SI", "name": "Slovenia", "value": 2035012, "color": mapChart.colors.getIndex(1) },
		{ "id": "SB", "name": "Solomon Islands", "value": 552267, "color": "#8aabb0" },
		{ "id": "SO", "name": "Somalia", "value": 9556873, "color": mapChart.colors.getIndex(2) },
		{ "id": "ZA", "name": "South Africa", "value": 50459978, "color": mapChart.colors.getIndex(2) },
		{ "id": "ES", "name": "Spain", "value": 46454895, "color": mapChart.colors.getIndex(1) },
		{ "id": "LK", "name": "Sri Lanka", "value": 21045394, "color": mapChart.colors.getIndex(0) },
		{ "id": "SD", "name": "Sudan", "value": 34735288, "color": mapChart.colors.getIndex(2) },
		{ "id": "SR", "name": "Suriname", "value": 529419, "color": mapChart.colors.getIndex(3) },
		{ "id": "SZ", "name": "Swaziland", "value": 1203330, "color": mapChart.colors.getIndex(2) },
		{ "id": "SE", "name": "Sweden", "value": 9440747, "color": mapChart.colors.getIndex(1) },
		{ "id": "CH", "name": "Switzerland", "value": 7701690, "color": mapChart.colors.getIndex(1) },
		{ "id": "SY", "name": "Syria", "value": 20766037, "color": mapChart.colors.getIndex(0) },
		{ "id": "TW", "name": "Taiwan", "value": 23072000, "color": mapChart.colors.getIndex(0) },
		{ "id": "TJ", "name": "Tajikistan", "value": 6976958, "color": mapChart.colors.getIndex(0) },
		{ "id": "TZ", "name": "Tanzania", "value": 46218486, "color": mapChart.colors.getIndex(2) },
		{ "id": "TH", "name": "Thailand", "value": 69518555, "color": mapChart.colors.getIndex(0) },
		{ "id": "TG", "name": "Togo", "value": 6154813, "color": mapChart.colors.getIndex(2) },
		{ "id": "TT", "name": "Trinidad and Tobago", "value": 1346350, "color": mapChart.colors.getIndex(4) },
		{ "id": "TN", "name": "Tunisia", "value": 10594057, "color": mapChart.colors.getIndex(2) },
		{ "id": "TR", "name": "Turkey", "value": 73639596, "color": mapChart.colors.getIndex(1) },
		{ "id": "TM", "name": "Turkmenistan", "value": 5105301, "color": mapChart.colors.getIndex(0) },
		{ "id": "UG", "name": "Uganda", "value": 34509205, "color": mapChart.colors.getIndex(2) },
		{ "id": "UA", "name": "Ukraine", "value": 45190180, "color": mapChart.colors.getIndex(1) },
		{ "id": "AE", "name": "United Arab Emirates", "value": 7890924, "color": mapChart.colors.getIndex(0) },
		{ "id": "GB", "name": "United Kingdom", "value": 62417431, "color": mapChart.colors.getIndex(1) },
		{ "id": "US", "name": "United States", "value": 313085380, "color": mapChart.colors.getIndex(4) },
		{ "id": "UY", "name": "Uruguay", "value": 3380008, "color": mapChart.colors.getIndex(3) },
		{ "id": "UZ", "name": "Uzbekistan", "value": 27760267, "color": mapChart.colors.getIndex(0) },
		{ "id": "VE", "name": "Venezuela", "value": 29436891, "color": mapChart.colors.getIndex(3) },
		{ "id": "PS", "name": "West Bank and Gaza", "value": 4152369, "color": mapChart.colors.getIndex(0) },
		{ "id": "VN", "name": "Vietnam", "value": 88791996, "color": mapChart.colors.getIndex(0) },
		{ "id": "YE", "name": "Yemen, Rep.", "value": 24799880, "color": mapChart.colors.getIndex(0) },
		{ "id": "ZM", "name": "Zambia", "value": 13474959, "color": mapChart.colors.getIndex(2) },
		{ "id": "ZW", "name": "Zimbabwe", "value": 12754378, "color": mapChart.colors.getIndex(2) }
	];

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
	imageSeries.dataFields.value = "value";

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
	casesChart.data = generateData();
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


	function generateData() {
		var startDate = new Date(2020, 0, 22)
		var endDate = new Date(2020, 2, 18)
		var data = [];
		let c = 0;
		for (var i = startDate.getTime(); i < endDate.getTime(); i = i + am4core.time.getDuration("day")) {
			c++;
			data.push({ date: new Date(i), cases: c * c / 1.5, deaths: c * c * 1.5 * 0.03, recovered: c * c * 1.5 * 0.2 });
		}
		return data;
	}

	var casesSeries = casesChart.series.push(new am4charts.LineSeries())
	casesSeries.dataFields.valueY = "cases";
	casesSeries.dataFields.dateX = "date";
	casesSeries.name = "Cases";

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