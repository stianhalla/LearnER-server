'use strict';
const { Exercise } = require('../models');
const { ENTITY, ASSOCIATION, ATTRIBUTE, FK, PK } = require('../utilities/values');

const fs = require('fs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Henter ut alle oppgaver
    await Exercise.findAll().then(exercises => {
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

      // Går gjennom ordlisten
      for(let [word, meta] of dictionary) {
        // Legger til ord
        addWord(wordsData, word);

        // Henter alle oppgave id-ene og setter type på de, kan ha flere typer
        const ids = new Map();
        for(let [type, exerciseIDs] of meta.type) {
          exerciseIDs.forEach( exerciseID => {
            addToMap(ids, exerciseID, type);
          })
        }

        // Legger til i exerciseHasWordsData tabellen
        for(let [id, types] of ids) {
          addExerciseHasWords(exerciseHasWordsData, wordsData.length, id, Array.from(types).toString())
        }
      }

      // Oppretter synonymer fra json fil
      const synonymsData = [];
      // Henter synonymer fra json fil
      let rawdata = fs.readFileSync('utilities/synonyms.json');
      let synonymDictionary = JSON.parse(rawdata);
      // Går gjennom synonymene og legger de inn i synonymsData
      synonymDictionary.forEach(lex => {
        const wordId =  indexOf(wordsData, lex.word);
        if(wordId > 0) {
          const synonyms = lex.synonyms;
          synonyms.forEach(synonym => {
            synonymsData.push({
              word_id: wordId,
              synonym: synonym,
              created_at: new Date(),
              updated_at: new Date()
            })
          })
        }
      });

      // 1 words
      queryInterface.bulkInsert('words', wordsData, {});

      // 2 synonyms
      queryInterface.bulkInsert('synonyms', synonymsData, {});

      // 3 exercise_has_words
      queryInterface.bulkInsert('exercise_has_words', exerciseHasWordsData, {});

    });
  },

  down: async (queryInterface, Sequelize) => {
     // 1 exercise_has_words
     await queryInterface.bulkDelete('exercise_has_words', null, {});
     await queryInterface.sequelize.query('ALTER TABLE exercise_has_words AUTO_INCREMENT = 1');

    // 2 synonyms
    await queryInterface.bulkDelete('synonyms', null, {});
    await queryInterface.sequelize.query('ALTER TABLE synonyms AUTO_INCREMENT = 1');

    // 3 words
    await queryInterface.bulkDelete('words', null, {});
    await queryInterface.sequelize.query('ALTER TABLE words AUTO_INCREMENT = 1');
  }
};

function indexOf(array, value) {
  let count = 1;
  for(let elemnt of array) {
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

// Legger til ord i ordboken med metainformasjon
function addToDictionary(map, key, type, id) {
  if(!key)
    return;

  let value = map.get(key);

  if (value) value.addMeta(type, id);
  else value = new Meta(type, id);

  map.set(key, value);
}

function addToMap(map, key, value) {
  const types = map.get(key);
  if(types) {
    types.add(value)
  } else {
    const set = new Set();
    set.add(value);
    map.set(key, set)
  }
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