function timeSeriesGraph () {
    // defaults
    let t = -1,
        n = 40,
        duration = 750;
    
    let miny = -1,
        maxy = 1;

    let margin = {
        top: 6,
        right: 0,
        bottom: 20,
        left: 40
      },
      width = 560 - margin.right,
      height = 120 - margin.top - margin.bottom;

    let data = [];

    let x = d3.scale.linear()
        .domain([t - n + 1, t])
        .range([0, width]);

    let y = d3.time.scale()
        .range([height, 0])
        .domain([-1, 1]);

    let line = d3.svg.line()
        .interpolate("basis")
        .x(function(d, i) {
            return x(d.time);
        })
        .y(function(d, i) {
            return y(d.value);
        });

    let svg = d3.select("body").append("p").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .style("margin-left", -margin.left + "px")
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", width)
      .attr("height", height);

    let xAxis = d3.svg.axis().scale(x).orient("bottom");
    let axis = svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(x.axis = xAxis);

    let path = svg.append("g")
      .attr("clip-path", "url(#clip)")
      .append("path")
      .data([data])
      .attr("class", "line");

    function graph() {
        // console.log('TICKING')

        // update the domains
        x.domain([t - n + 2, t]);

        // redraw the line
        svg.select(".line")
            .attr("d", line)
            .attr("transform", null);

        // slide the x-axis left
        axis.transition()
            .duration(duration)
            .ease("linear")
            .call(x.axis);

        // slide the line left
        path.transition()
            .duration(duration)
            .ease("linear")
            .attr("transform", "translate(" + x(t - n) + ")");

        // pop the old data point off the front
        if (data.length > n) data.shift();
    };
    
    // function fourier() {
    //     let test = fft(data)
    //     console.log(test)
    // }
    
    graph.add = function (d) {
        data.push({
            time: ++t,
            value: +d
        })
        
        // graph next iteration
        graph();
        
        // fft
        // fourier();
        
        return graph
    };
    
    graph.miny = function (d) {
        if (!arguments.length) return d;
        miny = d;
        return graph
    }
    
    graph.maxy = function (d) {
        if (!arguments.length) return d;
        maxy = d;
        return graph
    }
    
    graph.title = function (title) {
        if (!arguments.length) return title;
        svg.append('text').text(title) //.attr({y: -10})
        return graph
    }
    
    return graph
}