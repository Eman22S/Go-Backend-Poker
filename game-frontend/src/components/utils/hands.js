let hands = {
    "royal_flush": 0,
    "straight_flush": 0,
    "four_of_a_kind": 0,
    "four_aces": 0,
    "four_fives_through_kings": 0,
    "four_twos_threes_or_fours": 0,
    "full_house": 0,
    "flush": 0,
    "straight": 0,
    "three_of_a_kind": 0,
    "two_pair": 0,
    "jacks_or_better": 0,
    "pair": 0,
    "one_jack_or_better": 0,
    "high_card": 0
  };

  /**
   *  extract nul
   * @param {*} obj
   * @returns
   */
  const extratZeroHands = (obj) => {
    const zeroHands = []
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        extratZeroHands(obj[key]);
      } else {
      if(key in hands) {
          hands= {...hands , [key]: hands[key]+ obj[key] };

          }
      }
    });

    for(let keys in hands){
        if(hands[keys] === 0){
          zeroHands.push(keys)
      }
    }

    return zeroHands;
  }

  const removeKeys = (obj, keys) =>{
    let index;
    for (let prop in obj) {
        if(obj.hasOwnProperty(prop)){
            switch(typeof(obj[prop])){
                case 'number':
                    index = keys.indexOf(prop);
                    if(index > -1){
                        delete obj[prop];
                    }
                    break;
                case 'object':
                    index = keys.indexOf(prop);
                    if(index > -1){
                        delete obj[prop];
                    }else{
                        removeKeys(obj[prop], keys);
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return obj;
}

const filterHands = (obj) =>{
    const handsToBeRemoved = extratZeroHands(obj);
    return removeKeys(obj,handsToBeRemoved);
}

export { filterHands};