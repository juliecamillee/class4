var map = L.map('map').setView([40.721762,-74.000473], 10);

L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',{
     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
    }).addTo(map);

function getColor(b) {
    return b < 0        ? '#ffffcc' :
           b < 50000    ? '#c7e9b4' :
           b < 100000   ? '#7fcdbb' :
           b < 150000   ? '#41b6c4' :
           b < 200000   ? '#1d91c0' :
           b < 250000   ? '#225ea8' :
                      '#0c2c84';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.cbs_pop_2010),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 0.5
    };
  }

  function mouseoverFunction(e) {
  var layer = e.target;

    layer.setStyle({
        weight: 1,
        color: 'white',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }

    $('#infoWindow').text(layer.feature.properties.cbs_pop_2010);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: mouseoverFunction,
        mouseout: resetHighlight
    });
  }

  var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [50000, 100000, 150000, 200000, 250000],
        labels = [];

    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 0.1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

  $.getJSON('data/comdata.geojson', function(comdata) {
    geojson = L.geoJson(comdata,{
      style: style,
      onEachFeature: onEachFeature
    }).addTo(map);
  });
