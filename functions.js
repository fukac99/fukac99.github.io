// show country id on hover
function showTooltipCountry(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  tooltip
  .classed('hidden', false)
  .html(d.id)
  .attr('style', 
        'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
};

// hide tooltip
function hideTooltip(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip
  .classed('hidden', true);
}

// hide point tooltip
function hideTooltipPoint(d) {
  // Show the tooltip (unhide it) and set the name of the data entry.
  tooltip_point
  .classed('hidden', true);
}


// show location name on hover
function showTooltip(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  if (tooltip_point.classed("hidden")){
  		tooltip
	   .classed('hidden', false)
	   .html(d.name)
	   .attr('style', 
			 'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
  };
  
};

// show point tooltip
function showTooltipPoint(d){
  var mouse = d3.mouse(svg.node()).map(function(d) {
                        return parseInt(d);
                    });
  tooltip_point
  .classed('hidden', false)
  .html("<div> \
        		<span id='close' onclick='hideTooltipPoint()'>x</span>" +
        		getIconsAndLinks(d) + 
    			"<h3>" + d.name + "</h3>\
        		<h4> www.twosundowners.com </h4>\
        	</div>")
  .attr('style', 
        'left:' + (mouse[0] + 15) + 'px; top:' + (mouse[1] - 35) + 'px')
};

// color country
function colorCountry(country) {
    if (visited_countries.includes(country.id)) {
        return '#c8b98d';
    } else {
        return '#e7d8ad';
    }
};

// get icons and links
function getIconsAndLinks(d){
	var res = "<div id='icons'>  \
	 <img class = 'icon' title='icon1' src='http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/information-icon.png' alt='' width='50' height='50' /> \
	 <img class = 'icon' title='icon1' src='http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/information-icon.png' alt='' width='50' height='50' /> \
	 <img class = 'icon' title='icon1' src='http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/information-icon.png' alt='' width='50' height='50' /> \
			   </div>"
			   
	return res
}

