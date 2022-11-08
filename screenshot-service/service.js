
var casper = require('casper').create({
  verbose: false,
  logLevel: "error"
});

casper.on('resource.requested', function(request) { 
  this.echo(JSON.stringify(request, null, 4));
});

casper.on('resource.received', function(request) { 
  this.echo(JSON.stringify(request, null, 4));
});

var screenshotUrl = 'http://google.com/',
    screenshotNow = new Date(),
    screenshotDateTime = screenshotNow.getFullYear() + pad(screenshotNow.getMonth() + 1) + pad(screenshotNow.getDate()) + '-' + pad(screenshotNow.getHours()) + pad(screenshotNow.getMinutes()) + pad(screenshotNow.getSeconds()),
    viewports = [
      {
        'name': 'samsung-galaxy_y-portrait',
        'viewport': {width: 240, height: 320}
      },
  /*    {
        'name': 'samsung-galaxy_y-landscape',
        'viewport': {width: 320, height: 240}
      },
      {
        'name': 'iphone5-portrait',
        'viewport': {width: 320, height: 568}
      },
      {
        'name': 'iphone5-landscape',
        'viewport': {width: 568, height: 320}
      },
      {
        'name': 'htc-one-portrait',
        'viewport': {width: 360, height: 640}
      },
      {
        'name': 'htc-one-landscape',
        'viewport': {width: 640, height: 360}
      },
      {
        'name': 'nokia-lumia-920-portrait',
        'viewport': {width: 240, height: 320}
      },
      {
        'name': 'nokia-lumia-920-landscape',
        'viewport': {width: 320, height: 240}
      },
      {
        'name': 'google-nexus-7-portrait',
        'viewport': {width: 603, height: 966}
      },
      {
        'name': 'google-nexus-7-landscape',
        'viewport': {width: 966, height: 603}
      },
	  {
        'name': 'google-nexus-4-portrait',
        'viewport': {width: 348, height: 519}
      },
      {
        'name': 'google-nexus-4-landscape',
        'viewport': {width: 519, height: 348}
      },	  
      {
        'name': 'ipad-portrait',
        'viewport': {width: 768, height: 1024}
      },
      {
        'name': 'ipad-landscape',
        'viewport': {width: 1024, height: 768}
      },
      {
        'name': 'desktop-standard-vga',
        'viewport': {width: 640, height: 480}
      },
      {
        'name': 'desktop-standard-svga',
        'viewport': {width: 800, height: 600}
      },
      {
        'name': 'desktop-standard-hd',
        'viewport': {width: 1280, height: 720}
      },
      {
        'name': 'desktop-standard-sxga',
        'viewport': {width: 1280, height: 1024}
      },
      {
        'name': 'desktop-standard-sxga-plus',
        'viewport': {width: 1400, height: 1050}
      },
      {
        'name': 'desktop-standard-uxga',
        'viewport': {width: 1600, height: 1200}
      },
      {
        'name': 'desktop-standard-wuxga',
        'viewport': {width: 1920, height: 1200}
      },*/
    ];

if (casper.cli.args.length < 1) {
  casper
    .echo("Usage: $ casperjs screenshots.js http://example.com")
    .exit(1)
  ;
} else {
  screenshotUrl = casper.cli.args[0];
}


casper.start(screenshotUrl, function() {
  //this.echo('Current location is ' + this.getCurrentUrl(), 'info');
});

casper.each(viewports, function(casper, viewport) {
  this.then(function() {
    this.viewport(viewport.viewport.width, viewport.viewport.height);
  });
  this.thenOpen(screenshotUrl, function() {
    this.wait(5000);
  });
  this.then(function(){
    //this.echo('Screenshot for ' + viewport.name + ' (' + viewport.viewport.width + 'x' + viewport.viewport.height + ')', 'info');
    this.capture('screenshots/' + screenshotDateTime + '/' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png', {
        top: 0,
        left: 0,
        width: viewport.viewport.width,
        height: viewport.viewport.height
    });
  });
});

casper.run();

function pad(number) {
  var r = String(number);
  if ( r.length === 1 ) {
    r = '0' + r;
  }
  return r;
}