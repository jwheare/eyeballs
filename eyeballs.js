(function () {
    function Eyeball (container) {
        // Conf
        this.containerWidth = 35;
        this.containerHeight = 17;
        this.origins = {
            x1: 8,
            y1: 8,
            x2: 26,
            y2: 8
        };
        this.radius = 5;
        
        // Container dimensions
        this.container = container;
        this.container.style.width = this.containerWidth + 'px';
        this.container.style.height = this.containerHeight + 'px';
        
        // Canvas
        this.context = this.setupCanvas();
        
        // Listen for mouse movement
        this.bindMouseMoveListener();
        
        // Draw initial state
        this.drawOriginPupils();
    }
    Eyeball.prototype = {
        setupCanvas: function () {
            // Append canvas and setup the 2d drawing context
            var eyeCanvas = document.createElement('canvas');
            eyeCanvas.width = this.containerWidth;
            eyeCanvas.height = this.containerHeight;
            this.container.appendChild(eyeCanvas);
            return eyeCanvas.getContext('2d');
        },
        drawEyeball: function (x, y) {
            this.context.fillRect(x - 2, y - 8, 5, 1);
            this.context.fillRect(x - 4, y - 7, 2, 1); this.context.fillRect(x + 3, y - 7, 2, 1);
            this.context.fillRect(x - 5, y - 6, 1, 1); this.context.fillRect(x + 5, y - 6, 1, 1);
            this.context.fillRect(x - 6, y - 5, 1, 1); this.context.fillRect(x + 6, y - 5, 1, 1);
            this.context.fillRect(x - 7, y - 4, 1, 2); this.context.fillRect(x + 7, y - 4, 1, 2);
            this.context.fillRect(x - 8, y - 2, 1, 5); this.context.fillRect(x + 8, y - 2, 1, 5);
            this.context.fillRect(x - 7, y + 3, 1, 2); this.context.fillRect(x + 7, y + 3, 1, 2);
            this.context.fillRect(x - 6, y + 5, 1, 1); this.context.fillRect(x + 6, y + 5, 1, 1);
            this.context.fillRect(x - 5, y + 6, 1, 1); this.context.fillRect(x + 5, y + 6, 1, 1);
            this.context.fillRect(x - 4, y + 7, 2, 1); this.context.fillRect(x + 3, y + 7, 2, 1);
            this.context.fillRect(x - 2, y + 8, 5, 1);
        },
        drawOriginPupils: function () {
            this.drawPupils(this.origins);
        },
        bindMouseMoveListener: function () {
            var that = this;
            document.addEventListener('mousemove', function (e) {
                that.drawPupils(that.getPupilPositionsFromMousePosition(e.x, e.y));
            }, false);
        },
        drawPupil: function (x, y) {
            // Pixel circle!
            x = Math.round(x);
            y = Math.round(y);
            this.context.fillRect(x - 1, y - 2, 3, 1);
            this.context.fillRect(x - 2, y - 1, 5, 1);
            this.context.fillRect(x - 2, y    , 5, 1);
            this.context.fillRect(x - 2, y + 1, 5, 1);
            this.context.fillRect(x - 1, y + 2, 3, 1);
        },
        clearCanvas: function () {
            this.context.clearRect(0, 0, this.containerWidth, this.containerHeight);
        },
        drawPupils: function (coords) {
            // Clear canvas and draw each eye
            this.clearCanvas();
            this.drawEyeball(this.origins.x1, this.origins.y1);
            this.drawEyeball(this.origins.x2, this.origins.y2);
            this.drawPupil(coords.x1, coords.y1);
            this.drawPupil(coords.x2, coords.y2);
        },
        getPupilPositionsFromMousePosition: function (x, y) {
            // Normalise x and y to container page offset
            x = x - this.container.offsetLeft;
            y = y - this.container.offsetTop;
            
            // Get distances from eye origins to mouse position
            x1 = x - this.origins.x1;
            y1 = y - this.origins.y1;
            x2 = x - this.origins.x2;
            y2 = y - this.origins.y2;
            
            // Calculate hypotenuse length
            var d1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
            var d2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
            
            // Calculate scale factor of hypotenus to radius
            var sf1 = this.radius / Math.max(d1, this.radius);
            var sf2 = this.radius / Math.max(d2, this.radius);
            
            // Scale distances and get pupil coordinates relative to canvas
            return {
                x1: this.origins.x1 + (x1 * sf1),
                y1: this.origins.y1 + (y1 * sf1),
                x2: this.origins.x2 + (x2 * sf2),
                y2: this.origins.y2 + (y2 * sf2)
            };
        }
    };
    
    // Setup eyeballs
    var i, containers = [];
    if ('getElementsByClassName' in document) {
        containers = document.getElementsByClassName('eyeball');
    } else {
        var elements = document.getElementsByTagName('*');
        for (i = 0; i < elements.length; i++) {
            if (elements[i].className.match(/\beyeball\b/, 'g')) {
                containers.push(elements[i]);
            }
        }
    }
    for (i = 0; i < containers.length; i++) {
        var eyeball = new Eyeball(containers[i]);
    }
})();
