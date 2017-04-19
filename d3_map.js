var width = window.innerWidth,
    height = window.innerHeight;

var projection = d3.geoMercator()
    .translate([width / 2.2, height / 1.7]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("class", "map");

var path = d3.geoPath()
    .projection(projection);

var g = svg.append("g");

var tooltip = d3.select("body")
  .append("div")
  .attr("class", "tooltip hidden");

// load and display the World
d3.json("https://unpkg.com/world-atlas@1/world/50m.json", function(error, topology) {
    g.selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries)
          .features)
    .enter()
      .append("path")
      .attr("d", path);
      
var trip_data = d3.json("trip_data.csv", function(error, t_data){
	return t_data
};

g.selectAll("circle")
 .data(trip_data)
 .enter()
 .append("circle")
 .attr("cx", function(d) {
        return projection([d.lon, d.lat])[0];
  })
 .attr("cy", function(d) {
        return projection([d.lon, d.lat])[1];
  })
 .attr("r", width / 300)
 .on("mousemove", showTooltip)
 .on("mouseout", hideTooltip)
 
 
 });

var zoom = d3.zoom()
    .on("zoom",function() {
        var z = d3.event.transform;
        g.attr("transform", z);
        g.selectAll("path")  
            .attr("d", path.projection(projection)); 
        
        g.selectAll("circle")
         .attr("r", width / 300 / z.k);
});

function hideTooltip(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip
  .classed('hidden', true);
}

function showTooltip(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  tooltip
  .classed('hidden', false)
  .html(d.name)
  .attr('style', 
        'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
};

svg.call(zoom);