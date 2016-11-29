// Id for the setInterval that will be called later
var intervalID;

/**
* This is where everything starts
*/
    $(document).ready(function(){
        // Calculate the initial offset of the slider related to its parent
        // Fixed width is 30px, minus 14 px padding (left/right)


        var badgeWidth = 16;
        var sliderParentWidth = parseFloat($("#tilesSlider > .slider").parent().width());

        var tilesSliderPosition = $("#tilesSlider > .slider").position();
        var rowsSliderPosition = $("#rowsSlider > .slider").position();
        console.log("TOP"+tilesSliderPosition.top); #435/87
        $("#tilesSlider > .slider").css({
            position: "absolute",
            top: tilesSliderPosition.top +"px",
            left: (tilesSliderPosition.left) +"px"
        });

        $("#rowsSlider > .slider").css({
            position: "absolute",
            top: rowsSliderPosition.top +"px",
            left: (rowsSliderPosition.left) +"px"
        });


        $(".slider").text(0);

        // Get the initial count for rows and tiles based upon the values of the sliders
        var tilesCount = parseInt($("#tilesSlider > .slider").text());
        var rowsCount = parseInt($("#rowsSlider > .slider").text());


        // Launch the animation with default values
        $.when(buildTiles(rowsCount,tilesCount)).done(animate());

        // Functions that manage the sliders and allow them to be dragged
        // Drag function is called whenever the slider is dragged
        // Stop function is called when dragging has stopped
        $(".slider").draggable({
            axis:"x",
            containment: "parent",
            drag: function() {
                var badgeWidth = $(this).width();;
                var badgeOuterWidth = $(this).outerWidth();
                var badgeOffsetLeft = parseFloat($(this).position().left);
                var sliderRange = parseFloat($(this).parent().width() - badgeOuterWidth);
                var currentPosition = parseFloat(badgeOffsetLeft - badgeWidth);
                var currentValue = Math.round(50*(currentPosition/sliderRange)) ;

                $(this).text(currentValue.toString());

            },
            stop: function() {
                tilesCount = parseInt($("#tilesSlider > .slider").text());
                rowsCount = parseInt($("#rowsSlider > .slider").text());
                //console.log("Updated values for tiles " + tilesCount + " and rows "+rowsCount);
                $.when(buildTiles(rowsCount,tilesCount)).done(animate());
            }
        });
    })

    /**
     * This function first checks if the animation has already started (intervalID will be defined) and
     * clears the existing grid if it exists, whislt keeping the control panel present
     *
     * Then, it loops through all <div> with the css class ".inner"
     * and changes the background color with an animation
     */
    var animate = function(){

        if (typeof intervalID != 'undefined'){
            //console.log("Interval id "+intervalID+" has been cleared");
            clearInterval(intervalID);
        }

        intervalID = setInterval(function(){
            $(".inner").each(function() {
                var currentDiv = $(this);
                $.when(generateRandomColor()).done(function (colorReturned){
                    //console.log("Function has executed for inner div" + colorReturned);
                    currentDiv.animate({backgroundColor: colorReturned}, 500, "easeInOutExpo");
                });
            })
        }, 2501);
    }

    /**
    * Dynamically generate a list of outer divs corresponding to a fixed number of rows
    * Inside these outer divs, generate inner divs to the quantity of tilesPerRow
    * Outer divs will have the "outer" css class and inner divs, the "inner" class
    * @param numRows (int) The number of rows of tiles to have
    * @param tilesPerRow (int) The amount of tiles per row
    */
    function buildTiles(numRows, tilesPerRow) {

        // If a grid system is already present, delete it, except for the control panel
        $('#viewspace').contents().filter(function () {
            return this.id != "controlPanel";
        }).remove();

        var outerDivHeight = $("body").height() / numRows;
        var innerDivWidth = Math.round((1.0 / tilesPerRow) * 100).toString().concat("%");

        return $.Deferred( function() {
            var self = this;

            for (var i = 0; i < numRows; i++) {
                //console.log("About to add a outer div");
                $('<div/>', {
                    attr: { class: "outer"}
                }).height(outerDivHeight).appendTo("#viewspace");
            }

            for (var i = 0; i < tilesPerRow; i++) {
                //console.log("About to add an inner div");
                $('<div/>', {
                    attr: { class: "inner"}
                }).css("width", innerDivWidth).appendTo(".outer");
            }
            self.resolve();
        });
    }

    // Function that generates a random color;
    function generateRandomColor(){
        return $.Deferred(function (){
            var self = this;
            // Random time between 1000 and 2500 milliseconds
            var randomTime = (Math.random() * 2500) + 1000;
            setTimeout(function (){
                // Generate a random hexadecimal value and concatenate it with # to make a color
                var resultingColor = "#"+(Math.random().toString(16) + '000000').slice(2, 8);
                self.resolve(resultingColor);
                //console.log("Color is " + resultingColor);
            }, randomTime);
        });
    }
