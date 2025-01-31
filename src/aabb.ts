// aabb.ts

/**
 * An Axis-Aligned Bounding Box. This is a rectangular region defined in terms
 * of minimum and maximum X and Y values.
 */
export type Aabb = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
};

/**
 * Create and return an empty AABB, using Infinity and -Infinity for the min/max
 * values respectively.
 */
export const initAabb = (): Aabb => {
  return {
    minX: Infinity,
    maxX: -Infinity,
    minY: Infinity,
    maxY: -Infinity,
  };
};

/**
 * Adds a point to a bounding box. If the point is outside the bounding box, the
 * box's extents will grow. If it is inside the box, this has no effect.
 */
export const addPoint = (aabb: Aabb, x: number, y: number): void => {
  aabb.minX = Math.min(x, aabb.minX);
  aabb.minY = Math.min(y, aabb.minY);
  aabb.maxX = Math.max(x, aabb.maxX);
  aabb.maxY = Math.max(y, aabb.maxY);
};

/**
 * If the given AABB has been initialized with at least one point, return true.
 * Otherwise return false.
 */
export const hasData = (aabb): boolean => {
  return (
    aabb.minX !== Infinity &&
    aabb.minY !== Infinity &&
    aabb.maxX !== -Infinity &&
    aabb.maxY !== -Infinity
  );
};

/**
 * Returns the height (change in y) of this bounding box. If the bounding box
 * does not have data (according to `hasData`) this returns NaN. If the box has
 * only a single point, it has no width, height, or area, so it should return
 * zero in that case.
 */
export const getHeight = (aabb: Aabb): number => {
  if (!hasData(aabb)) {
    return NaN;
  }
  return aabb.maxY - aabb.minY;
};

/**
 * Just like getHeight, but for width.
 */
export const getWidth = (aabb: Aabb): number => {
  if (!hasData(aabb)) {
    return NaN;
  }
  return aabb.maxX - aabb.minX;
};

/**
 * Computes the area (width * height) of a box. If the bounding box does not
 * have data (according to `hasData`) this returns NaN.
 */
export const getArea = (aabb: Aabb): number => {
  if (!hasData(aabb)) {
    return NaN;
  }
  return (aabb.maxX - aabb.minX) * (aabb.maxY - aabb.minY);
};

/**
 * Given two boxes, return their intersection as an AABB.
 *
 * If there is no such overlapping rectangle, return the same thing as
 * initAabb().
 **/
export const intersect = (box1: Aabb, box2: Aabb): Aabb => {
  /*no overlap*/
  if (
    box1.maxX < box2.minX ||
    box2.maxX < box1.minX ||
    box1.minX > box2.maxX ||
    box2.minX > box1.maxX ||
    box1.maxY < box2.minY ||
    box2.maxY < box1.minY ||
    box1.minY > box2.maxY ||
    box2.minY > box1.maxY
  ) {
    return initAabb();
  } else {
    const newboxminX = Math.max(box1.minX, box2.minX);
    const newboxminY = Math.max(box1.minY, box2.minY);
    const newboxmaxX = Math.min(box1.maxX, box2.maxX);
    const newboxmaxY = Math.min(box1.maxY, box2.maxY);
    return {
      minX: newboxminX,
      minY: newboxminY,
      maxX: newboxmaxX,
      maxY: newboxmaxY,
    };
  }
};
/*Test*/
