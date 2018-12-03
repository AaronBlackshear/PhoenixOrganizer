import forEach from 'lodash/forEach';

const compare = (obj1, obj2) => {
  let isEqual = true;
  if (obj1 === null || obj2 === null) {
    return false
  } else if (Object.keys(obj1).length > 1 && Object.keys(obj2).length > 1) {
    return true;
  } else if (Object.keys(obj1).length > 1 || Object.keys(obj2).length > 1) {
    return false;
  } else {
    forEach(obj1, (value, key) => {
      if (value !== obj2[key]) isEqual = false
    });
  }
  return isEqual;
}

export default compare;
