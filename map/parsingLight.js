var eventList = [];


$(document).ready(function() {
    console.log("Starting map..");
    $.ajax({
        type: "GET",
        url: "./data/OGHEvents2.tsv",
        dataType: "text",
        success: function(data) {
            console.log("Excel retrieved!");
            processData(data);}
     });
});

function processData(allText) {

    //
    //
    console.log("processing data from new TSV file .... ");

    var allTextLines = allText.split(/\r\n|\n/);
    var headers = allTextLines[0].split('\t');
    var lines = [];

    for (var i=1; i<allTextLines.length; i++) {
        var hackathon;
        var organizer;
        var place;
	      var lat;
	      var lon;

        var data = allTextLines[i].split('\t');


        hackathon = data[0];
        organizer = data[1];
        contact = data[2];
        contact_email	= data[3];
        place	= data[4];
        adresse = data[5];
        latitude = data[6];
        longitude = data[7];
        icon = data[8];
        url = data[9];
        twitter = data[10];

        console.log(hackathon + " " + organizer + " " + contact + " " + contact_email + " " + place + " " + latitude + " " + longitude + " " + icon + " " + url);

         eventList.push({
              hackathon: hackathon,
              organizer: organizer,
              contact : contact,
              contact_email : contact_email,
              place: place,
              lat: parseFloat(latitude),
              lon: parseFloat(longitude),
              icon : icon,
              url: url,
              twitter : twitter,
          });


    }// end for

    //we map all the events. It could be optimized by streaming the map instead
    //of having them en memory. Memory is more flexible to change the order of injection of events.
    for (var i=0; i<eventList.length; i++){
        mapEvent(i);
    }

    //finally we update the map
    updateMap();




}// end processingData()




function mapEvent(i){
        console.log("New feature -- LAT:-" + eventList[i].lat + "-    LON: -" + eventList[i].lon +"-");
        var eventFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([eventList[i].lon, eventList[i].lat], 'EPSG:4326',
          'EPSG:3857')),
          hackathon: eventList[i].hackathon,
          organizer: eventList[i].organizer,
          contact: eventList[i].contact,
          contact_email: eventList[i].contact_email,
          place: eventList[i].place,
          url: eventList[i].url,
          twitter : eventList[i].twitter,
        });
	eventFeature.setStyle(new ol.style.Style({
          image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
            anchor: [0.5, 10],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            opacity: 0.90,
            scale : 0.5,
            //src: 'img/marker'+i+'.png'
            src: 'img/marker_' + eventList[i].icon,
                 }))
          }));
        comingFeatures.push(eventFeature);
        console.log("Event Feature planned added!" + i + " -- name: " + eventList[i].name);


    }
