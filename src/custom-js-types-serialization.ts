export function applyCustomSerializationToJsTypes() {
  // @ts-ignore
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };
  Date.prototype.toJSON = function () {
    return this.valueOf();
  };
}
