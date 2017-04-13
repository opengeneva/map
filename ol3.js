var map = new ol.Map({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.Stamen({
              layer: 'toner',
              opacity : 0.5
            })
          }),
          // new ol.layer.Tile({
          //   source: new ol.source.Stamen({
          //     layer: 'terrain-labels',
          //     opacity : 0.5
          //   })
          // })
        ],
        target: 'map',
        view: new ol.View({
          center: ol.proj.transform(
              [6.143157699999961 ,46.2043907], 'EPSG:4326', 'EPSG:3857'),
          zoom: 12
        })
      });

//var iconStyleRed = new ol.style.Style({
//          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
//            anchor: [0.5, 10],
//            anchorXUnits: 'fraction',
//            anchorYUnits: 'pixels',
//            opacity: 0.75,
//            src: 'img/marker.png'
//          }))
//        });

var comingFeatures=[];
var pastFeatures=[];


// var iconFeature1 = new ol.Feature({
//   geometry: new ol.geom.Point(ol.proj.transform([-0.1244324, 51.5006728], 'EPSG:4326',
//   'EPSG:3857')),
//   name: 'name2',
//   url: "www.name2.com",
//   date: "1/1/2017"
// });

//iconFeatures.push(iconFeature);
//iconFeatures.push(iconFeature1);


function updateMap(){
	console.log("executing update Map...");
	var vectorSource1 = new ol.source.Vector({
	  features: comingFeatures //add an array of features
	});

	var vectorSource2 = new ol.source.Vector({
  		features: pastFeatures //add an array of features
	});

	var iconStyleGrey = new ol.style.Style({
	  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	    anchor: [0.8, 10],
	    anchorXUnits: 'fraction',
	    anchorYUnits: 'pixels',
	    opacity: 0.75,
	    src: 'img/markerGrey.png'
	  }))
	});

	//coming events red color
	var vectorLayer1 = new ol.layer.Vector({
	  source: vectorSource1//,
	//  style: iconStyleRed
	});

	//Past Events Gray color
	var vectorLayer2 = new ol.layer.Vector({
	  source: vectorSource2,
	  style: iconStyleGrey
	});

	map.addLayer(vectorLayer2);
	map.addLayer(vectorLayer1);


	map.changed();




	     // -- Display information on singleclick --

	// Create a popup overlay which will be used to display feature info
	var popup = new ol.Overlay.Popup();
	map.addOverlay(popup);

	// Add an event handler for the map "singleclick" event
	//map.on('singleclick', function(evt) {
  map.on('singleclick', function(evt) {
  	console.log("on single click ...");
	    // Hide existing popup and reset it's offset
	    popup.hide();
	    popup.setOffset([0, 0]);

	    // Attempt to find a feature in one of the visible vector layers
	    var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
	        return feature;
	    });

	    if (feature) {

	        var coord = feature.getGeometry().getCoordinates();


	        var props = feature.getProperties();
          console.log(props.url);
          var info = "<h3>" + props.hackathon + "</h3>";
	            info += "<p> "+ props.organizer + "</p>";
              //info += "<p><a href=" + props.twitter + " target='_blank' >" + props.twitter + "</a></p>";
              info += "<a href=" + props.url + " target='_blank' >website</a>";
              // info += "<p> "+ props.contact + " (" + props.contact_email + ")</p>";
              // info += "<p> "+ props.contact_email + "</a></p>";
	            // info += "<p>" + props.place + "</p>";
	        // Offset the popup so it points at the middle of the marker not the tip
	        popup.setOffset([0, -22]);
	        popup.show(coord, info);

	    }

});
}
