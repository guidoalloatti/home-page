var chartData = {
    "barCircleWeb":[ // Green Scale - Web Skills
        {"index":0.3, "value":10, "fill":"#229a22", "label":"PHP"},
        {"index":0.4, "value":9,  "fill":"#2da72d", "label":"Javascript"},
        {"index":0.5, "value":8,  "fill":"#3eba3e", "label":"Bash/Shell"},
        {"index":0.6, "value":6,  "fill":"#4ece4e", "label":"Ruby"},
        {"index":0.7, "value":4,  "fill":"#64dd64", "label":"Python"},
        {"index":0.8, "value":3,  "fill":"#7ae37a", "label":"Perl"},
        {"index":0.9, "value":3,  "fill":"#91e391", "label":"C"},
        {"index":1,   "value":2,  "fill":"#a6eca6", "label":"C++"},
        {"index":1.1, "value":2,  "fill":"#c2f6c2", "label":"C#"},
        {"index":1.2, "value":1,  "fill":"#eaffe5", "label":"Java"}
    ],
    "barCircleMvc":[
        {"index":0.3, "value":10, "fill":"#1d5b89", "label":"Zend"},
        {"index":0.4, "value":8, "fill":"#296c9f", "label":"CakePHP"},
        {"index":0.5, "value":7, "fill":"#3b7eb0", "label":"Synfony"},
        {"index":0.6, "value":6, "fill":"#4c8cbd", "label":"Code Igniter"},
        {"index":0.7, "value":5, "fill":"#639fcc", "label":"Doctrine"},
        {"index":0.8, "value":5, "fill":"#74a6cc", "label":"Rails"},
        {"index":0.9, "value":2, "fill":"#8bb9db", "label":"Sinatra"},
        {"index":1,   "value":2,  "fill":"#a5cae5", "label":"Tubogears"},
        {"index":1.1, "value":1,  "fill":"#c5e0f4", "label":"Django"},
        {"index":1.2, "value":1 , "fill":"#dff1ff", "label":"Drupal"}
    ],
    "barCircleJs":[
        {"index":0.3, "value":10, "fill":"#720808", "label":"jQuery"},
        {"index":0.4, "value":9,  "fill":"#811313", "label":"HTML5"},
        {"index":0.5, "value":8,  "fill":"#922121", "label":"CS3"},
        {"index":0.6, "value":7,  "fill":"#a53333", "label":"Ajax"},
        {"index":0.7, "value":6,  "fill":"#ba4b4b", "label":"jQueryUI"},
        {"index":0.8, "value":5,  "fill":"#c76464", "label":"Angular.js"},
        {"index":0.9, "value":5,  "fill":"#c57e7e", "label":"XML"},
        {"index":1.0, "value":4,  "fill":"#d89c9c", "label":"Node.js"},
        {"index":1.1, "value":3,  "fill":"#eec0c0", "label":"Meteor.js"},
        {"index":1.2, "value":2,  "fill":"#ffe7e7", "label":"CoffeScript"}
    ],
    "barCirclePlatforms":[
        {"index":0.3, "value":10, "fill":"#720808", "label":"Magento"},
        {"index":0.4, "value":9,  "fill":"#811313", "label":"Drupal"},
        {"index":0.5, "value":8,  "fill":"#922121", "label":"SugarCRM"},
        {"index":0.6, "value":7,  "fill":"#a53333", "label":"Moodle"},
        {"index":0.7, "value":6,  "fill":"#ba4b4b", "label":"SalesForce"},
        {"index":0.8, "value":5,  "fill":"#c76464", "label":"WordPress"},
        {"index":0.9, "value":5,  "fill":"#c57e7e", "label":"New 1"},
        {"index":1.0, "value":4,  "fill":"#d89c9c", "label":"New 2"},
        {"index":1.1, "value":3,  "fill":"#eec0c0", "label":"New 3"},
        {"index":1.2, "value":2,  "fill":"#ffe7e7", "label":"New 4"}
    ]
};

function drawBarCircleChart(data,target,values,labels){
    var w = 362,
        h = 362,
        size = data[0].value * 1.15,
        radius = 200,
        sectorWidth = .1,
        radScale = 25,
        sectorScale = 1.45,
        target = d3.select(target),
        valueText = d3.select(values),
        labelText = d3.select(labels);


    var arc = d3.svg.arc()
        .innerRadius(function(d,i){return (d.index/sectorScale) * radius + radScale; })
        .outerRadius(function(d,i){return ((d.index/sectorScale) + (sectorWidth/sectorScale)) * radius + radScale; })
        .startAngle(Math.PI)
        .endAngle(function(d) { return Math.PI + (d.value / size) * 2 * Math.PI; });
    
    var path = target.selectAll("path")
        .data(data);

    //TODO: seperate color and index from data object, make it a pain to update object order
    path.enter().append("svg:path")
        .attr("fill",function(d,i){return d.fill})
        .attr("stroke","#D1D3D4")
        .transition()
        .ease("elastic")
        .duration(1000)
        .delay(function(d,i){return i*100})
        .attrTween("d", arcTween);
        
    valueText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:50,
            y:function(d,i){return i*14},       
            "text-anchor":"end"
        })
        .text(function(d,i){return data[i].value});
    
    labelText.selectAll("tspan").data(data).enter()
        .append("tspan")
        .attr({
            x:0,
            y:function(d,i){return i*14}
        })
        .text(function(d,i){return data[i].label});

    function arcTween(b) {
        var i = d3.interpolate({value: 0}, b);
        return function(t) {
            return arc(i(t));
        };
    }
}

// Animation Queue
setTimeout(function(){drawBarCircleChart(chartData.barCircleWeb,"#circleBar-web-chart","#circleBar-web-values","#circleBar-web-labels")},500);
setTimeout(function(){drawBarCircleChart(chartData.barCircleMvc,"#circleBar-mvc-chart","#circleBar-mvc-values","#circleBar-mvc-labels")},1000);
setTimeout(function(){drawBarCircleChart(chartData.barCircleJs,"#circleBar-js-chart","#circleBar-js-values","#circleBar-js-labels")},1500);
setTimeout(function(){drawBarCircleChart(chartData.barCirclePlatforms,"#circleBar-flatforms-chart","#circleBar-flatforms-values","#circleBar-flatforms-labels")},2000);


d3.select("#circleBar-web-icon").transition().delay(500).duration(500).attr("opacity","1");
d3.select("#circleBar-web-text").transition().delay(750).duration(500).attr("opacity","1");
d3.select("#circleBar-web-clipLabels").transition().delay(600).duration(1250).attr("height","150");

d3.select("#circleBar-mvc-icon").transition().delay(1000).duration(500).attr("opacity","1");
d3.select("#circleBar-mvc-text").transition().delay(1250).duration(500).attr("opacity","1");
d3.select("#circleBar-mvc-clipLabels").transition().delay(1200).duration(1250).attr("height","150");

d3.select("#circleBar-js-icon").transition().delay(1500).duration(500).attr("opacity","1");
d3.select("#circleBar-js-text").transition().delay(1750).duration(500).attr("opacity","1");
d3.select("#circleBar-js-clipLabels").transition().delay(1600).duration(1250).attr("height","150");

d3.select("#circleBar-flatforms-icon").transition().delay(2000).duration(500).attr("opacity","1");
d3.select("#circleBar-flatforms-text").transition().delay(2250).duration(500).attr("opacity","1");
d3.select("#circleBar-flatforms-clipLabels").transition().delay(2100).duration(1250).attr("height","150");

function hideAllCarouselElements() {
    $("#mvc_carousel").hide();
    $("#platforms_carousel").hide();
    $("#js_carousel").hide();
    $("#misc_carousel").hide();
    $("#script_carousel").hide();
}

function changeVisualElement(element) {
    hideAllCarouselElements();
    $("#"+element+"_carousel").show();
}


$(document).ready(function() {

    // Hide all carousel elements and show mvc
    hideAllCarouselElements();
    $("#mvc_carousel").show();


    $("#more_skills_button").click(function() {
        $('#more_skills').slideToggle("slow");
        if ($('#more_skills_button').val() == "Show Me More Skills") {
            $('#more_skills_button').val("Show me Less skills");
        } else {
            $('#more_skills_button').val("Show me More skills");
        }
    });

    $("#more_experience_button").click(function() {
        $('#more_experience').slideToggle("slow");
        if ($('#more_experience_button').val() == "Show me More Experience") {
            $('#more_experience_button').val("Show me Less Experience");
        } else {
            $('#more_experience_button').val("Show me More Experience");
        }
    });

    $(window).on("scroll touchmove", function () {
        $('#main-header').toggleClass('small', $(document).scrollTop() > 200, 200);
        $('.header-centered').toggleClass('small', $(document).scrollTop() > 200, 250);
        $('.english-lang').toggleClass('small', $(document).scrollTop() > 200, 210);
        $('.spanish-lang').toggleClass('small', $(document).scrollTop() > 200, 210);
        $('.go-top-element').toggleClass('small', $(document).scrollTop() > 200, 200);
        $('.go-bottom-element').toggleClass('small', $(document).scrollTop() > 200, 200);
    });


    $("#go_top_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#top').offset().top
      }, 500);
    });

    $("#go_bottom_link").click(function(event) {  
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#bottom').offset().top
      }, 500);
    });

    $("#background_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#background-anchor').offset().top
      }, 500);
    });

    $("#about_me_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#about-me-anchor').offset().top
      }, 500);
    });

    $("#contact_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#contact-anchor').offset().top
      }, 500);
    });

    $("#visualizer_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#visualizer-anchor').offset().top
      }, 500);
    });

    $("#skills_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#my-skills-anchor').offset().top
      }, 500);
    });

    $("#my_work_link").click(function(event) {
      event.preventDefault();
      $(document.body).animate({
        'scrollTop': $('#my-work-anchor').offset().top
      }, 500);
    });


    // $('#carousel').click({
    //   dots: true,
    //   arrows: true
    // });

    //   $("#contact-form").submit(function (event) {
    //       $('#message_sent').hide();
    //       event.preventDefault();

    //       var fields_error = false;
    //       if(first_name.value == '') {
    //           $("#missing_first_name").show();
    //           fields_error = true;
    //       } else $("#missing_first_name").hide();

    //       if(last_name.value == '') {
    //           $("#missing_last_name").show();
    //           fields_error = true;
    //       } else $("#missing_last_name").hide();
        
    //       if(email.value == '') {
    //           $("#missing_email").show();
    //           fields_error = true;
    //       } else $("#missing_email").hide();

    //       if(subject.value == '') {
    //           $("#missing_subject").show();
    //           fields_error = true;
    //       } else $("#missing_subject").hide();

    //       if(message.value == '') {
    //           $("#missing_message").show();
    //           fields_error = true;
    //       } else $("#missing_message").hide();
    //       if(fields_error) return false;


    //       var fullMessage     = 
    //           'New enquiry!\n' +
    //           '============\n\n' +
    //           'Enquiry made by: '  + first_name.value + ' ' + last_name.value + '\n' +
    //           'Phone Number: '    + phone_number.value  + '\n' +
    //           'Email Address: '   + email.value + '\n\n' +
    //           'Message Received:' + '\n' + 
    //           '=================' + '\n' +
    //           message.value;

    //       Meteor.call('sendEmail',
    //           'email_address@gmail.com',
    //           email.value,
    //           subject.value,
    //           fullMessage);

    //       $("#first_name").val('');
    //       $("#last_name").val('');
    //       $("#email").val('');
    //       $("#phone_number").val('');        
    //       $("#subject").val('');
    //       $("#message").val('');
    //       $('#message_sent').show();
    //   }
    // });




});

