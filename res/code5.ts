// 计算点到直线最近的距离
public getNearestPoint(p: XY | Vertex) {
  p = Base.transformPointToArray(p);
  const nearestPoints: Array<{dis: number, pos: Vertex}> = [];
  const flatList = this.coordinates.flat();
  if (Array.isArray(flatList[0])) {
    for (const coords of this.coordinates) {
      const geos = coords as Vertex[];
      for (let i = 0; i < geos.length - 1; i++) {
        const pos = Line.getNearestPointToSegment(p, geos[i], geos[i + 1]);
        const dis = Base.getSquareDistance(p, pos);
        nearestPoints.push({dis, pos});
      }
    }
  } else {
    const coords = this.coordinates as Vertex[];
    for (let i = 0; i < coords.length - 1; i++) {
      const pos = Line.getNearestPointToSegment(p, coords[i], coords[i + 1]);
      const dis = Base.getSquareDistance(p, pos);
      nearestPoints.push({dis, pos});
    }
  }
  nearestPoints.sort((a, b) => {
    return a.dis - b.dis;
  });
  return nearestPoints[0].pos;
}

/**
   * 返回到线段上最近的点
   * @param p 待测点
   * @param v0 线段起点
   * @param v1 线段终点
   */
  public static getNearestPointToSegment(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): Vertex {
    [p, v0, v1] = Base.transformPointsToArray([p, v0, v1]);
    const pedal: Vector2 = this.getPedalPointOfLine(p, v0, v1);
    if (this.isPointAtSegment(pedal, v0, v1)) {
      return [pedal.x, pedal.y];
    } else {
      const dis1 = Base.getSquareDistance(p, v0);
      const dis2 = Base.getSquareDistance(p, v1);
      return dis1 < dis2 ? Base.transformPointToArray(v0) : Base.transformPointToArray(v1);
    }
  }

   /**
   * 求点到直线的垂足
   * @param pt 目标点
   * @param v0 直线起点
   * @param v1 直线终点
   */
  public static getPedalPointOfLine(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex): Vector2 {
    [p, v0, v1] = Base.transformPointsToXY([p, v0, v1]);
    const vec0: Vector2 = new Vector2(p.x - v0.x, p.y - v0.y);
    const vec1: Vector2 = new Vector2(v1.x - v0.x, v1.y - v0.y);
    const dot: number = Operation.getDotMultiply(vec0, vec1);
    const dis: number = dot / vec1.getModelLength();
    return new Vector2(v0.x, v0.y).add(vec1.normalize().scale(dis));
  }
  
 /**
   * 求点到直线的距离
   * @param pt 目标点
   * @param v0 直线起点
   * @param v1 直线终点
   */
  public static getDistanceToLine(p: XY | Vertex, v0: XY | Vertex, v1: XY | Vertex) {
    [p, v0, v1] = Base.transformPointsToArray([p, v0, v1]);
    const vec0: Vector2 = new Vector2(p[0] - v0[0], p[1] - v0[1]);
    const vec1: Vector2 = new Vector2(v1[0] - v0[0], v1[1] - v0[1]);
    const cross: number = Operation.getCrossMultiply(vec0, vec1);
    return Math.abs(cross / vec1.getModelLength());
  }