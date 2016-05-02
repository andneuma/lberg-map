var all = function() {

  map = L.map('map');
  map.options.minZoom = 2;
  url = '//tile-{s}.openstreetmap.fr/hot/{z}/{x}/{y}.png';
  baselayer = L.tileLayer(url, {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  });
  map.addLayer(baselayer);
  map.setView([52.513, 13.474], 12);

  jQuery.each(window.placesJson, function( index, feature ) {
    var openPopup = function(e) {
      jQuery('.popup').remove();
      jQuery('#map').append("<div class='popup'>" +
                                feature.properties.name +
                                ' (' + feature.properties.categories + ')' +
                            "</div>");
    };
    L.circleMarker(feature.geometry.coordinates, {radius: 8, fillOpacity: 0.5})
      .on('click', openPopup)
      .addTo(map);
  });
  console.log(window.placesJson[0]);

  jQuery('#reverse_geocoding').click(function() {
    jQuery.ajax({
      type: 'POST',
      url: '/reverse_geocoding',
      data: {longitude: 12, latitude: 52},
      dataType: 'script',
      success: function(response) {
        console.log('success');
      },
      error: function(xhr) {
        console.log(xhr.responseText);
      }
    });
  });
};

jQuery(function() { all(); });
jQuery(document).on('page:load', all);
