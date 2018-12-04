import * as fs from 'fs';
import * as path from 'path';


const data = fs.readFileSync(path.join(__dirname, 'data', 'day3')).toString().split('\n').map(str => {
    const arr = str.split(' ');
    const position = arr[2];
    const positionArr = position.replace(':','').split(',');
    const size = arr[3];
    const sizeArr = size.split('x');
    return {
        id: arr[0],
        x: Number(positionArr[0]),
        y: Number(positionArr[1]),
        width: Number(sizeArr[0]),
        height: Number(sizeArr[1])
    }
});

/**
 * The whole piece of fabric they're working on is a very large square - at least 1000 inches on each side.
 * 
 * Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. All claims have an ID and consist of a single rectangle with edges parallel to the edges of the fabric. Each claim's rectangle is defined as follows:
 * 
 * The number of inches between the left edge of the fabric and the left edge of the rectangle.
 * The number of inches between the top edge of the fabric and the top edge of the rectangle.
 * The width of the rectangle in inches.
 * The height of the rectangle in inches.
 * A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. Visually, it claims the square inches of fabric represented by # (and ignores the square inches of fabric represented by .) in the diagram below:
 */

// ONE
// const coveredSet = new Set<string>();
// const doubleCoveredSet = new Set<string>();

// for (const surface of data) {
//     const endx = surface.x + surface.width;
//     const endy = surface.y + surface.height;
//     for(let i = surface.x; i < endx; i++){
//         for(let j = surface.y; j < endy; j++){
//             const location = `${i}-${j}`;
//             if(coveredSet.has(location)) {
//                 doubleCoveredSet.add(location);
//             } else {
//                 coveredSet.add(location)
//             }
//         }
//     }
// }

// console.log([...doubleCoveredSet].length);

const testSet = new Set<string>();
let ids = data.map(s => s.id);
const coveredMap = new Map<string, string>();

for (const surface of data) {
    const endx = surface.x + surface.width;
    const endy = surface.y + surface.height;
    for(let i = surface.x; i < endx; i++){
        for(let j = surface.y; j < endy; j++){
            const location = `${i}-${j}`;
            if(coveredMap.has(location)) {
                testSet.add(surface.id);
                testSet.add(coveredMap.get(location) as string)
            } else {
                coveredMap.set(location, surface.id)
            }
        }
    }
}

for (const id of [...testSet]){
    ids = ids.filter(i => i !== id);
}

console.log(ids[0]);