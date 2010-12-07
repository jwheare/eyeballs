var Eyeball = (function () {
    function Eyeball (container) {
        // Conf
        this.containerWidth = Eyeball.conf.containerWidth;
        this.containerHeight = Eyeball.conf.containerHeight;
        this.origins = Eyeball.conf.origins;
        this.radius = Eyeball.conf.radius;
        
        // Container dimensions
        this.container = container;
        this.container.style.width = this.containerWidth + 'px';
        this.container.style.height = this.containerHeight + 'px';
        
        // Canvas
        this.canvas = document.createElement('canvas');
        this.context = this.setupCanvas(this.canvas);
        
        // Draw initial state
        this.drawOriginPupils();
        
        // Start blink timeout
        this.resetBlinkTimeout();
        
        Eyeball.balls.push(this);
    }
    
    Eyeball.balls = [];
    Eyeball.conf = {
        containerWidth: 35,
        containerHeight: 17,
        origins: {
            x1: 8,
            y1: 8,
            x2: 26,
            y2: 8
        },
        radius: 4
    };
    Eyeball.init = function () {
        // Find existing eyeballs
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
            new Eyeball(containers[i]);
        }
        
        // Listen for mouse movement
        document.addEventListener('mousemove', function (e) {
            Eyeball.lastMouseCoords = {
                x: e.clientX,
                y: e.clientY
            };
            Eyeball.updatePupils();
        }, false);
    };
    Eyeball.lastMouseCoords = null;
    Eyeball.updatePupils = function () {
        if (Eyeball.lastMouseCoords) {
            for (var i = 0; i < Eyeball.balls.length; i++) {
                Eyeball.balls[i].drawPupilsFromMousePosition(Eyeball.lastMouseCoords);
            }
        }
    };
    Eyeball.prototype = {
        setupCanvas: function (canvas) {
            // Append canvas and setup the 2d drawing context
            canvas.width = this.containerWidth;
            canvas.height = this.containerHeight;
            this.container.appendChild(canvas);
            return canvas.getContext('2d');
        },
        clear: function () {
            this.context.clearRect.apply(this.context, arguments);
        },
        fill: function () {
            this.context.fillStyle = "rgb(0,0,0)";
            this.context.fillRect.apply(this.context, arguments);
        },
        fillWhite: function () {
            this.context.fillStyle = "rgb(255,255,255)";
            this.context.fillRect.apply(this.context, arguments);
        },
        clearCanvas: function () {
            this.clear(0, 0, this.containerWidth, this.containerHeight);
        },
        drawEyeball: function (x, y) {
            this.fill(x - 2, y - 8, 5, 1);
            this.fill(x - 4, y - 7, 2, 1); this.fillWhite(x - 2, y - 7, 5,  1); this.fill(x + 3, y - 7, 2, 1);
            this.fill(x - 5, y - 6, 1, 1); this.fillWhite(x - 4, y - 6, 9,  1); this.fill(x + 5, y - 6, 1, 1);
            this.fill(x - 6, y - 5, 1, 1); this.fillWhite(x - 5, y - 5, 11, 1); this.fill(x + 6, y - 5, 1, 1);
            this.fill(x - 7, y - 4, 1, 2); this.fillWhite(x - 6, y - 4, 13, 2); this.fill(x + 7, y - 4, 1, 2);
            this.fill(x - 8, y - 2, 1, 5); this.fillWhite(x - 7, y - 2, 15, 5); this.fill(x + 8, y - 2, 1, 5);
            this.fill(x - 7, y + 3, 1, 2); this.fillWhite(x - 6, y + 3, 13, 2); this.fill(x + 7, y + 3, 1, 2);
            this.fill(x - 6, y + 5, 1, 1); this.fillWhite(x - 5, y + 5, 11, 1); this.fill(x + 6, y + 5, 1, 1);
            this.fill(x - 5, y + 6, 1, 1); this.fillWhite(x - 4, y + 6, 9,  1); this.fill(x + 5, y + 6, 1, 1);
            this.fill(x - 4, y + 7, 2, 1); this.fillWhite(x - 2, y + 7, 5,  1); this.fill(x + 3, y + 7, 2, 1);
            this.fill(x - 2, y + 8, 5, 1);
        },
        drawPupil: function (x, y) {
            // Pixel circle!
            x = Math.round(x);
            y = Math.round(y);
            this.fill(x - 1, y - 2, 3, 1);
            this.fill(x - 2, y - 1, 5, 1);
            this.fill(x - 2, y    , 5, 1);
            this.fill(x - 2, y + 1, 5, 1);
            this.fill(x - 1, y + 2, 3, 1);
        },
        drawBlinkStart: function (x, y) {
            this.fillWhite(x - 2, y - 7, 5, 1);
            this.fillWhite(x - 4, y - 6, 9, 1);
            this.fillWhite(x - 5, y - 5, 2, 1); this.fill(x - 3, y - 5, 7, 1); this.fillWhite(x + 4, y - 5, 2, 1);
            this.fillWhite(x - 6, y - 4, 1, 1); this.fill(x - 5, y - 4, 2, 1); this.fill     (x + 4, y - 4, 2, 1); this.fillWhite(x + 6, y - 4, 1, 1);
            this.fill     (x - 6, y - 3, 1, 1); this.fill(x + 6, y - 3, 1, 1);
        },
        drawBlinkMiddle: function (x, y) {
            this.fillWhite(x - 2, y - 7, 5,  1);
            this.fillWhite(x - 4, y - 6, 9,  1);
            this.fillWhite(x - 5, y - 5, 11, 1);
            this.fillWhite(x - 6, y - 4, 13, 2);
            this.fillWhite(x - 7, y - 2, 4,  1); this.fill(x - 3, y - 2, 7, 1); this.fillWhite(x + 4, y - 2, 4, 1);
            this.fill     (x - 7, y - 1, 4,  1); this.fill(x + 4, y - 1, 4, 1);
        },
        drawBlinkEnd: function (x, y) {
            this.fillWhite(x - 2, y - 7, 5,  1);
            this.fillWhite(x - 4, y - 6, 9,  1);
            this.fillWhite(x - 5, y - 5, 11, 1);
            this.fillWhite(x - 6, y - 4, 13, 2);
            this.fillWhite(x - 7, y - 2, 15, 5);
            this.fillWhite(x - 6, y + 3, 13, 1);
            this.fill     (x - 6, y + 4, 1,  1); this.fillWhite(x - 5, y + 4, 11, 1); this.fill(x + 6, y + 4, 1, 1);
            this.fill     (x - 5, y + 5, 1,  1); this.fillWhite(x - 4, y + 5, 9,  1); this.fill(x + 5, y + 5, 1, 1);
            this.fill     (x - 4, y + 6, 2,  1); this.fillWhite(x - 2, y + 6, 6,  1); this.fill(x + 3, y + 6, 2, 1);
            this.fill     (x - 2, y + 7, 5,  1);
        },
        drawPupils: function (coords) {
            // Clear canvas and draw each eye
            this.clearCanvas();
            this.drawEyeball(this.origins.x1, this.origins.y1);
            this.drawEyeball(this.origins.x2, this.origins.y2);
            this.drawPupil(coords.x1, coords.y1);
            this.drawPupil(coords.x2, coords.y2);
        },
        animate: function (args) {
            // Abort if a stop has been signalled
            if (args.stopCondition && args.stopCondition()) {
                return;
            }
            if (args.steps.length) {
                var step = args.steps.shift();
                step();
                var self = arguments.callee;
                setTimeout(function() {
                    self(args);
                }, args.timeout);
            }
        },
        stopBlink: false,
        blink: function () {
            this.stopBlink = false;
            var that = this;
            this.animate({
                timeout: 80,
                stopCondition: function () {
                    return that.stopBlink;
                },
                steps: [function s1 () {
                    that.drawBlinkStart(that.origins.x1, that.origins.y1);
                    that.drawBlinkStart(that.origins.x2, that.origins.y2);
                }, function s2 () {
                    that.drawBlinkMiddle(that.origins.x1, that.origins.y1);
                    that.drawBlinkMiddle(that.origins.x2, that.origins.y2);
                }, function s3 () {
                    that.drawBlinkEnd(that.origins.x1, that.origins.y1);
                    that.drawBlinkEnd(that.origins.x2, that.origins.y2);
                }, function s4 () {
                    that.drawOriginPupils();
                    that.drawBlinkMiddle(that.origins.x1, that.origins.y1);
                    that.drawBlinkMiddle(that.origins.x2, that.origins.y2);
                }, function s5 () {
                    that.drawOriginPupils();
                    that.drawBlinkStart(that.origins.x1, that.origins.y1);
                    that.drawBlinkStart(that.origins.x2, that.origins.y2);
                }]
            });
            
            this.resetBlinkTimeout();
        },
        blinkTimeout: null,
        resetBlinkTimeout: function () {
            if (this.blinkTimeout) {
                clearTimeout(this.blinkTimeout);
            }
            var that = this;
            this.blinkTimeout = setTimeout(function () {
                that.blink();
            }, 5000);
        },
        drawOriginPupils: function () {
            this.drawPupils(this.origins);
        },
        drawPupilsFromMousePosition: function (coords) {
            this.stopBlink = true;
            var pupilCoords = this.getPupilPositionsFromMousePosition(coords.x, coords.y);
            this.drawPupils(pupilCoords);
            this.resetBlinkTimeout();
        },
        getOffset: function () {
            var left = 0;
            var top = 0;
            var parent = this.container;
            while (parent) {
                left += parent.offsetLeft;
                top += parent.offsetTop;
                parent = parent.offsetParent;
            }
            return {
                top: top,
                left: left
            };
        },
        getPupilPositionsFromMousePosition: function (x, y) {
            // Normalise x and y to container page offset
            var offset = this.getOffset();
            x = x - offset.left;
            y = y - offset.top;
            
            // Get distances from eye origins to mouse position
            x1 = x - this.origins.x1;
            y1 = y - this.origins.y1;
            x2 = x - this.origins.x2;
            y2 = y - this.origins.y2;
            
            // Calculate hypotenuse
            var d1 = Math.sqrt(Math.pow(x1, 2) + Math.pow(y1, 2));
            var d2 = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2));
            
            // Calculate scale factor of hypotenuse to radius
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
    
    // Engage eyeballs
    Eyeball.init();
    
    return Eyeball;
})();
