# Grid / Tiles animation

This is a fun webapp I decided to try. Basically the screen is divided in a grid of divs that are dynamically generated based upon the dimensions of the screen.
Dimensions are calculated upon startup as well as each time the sliders move.

Background colors are randomly generated and change at a random interval time between 1 and 2.5 seconds for every div in the grid.
Each 2501 milliseconds, the whole randomization is recalled again.

It just looks nice :D !

Known "issues" : 

* The sliders should go from 1 to 50, but they don't
* The file animateD3.js doesn't serve a purpose, yet
* ...
