import { evalPossibleWords, evaluateGuess, getSolverData, scoreMakesSense, updateSolver } from "../build/solver.js";
import { WORDS } from "../build/words";

// To make the lirdle41 tests similar to the lirdle tests, replace a likely letter with a q, x, or z

describe('solver tests', () => {
    describe('evaluate guess', () => {
        test('can handle duplicate letters', () => {
            expect(evaluateGuess('abhor', 'parer')).toEqual([0, 1, 0, 0, 2]);
            expect(evaluateGuess('mamma', 'amima')).toEqual([1, 1, 0, 2, 2]);
        })
    })
    describe('reduced word list', () => {
        const currentWordList = ['taste', 'waste', 'wedge', 'llama', 'mango'];
        describe('evalPossibleWords', () => {
            test('green i should fail', () => {
                expect(evalPossibleWords('rqnse', [1, 2, 1, 1, 0], currentWordList)).toEqual([]);
            });
            test('s, e are green but the a is black', () => {
                let words = evalPossibleWords('bqsge', [0, 0, 2, 0, 2], currentWordList);
                expect(words).toEqual(['taste', 'waste']);
                words = evalPossibleWords('azsue', [1, 0, 2, 0, 2], currentWordList);
                expect(words).toEqual(['taste', 'waste']);
            });
            test('only an l and an m', () => {
                let words = evalPossibleWords('xmjze', [0, 1, 0, 0, 0], currentWordList);
                expect(words).toEqual(['llama', 'mango']);
            });
        });
        describe('updateSolver', () => {
            const solverData = getSolverData();
            const guesses = [];
            const scores = [];
            solverData.possibleWords = currentWordList;
            test('follow through 4 lines', () => {
                updateSolver(guesses,scores, solverData);
                expect(solverData.level).toBe(0);
                expect(solverData).toEqual({
                    level: 0,
                    possibleWords: currentWordList,
                    possibleWordCounts: [],
		    remainingWords: [],
                });
                // ['taste', 'waste', 'wedge', 'llama', 'mango'];

                guesses.push('quick');
                scores.push([0, 0, 0, 0, 0]);
                updateSolver(guesses,scores, solverData);
                expect(solverData).toEqual({
                    level: 1,
                    possibleWords: currentWordList,
                    possibleWordCounts: [currentWordList.length],
		    remainingWords: [
			['taste', 'waste', 'wedge', 'llama', 'mango'],
		    ],
                });
                expect(solverData.level).toBe(1);
                expect(solverData.possibleWords.length).toBe(currentWordList.length);

                guesses.push('fixaq');
                scores.push([0, 0, 0, 1, 0]);
                updateSolver(guesses,scores, solverData);
                expect(solverData).toEqual({
                    level: 2,
                    possibleWords: ['taste', 'waste', 'llama', 'mango'],
                    possibleWordCounts: [5, 4],
		    remainingWords: [
			['taste', 'waste', 'wedge', 'llama', 'mango'],
			['taste', 'waste', 'llama', 'mango'],
		    ],
                });

                guesses.push('abmdc');
                scores.push([1, 0, 1, 0, 0]);
                updateSolver(guesses,scores, solverData);
                expect(solverData).toEqual({
                    level: 3,
                    possibleWords: ['llama', 'mango'],
                    possibleWordCounts: [5, 4, 2],
		    remainingWords: [
			['taste', 'waste', 'wedge', 'llama', 'mango'],
			['taste', 'waste', 'llama', 'mango'],
			['llama', 'mango'],
		    ],
                });

                guesses.push('alarm');
                scores.push([1, 2, 2, 0, 1]);
                updateSolver(guesses,scores, solverData);
                expect(solverData).toEqual({
                    level: 4,
                    possibleWords: ['llama'],
                    possibleWordCounts: [5, 4, 2, 1],
		    remainingWords: [
			['taste', 'waste', 'wedge', 'llama', 'mango'],
			['taste', 'waste', 'llama', 'mango'],
			['llama', 'mango'],
			['llama'],
		    ],
                });
            });
        });
    });
    describe('smaller word list', () => {
        const currentWordList = ['abhor', 'urban'];
        describe('abhor/parer bug', () => {
            test('abhor parer test 1', () => {
                const scores = evaluateGuess('abhor', 'parer');
                expect(scores).toEqual([0, 1, 0, 0, 2]);
                const wordList2 = evalPossibleWords('parer', [0, 1, 1, 0, 0], currentWordList)
                expect(wordList2).toEqual(['urban']);
            });
            it('loops through', () => {
                const scores = [0, 1, 1, 0, 0];
                console.log(`-scoreMakesSense 'parer', 'abhor', ${scores.join(',')}, }`);
                expect(scoreMakesSense('parer', 'abhor', scores)).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,0,1])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,1,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,1,1])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,1,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,2,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,2,1])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,2,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,0,2])).toBeTruthy();
                expect(scoreMakesSense('parer', 'abhor', [0,2,0,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,1,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,1,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,2,1,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,2,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,2,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,2,2,0,0])).toBeFalsy();
                // Now the only possible truthers
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,0,0])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,0,1])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,1,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,0,2,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,1,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,1,2,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,0,0,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [0,2,0,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [1,1,0,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [2,1,0,0,2])).toBeFalsy();
                expect(scoreMakesSense('parer', 'abhor', [1,0,0,0,2])).toBeFalsy();
            })
        });
    });
    describe('full word list', () => {
        describe('updateSolver for miner', () => {
            const currentWordList = WORDS.concat([]);
            const solverData = getSolverData();
            const guesses = [];
            const scores = [];
            solverData.possibleWords = currentWordList;
            test('follow through 4 lines', () => {
                updateSolver(guesses, scores, solverData);

                guesses.push('sauce');
                scores.push([0, 0, 0, 0, 1]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(1);
                expect(solverData.possibleWordCounts[0]).toEqual(259);
                expect(solverData.possibleWords.length).toBe(259);

                guesses.push('cause');
                scores.push([0, 0, 0, 0, 1]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(2);
                expect(solverData.possibleWordCounts[1]).toEqual(259);
                expect(solverData.possibleWords.length).toBe(259);
                expect(solverData.possibleWords).toContain('miner');

                guesses.push('suite');
                scores.push([0, 0, 1, 0, 1]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(3);
                expect(solverData.possibleWords.length).toBe(45);
                expect(solverData.possibleWords).toContain('miner');

                guesses.push('diner');
                scores.push([0, 2, 2, 2, 2]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(4);
                expect(solverData.possibleWords.length).toBe(3);
                expect(solverData.possibleWords).toContain('miner');

                guesses.push('liner');
                scores.push([0, 2, 2, 2, 2]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(5);
                expect(solverData.possibleWords.length).toBe(2);
                expect(solverData.possibleWords).toContain('miner');

                guesses.push('finer');
                scores.push([0, 2, 2, 2, 2]);
                updateSolver(guesses, scores, solverData);
                expect(solverData.level).toEqual(6);
                expect(solverData.possibleWords.length).toBe(1);
                expect(solverData.possibleWords).toContain('miner');
            });
        });
    });
});
