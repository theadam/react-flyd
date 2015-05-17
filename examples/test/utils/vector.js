export default function Vector(x, y){
  this.x = x;
  this.y = y;
}

Vector.add = function(left, right){
  return new Vector(left.x + right.x, left.y + right.y);
};
