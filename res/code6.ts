public contain(pt: XY | Vertex, tolerance: number = 2): boolean {
  pt = Base.transformPointToArray(pt);
  const bound: Bound = this.getBound();
  if (!bound.contain(pt)) {
    return false;
  }
  const flatList = this.coordinates.flat();
  if (Array.isArray(flatList[0])) {
    for (const coords of this.coordinates) {
      const geos = coords as Vertex[];
      if (geos.length === 2) {
        const dis = Line.getDistanceToLine(pt, geos[0], geos[1]);
        if (dis < tolerance) {
          return true;
        }
      } else if (this.isPointAtPolygon(pt, geos)) {
        return true;
      }
    }
  } else{
    return this.isPointAtPolygon(pt, this.coordinates as Vertex[]);
  }
  return false;
}

private _isWithInTrapezoid(pt: Vertex, curPt: Vertex, nextPt: Vertex): boolean {
  const maxY: number = Math.max(curPt[1], nextPt[1]);
  const minY: number = Math.min(curPt[1], nextPt[1]);
  return Base.isLeftOfLine(pt, curPt, nextPt) && pt[1] > minY && pt[1] < maxY;
}


public static isLeftOfLine(pt: Vertex, v1: Vertex, v2: Vertex): boolean {
  let [bottomPt, topPt] = [new Vector2(v1), new Vector2(v2)];
  if (bottomPt.y > topPt.y) {
    [bottomPt, topPt] = [topPt, bottomPt];
  }
  const base: Vector2 = new Vector2(topPt.x - bottomPt.x, topPt.y - bottomPt.y);
  const comVec: Vector2 = new Vector2(pt[0] - bottomPt.x, pt[1] - bottomPt.y);
  return Operation.getCrossMultiply(base, comVec) > 0;
}
