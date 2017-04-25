var debug ;

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
    			// "<h3>" + d.name + "</h3>" +
        	"</div>")
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
function getIcons(posts){
	keys = Object.keys(posts)
	var st = "";
	
	
	keys.forEach(function(key, index){
	    var this_img = "<a href='POST_LINK' target='_blank'><img class = 'icon' \
					   title='ICON_KIND' src='ICON_LINK' \
					   alt='' width='50' height='50' /></a>" ;
		this_img = this_img.replace("POST_LINK", posts[key]);
		this_img = this_img.replace("ICON_KIND", key);
		this_img = this_img.replace("ICON_LINK", post_cats[key]);
		st += this_img
	});
	
	return st
	
}

// get legend items
function getLegend(d){
	var temp = "<img class='legend_icon' title='ICON_TITLE' \
		 src='ICON_LINK' alt='' width='50' height='50'> \
		 ICON_KIND";
	temp = temp.replace("ICON_TITLE", d.name);
	temp = temp.replace("ICON_LINK", d.url);
	temp = temp.replace("ICON_KIND", d.name);
	// console.log(temp);
	return(temp);
};	

// color countries for particular legend item
function colorCountriesCategory(d){
	var these_countries = trip_data.filter(function(s){
												return hasContent(s, d.name);
											});
	
	var active_countries =  these_countries.map(function(a) {return a.country;});
	var unique = active_countries.filter(function(item, i, ar){ return ar.indexOf(item) === i; });
	
	console.log(unique);
	
	g.selectAll('path')
	 .attr('fill', function(t){
	 	return colorCountryLegend(t, unique);
	 });
	 
};

// color country according to legend
function colorCountryLegend(country, active_countries) {
    if (active_countries.includes(country.id)) {
        return '#f56260';
    } else if (visited_countries.includes(country.id)) {
        return '#c8b98d';
    } else {
    	return '#e7d8ad';
    }
};


function hasContent(s, kind){
    
	var post_keys = Object.keys(s.posts);
    // console.log(post_keys.includes(kind));
	return post_keys.includes(kind)
};

	
	
	
	