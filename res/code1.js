const stage = new xCanvas.Stage('stage', {zoomChange: 0.5, zoom: 1});
// const circle = new xCanvas.Circle([0, 0], 30, {fill: true, fillColor: '#ff0000', stroke: false}).addTo(stage);
// const bound = circle.getBound();
// const rect = new xCanvas.Polygon(bound.getVetexs(), {fill: false, stroke: true}).addTo(stage);
// stage.on('mousemove', e => {
//   const layer = stage.getLayerByPosition(e.pos);
//   stage.clearHighLightLayer();
//   if (layer) {
//     layer.highLight();
//     stage.hilightLayers();
//   }
// });
function getRandomColor() {
  const r = Math.floor(Math.random()*256);
  const g = Math.floor(Math.random()*256);
  const b = Math.floor(Math.random()*256);
  const color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
  return color;
}
let bound = null;
this.$Http.getJSONResource('china').then(({features}) => {
  for (const feature of features) {
    let points = feature.geometry.coordinates;
    if (points[0] && Array.isArray(points[0])) {
      points = points[0];
    }
    const { center, name } = feature.properties;
    new xCanvas.IText(center, name, { fontSize: 2, maxLength: 120 }).addTo(stage);
    const polygon = new xCanvas.Polygon(points, {fill: true, stroke: false, fillColor: getRandomColor()}).addTo(stage);
    bound = bound ? bound.union(polygon.getBound()) : polygon.getBound();
  }
  stage.setView(bound.getCenter(), 5);
});
