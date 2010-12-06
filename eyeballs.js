(function () {
    // Conf
    var containerWidth = 35;
    var containerHeight = 17;
    var origins = {
        x1: 8,
        y1: 8,
        x2: 26,
        y2: 8
    };
    var radius = 5;
    
    // Setup container
    var container = document.getElementById('eyeballs');
    container.style.width = containerWidth + 'px';
    container.style.height = containerHeight + 'px';
    container.style.padding = '5px';
    console.log(container.innerHeight);
    console.log(container.innerWidth);
    
    // Append canvas and setup the 2d drawing context
    var eyeCanvas = document.createElement('canvas');
    eyeCanvas.width = containerWidth;
    eyeCanvas.height = containerHeight;
    container.appendChild(eyeCanvas);
    var ctx = eyeCanvas.getContext('2d');
    
    // Listen for mouse movement
    document.addEventListener('mousemove', function (e) {
        // Normalise x and y to container page offset
        drawPupils(getPupilPositionsFromMousePosition(e.x - container.offsetLeft, e.y - container.offsetTop));
    }, false);
    
    
    function drawEyeball (x, y) {
        ctx.fillRect(x - 2, y - 8, 5, 1);
        ctx.fillRect(x - 4, y - 7, 2, 1); ctx.fillRect(x + 3, y - 7, 2, 1);
        ctx.fillRect(x - 5, y - 6, 1, 1); ctx.fillRect(x + 5, y - 6, 1, 1);
        ctx.fillRect(x - 6, y - 5, 1, 1); ctx.fillRect(x + 6, y - 5, 1, 1);
        ctx.fillRect(x - 7, y - 4, 1, 2); ctx.fillRect(x + 7, y - 4, 1, 2);
        ctx.fillRect(x - 8, y - 2, 1, 5); ctx.fillRect(x + 8, y - 2, 1, 5);
        ctx.fillRect(x - 7, y + 3, 1, 2); ctx.fillRect(x + 7, y + 3, 1, 2);
        ctx.fillRect(x - 6, y + 5, 1, 1); ctx.fillRect(x + 6, y + 5, 1, 1);
        ctx.fillRect(x - 5, y + 6, 1, 1); ctx.fillRect(x + 5, y + 6, 1, 1);
        ctx.fillRect(x - 4, y + 7, 2, 1); ctx.fillRect(x + 3, y + 7, 2, 1);
        ctx.fillRect(x - 2, y + 8, 5, 1);
    }
    
    function drawPupil (x, y) {
        // Pixel circle!
        x = Math.round(x);
        y = Math.round(y);
        ctx.fillRect(x - 1, y - 2, 3, 1);
        ctx.fillRect(x - 2, y - 1, 5, 1);
        ctx.fillRect(x - 2, y    , 5, 1);
        ctx.fillRect(x - 2, y + 1, 5, 1);
        ctx.fillRect(x - 1, y + 2, 3, 1);
    }
    function drawPupils (coords) {
        // Clear canvas and draw each eye
        ctx.clearRect(0, 0, containerWidth, containerHeight);
        drawEyeball(origins.x1, origins.y1);
        drawEyeball(origins.x2, origins.y2);
        drawPupil(coords.x1, coords.y1);
        drawPupil(coords.x2, coords.y2);
    }
    function getPupilPositionsFromMousePosition (x, y) {
        // Get distances from eye origins to mouse position
        x1 = x - origins.x1;
        y1 = y - origins.y1;
        x2 = x - origins.x2;
        y2 = y - origins.y2;
        
        // Calculate hypotenuse length
        var d1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
        var d2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
        
        // Calculate scale factor of hypotenus to radius
        var sf1 = radius / Math.max(d1, radius);
        var sf2 = radius / Math.max(d2, radius);
        
        // Scale distances and get pupil coordinates relative to canvas
        return {
            x1: origins.x1 + (x1 * sf1),
            y1: origins.y1 + (y1 * sf1),
            x2: origins.x2 + (x2 * sf2),
            y2: origins.y2 + (y2 * sf2)
        };
    }
})();
