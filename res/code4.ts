import Operation from './operation';
import { Vertex } from '../../typeof/typeof';

export default class Vector2 {
  // 取插值向量
  public static lerp(vec1: Vector2, vec2: Vector2, lerp: number): Vector2 {
    const dir: Vector2 = new Vector2(vec2.x - vec1.x, vec2.y - vec2.y);
    return vec1.add(dir.scale(lerp));
  }
  public x: number;
  public y: number;
  constructor(a: any, b?: number) {
    if (typeof a === 'number' && typeof b === 'number') {
      this.x = a;
      this.y = b;
    } else if (a instanceof Array && a.length > 1 && b === undefined) {
      this.x = a[0];
      this.y = a[1];
    } else {
      if (!a.hasOwnProperty('x') || !a.hasOwnProperty('y')) {
        console.error('Vector constructor call a error.');
      }
      this.x = a.x;
      this.y = a.y;
    }
  }
  // 加一个向量
  public add(vector2: Vector2): Vector2 {
    this.x += Number(vector2.x);
    this.y += Number(vector2.y);
    return this;
  }
  // 减一个向量
  public substract(vector2: Vector2): Vector2 {
    this.x -= Number(vector2.x);
    this.y -= Number(vector2.y);
    return this;
  }
  // 向量单位化
  public normalize(): Vector2 {
    const dis = this.getModelLength();
    if (dis === 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(this.x / dis, this.y / dis);
  }
  public clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }
  // 绕原点旋转向量
  public rotate(angle: number): Vector2 {
    const rotatedRad: number = Operation.degreeToRadius(angle);
    const x = this.x * Math.cos(rotatedRad) - this.y * Math.sin(rotatedRad);
    const y = this.x * Math.sin(rotatedRad) + this.y * Math.cos(rotatedRad);
    this.x = x;
    this.y = y;
    return this;
  }
  // 缩放向量模长
  public scale(scale_x: number, scale_y?: number): Vector2 {
    this.x *= scale_x;
    this.y *= scale_y || scale_x;
    return this;
  }
  public getSquareLength(): number {
    return this.x ** 2 + this.y ** 2;
  }
  public getModelLength(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  public toArray(): Vertex {
    return [this.x, this.y];
  }
}

/**
import { Vertex } from '../../typeof/typeof';
export default class Vector2 {
  static lerp(vec1: Vector2, vec2: Vector2, lerp: number): Vector2;
  x: number;
  y: number;
  constructor(a: any, b?: number);
  add(vector2: Vector2): Vector2;
  substract(vector2: Vector2): Vector2;
  normalize(): Vector2;
  clone(): Vector2;
  rotate(angle: number): Vector2;
  scale(scale_x: number, scale_y?: number): Vector2;
  getSquareLength(): number;
  getModelLength(): number;
  toArray(): Vertex;
}
 */