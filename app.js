'use strict';
const fs = require('node:fs');
const readline = require('node:readline');
const rs = fs.createReadStream('./popu-pref.csv');
const rl = readline.createInterface({ input: rs});
const prefectureDateMap = new Map(); //key: 都道府県　value:集計データのオブジェクト
rl.on('line', lineString => {
  const columes = lineString.split(',');
  const year = parseInt(columes[0]);
  const prefecture = columes[1];
  const popu = parseInt(columes[3]);
  if (year === 2016 || year === 2021){
    let value = null;
    if (prefectureDateMap.has(prefecture)){
      value = prefectureDateMap.get(prefecture);
    } else {
      value ={
        before: 0,
        after: 0,
        change: null
      };
    }
    if (year === 2016){
      value.before = popu ;
    }
    if (year === 2021){
      value.after = popu;
    }
    prefectureDateMap.set(prefecture, value);
  }
});
rl.on('close', () => {
  for (const [key, value] of prefectureDateMap)
  {
    value.change = value.after / value.before;
  }
  const rankingArray = Array.from(prefectureDateMap).sort((pair1, pair2) => {
    return pair2[1].change - pair1[1].changee;
  });
  console.log(rankingArray);
});