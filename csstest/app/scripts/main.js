/**
* This is where everything starts
*/
    $(document).ready(function(){
        // Calculate the initial offset of the slider related to its parent
        var position = Math.round(50*(parseInt($(".slider").position().left) / parseInt($(".slider").parent().width())));
        $(".slider").text(position);

        // Get the initial count for rows and tiles based upon the values of the sliders
        var tilesCount = parseInt($("#tilesSlider > .slider").text());
        var rowsCount = parseInt($("#rowsSlider > .slider").text());

        // Id for the setInterval that will be called later
        var intervalID;

        // Launch the animation with default values
        $.when(buildTiles(rowsCount,tilesCount)).done(animate());

        // Functions that manage the sliders and allow them to be dragged
        // Drag function is called whenever the slider is dragged
        // Stop function is called when dragging has stopped
        $(".slider").draggable({
            axis:"x",
            containment: "parent",
            drag: function() {
                var currentValue = Math.round(50* (parseInt($(this).position().left) / parseInt($(this).parent().width())));
                //console.log("Current value is "+currentValue.toString());
                $(this).text(currentValue.toString());
                $(this).parent().attr("aria-valuenow", currentValue.toString());
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
                    currentDiv.animate({backgroundColor: colorReturned}, 500, "easeOutSine");

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
