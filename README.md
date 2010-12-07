eyeballs.js — a JavaScript implementation of the Mac System 6 era Eyeballs menubar extension.

1. Copy eyeballs.js to your server.
2. Shove a `<div class="eyeball></div>` in your HTML where you want your eyeballs — you can have more than one!
3. Pop `<script src="eyeballs.js"></script>` at the end of your HTML `<body>` to bring those balls to life.
You can position and style div.eyeball with CSS, but I'd leave the dimensions padding and border alone.

You can also programmatically create new eyeballs after loading the script with the `new Eyeball(container)` constructor.