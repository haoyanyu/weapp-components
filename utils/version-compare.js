// currVer > targetVer --> true
const versionCompare = (currVer, targetVer) => {
  currVer = currVer || '0.0.0';
  targetVer = targetVer || '0.0.0';

  if (currVer === targetVer) return true;

  var currVerArr = currVer.split('.');
  var targetVerArr = targetVer.split('.');
  var len = Math.max(targetVerArr.length, currVerArr.length);
  for (var i = 0; i < len; i++) {
    const curVal = ~~currVerArr[i];
    const tarVal = ~~targetVerArr[i];
    if (curVal > tarVal) {
      return true;
    } else if (curVal < tarVal) {
      return false;
    }
  }
  return true;
};

export default versionCompare;
