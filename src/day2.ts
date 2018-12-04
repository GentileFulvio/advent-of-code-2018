import {data} from './data/day2';
/**
 * --- Day 2: Inventory Management System ---
 * You stop falling through time, catch your breath, and check the screen on the device. "Destination reached. Current Year: 1518. Current Location: North Pole Utility Closet 83N10." You made it! Now, to find those anomalies.
 * 
 * Outside the utility closet, you hear footsteps and a voice. "...I'm not sure either. But now that so many people have chimneys, maybe he could sneak in that way?" Another voice responds, "Actually, we've been working on a new kind of suit that would let him fit through tight spaces like that. But, I heard that a few days ago, they lost the prototype fabric, the design plans, everything! Nobody on the team can even seem to remember important details of the project!"
 * 
 * "Wouldn't they have had enough fabric to fill several boxes in the warehouse? They'd be stored together, so the box IDs should be similar. Too bad it would take forever to search the warehouse for two similar box IDs..." They walk too far away to hear any more.
 * 
 * Late at night, you sneak to the warehouse - who knows what kinds of paradoxes you could cause if you were discovered - and use your fancy wrist device to quickly scan every box and produce a list of the likely candidates (your puzzle input).
 * 
 * To make sure you didn't miss any, you scan the likely candidate boxes again, counting the number that have an ID containing exactly two of any letter and then separately counting those with exactly three of any letter. You can multiply those two counts together to get a rudimentary checksum and compare it to what your device predicts.
 * 
 * For example, if you see the following box IDs:
 * 
 * abcdef contains no letters that appear exactly two or three times.
 * bababc contains two a and three b, so it counts for both.
 * abbcde contains two b, but no letter appears exactly three times.
 * abcccd contains three c, but no letter appears exactly two times.
 * aabcdd contains two a and two d, but it only counts once.
 * abcdee contains two e.
 * ababab contains three a and three b, but it only counts once.
 * Of these box IDs, four of them contain a letter which appears exactly twice, and three of them contain a letter which appears exactly three times. Multiplying these together produces a checksum of 4 * 3 = 12.
 * 
 * What is the checksum for your list of box IDs?
 */
let threes = 0;
let twos = 0;
for (const str of data) {
    const strMap = new Map<string, number>();
    for (const char of str.split('')){
        if(strMap.has(char)) {
            const currentCount = strMap.get(char) as number;
            strMap.set(char, currentCount + 1);
        } else {
            strMap.set(char, 1);
        }
    }
    for (const value of new Set([...strMap.values()])) {
        if(value === 3) {
            threes++;
        }
        if(value === 2) {
            twos++;
        }
    }
}
const result = twos * threes;

/**
 * --- Part Two ---
 * Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.
 * 
 * The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:
 * 
 * abcde
 * fghij
 * klmno
 * pqrst
 * fguij
 * axcye
 * wvxyz
 * The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.
 * 
 * What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
 * 
 * 
 */
const checkAmountOfDifferentCharacters = (a: string, b: string): {amount: number; lastIndex: number | undefined} => {
    const charactersA = a.split('');
    const charactersB = b.split('');

    let amount = 0;
    let index;

    for (let i = 0; i < charactersA.length ;i++){
        if(charactersA[i] !== charactersB[i]){
            amount++;
            index = i;
        }
    }

    return {amount, lastIndex: index};
}

const getSolution = (strings: string[]): string => {
    for (const str of strings) {
        for (const strr of strings) {
            const check = checkAmountOfDifferentCharacters(str, strr);
            if(check.amount === 1) {
                return [...str.slice(0, check.lastIndex), ...str.slice(check.lastIndex as number + 1)].join('');
            }
        }
    }
    return 'NOT FOUND';
}

console.log(getSolution(data));

