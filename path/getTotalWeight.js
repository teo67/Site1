// preprocess
import weights from "./weights.js";

const singleColorWeights = [];
const multicolorWeights = [];
for(const weight of weights) {
    if(weight.requiresBothColors()) {
        multicolorWeights.push(weight);
    } else {
        singleColorWeights.push(weight);
    }
}

const getTotalWeight = (inputData, singleColor) => {
    const cache = {};
    let total = 0;
    for(const weight of (singleColor ? singleColorWeights : multicolorWeights)) {
        if(!weight.isEnabled()) {
            continue;
        }
        const rawVal = weight.runCalculations(inputData, cache);
        if(weight.isOverMax(rawVal)) {
            return null;
        }
        total += weight.getWeighted(rawVal);
    }
    return total;
}

export default getTotalWeight;