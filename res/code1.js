const stage = new xCanvas.Stage('stage', {zoomChange: 0.5, zoom: 1, maxZoom: 100});
stage.on('mousemove', e => {
  const layer = stage.getLayerByPosition(e.pos);
  stage.clearHighLightLayer();
  if (layer) {
    layer.highLight({fill: false, stroke: true, weight: 0.1});
    stage.hilightLayers();
  }
});
let bound = null;
const textLayerGroup = new xCanvas.LayerGroup([]);
this.$Http.getJSONResource('china').then(({features}) => {
  stage.startBatch();
  for (const feature of features) {
    let points = feature.geometry.coordinates;
    const fillColor = getRandomColor();
    if (points[0] && Array.isArray(points[0])) {
      points.forEach(pts => {
        const polygon = new xCanvas.Polygon(pts, {fill: true, stroke: false, fillColor }).addTo(stage);
        bound = bound ? bound.union(polygon.getBound()) : polygon.getBound();
      })
    } else {
      const polygon = new xCanvas.Polygon(points, {fill: true, stroke: false, fillColor }).addTo(stage);
      bound = bound ? bound.union(polygon.getBound()) : polygon.getBound();
    }
    const { center, name } = feature.properties;
    if (name && center) {
      textLayerGroup.addLayer(new xCanvas.IText(center, name, { fontSize: 1, color: '#000000', textAlign: 'center' }));
    }
  }
  stage.addLayer(textLayerGroup);
  stage.setView(bound.getCenter(), 5);
  stage.endBatch();
});
function getRandomColor() {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
