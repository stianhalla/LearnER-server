
const { Exercise } = require('../models');
const { ENTITY, ASSOCIATION, ATTRIBUTE, FK, PK } = require('./values');

const fs = require('fs');

exports.createDictionary = async () => {
    // Henter ut alle oppgaver
    Exercise.findAll().then(exercises => {
        // Oppretter ordboken
        const dictionary = new Map();

        // Går gjennom alle fasitene og henter ut navn til ordboken
        for(let exercise of exercises) {
            exercise.solution.entiteter.forEach(entity => {
                addToDictionary(dictionary, entity.navn, ENTITY, exercise.id);

                entity.attr.forEach(attribute => {
                    addToDictionary(dictionary, attribute, ATTRIBUTE, exercise.id);
                });

                entity.pk.forEach(pk => {
                    addToDictionary(dictionary, pk, PK, exercise.id)
                });

                entity.fk.forEach(fk => {
                    addToDictionary(dictionary, fk, FK, exercise.id)
                });
            });

            exercise.solution.forhold.forEach(association => {
                addToDictionary(dictionary, association.navn, ASSOCIATION, exercise.id)
            });

        }

        const wordsData = [];
        const exerciseHasWordsData = [];

        for(let [word, meta] of dictionary) {
            addWord(wordsData, word);
            const ids = new Map();
            for(let [type, exerciseIDs] of meta.type) {
                exerciseIDs.forEach( exerciseID => {
                   const types = ids.get(exerciseID);
                   if(types) {
                       types.add(type)
                   } else {
                       const set = new Set();
                       set.add(type);
                       ids.set(exerciseID, set)
                   }
                })
            }
            for(let [id, types] of ids) {
                addExerciseHasWords(exerciseHasWordsData, wordsData.length, id, Array.from(types).toString())
            }
        }

        const synonymsData = [];


        let rawdata = fs.readFileSync('utilities/synonyms.json');
        let synonymDictionary = JSON.parse(rawdata);

        synonymDictionary.forEach(lex => {
            const wordId =  indexOf(wordsData, lex.word);
            const synonyms = lex.synonyms;
            synonyms.forEach(synonym => {
                synonymsData.push({
                    word_id: wordId,
                    synonym: synonym,
                    created_at: new Date(),
                    updated_at: new Date()
                })
            })
        });

        console.log(synonymsData);

    });
};

function indexOf(array, value) {
    let count = 1;
    for(elemnt of array) {
        if(elemnt.word.toLowerCase() === value.toLowerCase()) {
            return count;
        } else {
            count++;
        }
    }
    return -1;
}

function addWord(array, word) {
    array.push({
        word,
        created_at: new Date(),
        updated_at: new Date()
    })
}

function addExerciseHasWords(array, word_id, exercise_id, type) {

        array.push({
            word_id,
            exercise_id,
            type,
            created_at: new Date(),
            updated_at: new Date()
        })
}

function isType(str, type) {
    const types = str.split('/');
    return types.includes(type);
}

// Legger til ord i ordboken med metainformasjon
function addToDictionary(map, key, type, id) {
    if(!key)
        return;

    let value = map.get(key);

    if (value) value.addMeta(type, id);
    else value = new Meta(type, id);

    map.set(key, value);
}

// Metainformasjon til hvert ord i ordboken
class Meta {
    constructor(type, id) {
        this.count = 1;
        this.type = new Map();
        this.addType(type, id)
    }

    addMeta(type, id) {
        this.count++;
        this.addType(type, id)
    }

    addType(type, id) {
        const typeSet = this.type.get(type);
        if(typeSet) {
            typeSet.add(id)
        } else {
            const set = new Set();
            set.add(id);
            this.type.set(type, set)
        }
    }
}