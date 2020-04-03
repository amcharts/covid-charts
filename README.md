# covid-charts
A collection of JavaScript-based data visualization tools and data for depicting spread of the COVID-19.

If you are a news agency, online publisher, or simple blogger, you can use these tools and chart templates to quickly drop in data visualization to your website.

## Important disclaimer
WE DO NOT GUARANTEE ACCURACY OF THE DATA. PLEASE USE IT AS A VISUAL AID ONLY, AND DO NOT BASE ANY DECISION MEDICAL OR LOGISTICAL BASED ON THE DATA PROVIDED IN THESE CHARTS OR DATA FILES.

Treat the data included here as a sample data, which might be (and probably is) NOT up-to-date and contain (and probably does) contain some calculational errors, especially in historical numbers.

Please note that statistics collection, especially in early days of pandemic was erratic, patchy, and not systemized.

Feel free to modify examples to use your own data instead.

## Examples
Example dashboards: [World](https://covid.amcharts.com) and [United States](https://covid.amcharts.com/us).

## Usage
Both chart templates and data provided AS IS. Take it, fork it, modify it, use it on your own.

No attribution to amCharts is required.

We provide charts and data. We DO NOT provide hosting. So please, people, grab and put those charts on your own server. Or, if you're lazy, just drop the dashboard into a `<iframe>` or something :)

## Data
### Source
The data files, used in this repository are derived from [this repository](https://github.com/CSSEGISandData/COVID-19); copyright 2020 Johns Hopkins University. Make sure your intended usage adheres to their terms of use.

### Accuracy
Data files located in this repo are not copies of the original source files but rather aggregated data. We did our best to aggregate the timeline data, which is often fragmented, collected in different manner over time, and contains some other curiosities. Think passengers on cruise ships being attributed to either their countries of residence, or the country they were docked in. Or U.S. collecting case data per city, then moving on to state-wide data over time.

### Current day
The global data is collected from a lot of local sources, which update at irregular intervals and delays. This means that the data for current day may be (and probably is) incomplete and will be updated as new data comes in from world regions.

### Data irregularities
If you notice any irregularities, please do let us know by opening an [issue](https://github.com/amcharts/covid-charts/issues).

### Update frequency
Data is updated roughly once per hour.

### United States data
Data for U.S. does not contain numbers of recovered cases.

## Files
We have a request: please download and put all the files required for displaying the charts on your websites. Due to high demand for this kind of information, it might put a huge load on our servers, something they might not be able to handle. We're giving this away for free, please help us by easing the load.

## Maps
Not happy with the border layout of the default map? We have [different versions](https://github.com/amcharts/covid-charts/tree/master/deps/amcharts4-geodata) for India, China, Russia, and Morocco. Just replace `worldLow` in HTML and JS to `worldIndia`, `worldChina`, `worldRussia`, or `worldMorocco`.

## Technology
### Charts and maps
The chart, map and dashboard examples use amCharts 4 product; copyright amCharts. You can use and integrate the charts for free as long as you adhere to the [free use license from amCharts](https://github.com/amcharts/amcharts4#license).

### 3rd party libraries
Examples use these thord party libraries:

* [jQuery](https://jquery.com/)
* [DataTables](https://datatables.net/)

Please review their respective licenses before using in your own products.

## Contributing
If you want to contribute to this repository, create a pull request. Although, we do not guarantee it will be merged, as maintainers do not have a lot of resources to dedicated to this free endevour.

## Support
Please do understand that we have absolutely no capacity to provide any kind of technical support for these maps and charts.

If you think you found a bug, please consider [opening an issue](https://github.com/amcharts/covid-charts/issues).

Questions and support requests will be ignored. Sorry, but we simply have too much on our plates right now.