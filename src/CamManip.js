import CamObjects from './CamObjects'

const camTemps = CamObjects;
const similarCamData =[];

for (var i = 0; i < camTemps.length; i++){
  similarCamData.push({"id": camTemps[i].id, "sim2Ids": []});
  for (var j = 0; j < camTemps.length; j++){
      const selH = camTemps[i].highMM;
      const selL = camTemps[i].lowMM;
      const testH = camTemps[j].highMM;
      const testL = camTemps[j].lowMM;
      var overlap = 0;
      if ((inBetween(testL, selL, selH)) || (inBetween(testH, selL, selH))){ //FILTERS OUT CASES 1,2,10,11
        if ((testL < selH)&&(selL < testH)&&(testH < selH)){ //TEST CASE 3 OVERLAPPING
          overlap = (testH - selL);
        }
        else if ((testL > selL)&&(selH > testL)&&(testH > selH)){ //TEST CASE 9 OVERLAPPING
          overlap = (selH - testL);
        }
        else{ //ALL OTHER CASES
          overlap = (testH - testL);
        }
        const oPercent = (overlap /(selH - selL));
        const simObjectArray2Add = {"sim2id": camTemps[j].id, "overlap": overlap, "overlapPercent": oPercent}
        similarCamData[i].sim2Ids.push(simObjectArray2Add);
      }
  }
}

function inBetween(point, low, high) {
  return ((point - low)*(point - high) <= 0);
}

/*      PRINT THE NUMBER OF SIMILAR ID OBJECTS
function countProps(obj){
  return Object.keys(obj).length;
}
for (var i = 0; i < camTemps.length; i++){
  console.log({"id:": similarCamData[i].id, "number of sim": countProps(similarCamData[i].sim2Ids)});
}
*/


//console.log(similarCamData);
//console.log(similarCamData[0].sim2Ids)

export default similarCamData;


