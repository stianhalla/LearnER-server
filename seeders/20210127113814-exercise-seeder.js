'use strict';

const faker = require('faker');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const data = [];

    const authorID = await User.findOne({ order: Sequelize.literal('rand()') }).then((user) => {
      return user.id;
    });

    const jsonFilmDatabase = '{"entiteter":[{"id":"ent_1","navn":"Film","attr":["Tittel","Spilletid","ProdÃr","Sjanger","Aldersgrense","Rolletype"],"pk":["FilmNr"],"fk":[],"x":145,"y":14,"kobling":false},' +
        '{"id":"ent_2","navn":"Person","attr":["Fornavn","Etternavn","KjÃ¸nn","FÃ¸dselsdato","DÃ¸dsdato"],"pk":["PersonId"],"fk":[],"x":772,"y":80,"kobling":false},{"id":"ent_3","navn":"Rolle","attr":["Rolletype","Rollenavn"],' +
        '"pk":["FilmNr","PersonId"],"fk":["FilmNr","PersonId"],"x":491,"y":85,"kobling":false},{"id":"ent_4","navn":"Jobb","attr":["Stillingstittel"],"pk":["FilmNr","PersonId"],"fk":["FilmNr","PersonId"],"x":485,"y":273,"kobling":false},' +
        '{"id":"ent_6","navn":"Sjanger","attr":[],"pk":[],"fk":[],"x":238,"y":350,"kobling":false},{"id":"ent_7","navn":"Rollenavn","attr":[],"pk":[],"fk":[],"x":102,"y":444,"kobling":false},{"id":"ent_8","navn":"Rolletype","attr":[],"pk":[],' +
        '"fk":[],"x":739,"y":326,"kobling":false}],"forhold":[{"id":"rel_2","type":"Identifiserende","fraForhold":"ent_1","tilForhold":"ent_3","fraEntitetNavn":"Film","tilEntitetNavn":"Rolle","maxKarTil":"*","maxKarFra":"1","minKarTil":"0",' +
        '"minKarFra":"1","navn":null},{"id":"rel_4","type":"Identifiserende","fraForhold":"ent_1","tilForhold":"ent_4","fraEntitetNavn":"Film","tilEntitetNavn":"Jobb","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},' +
        '{"id":"rel_3","type":"Identifiserende","fraForhold":"ent_2","tilForhold":"ent_3","fraEntitetNavn":"Person","tilEntitetNavn":"Rolle","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_5","type":"Identifiserende",' +
        '"fraForhold":"ent_2","tilForhold":"ent_4","fraEntitetNavn":"Person","tilEntitetNavn":"Jobb","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],"antallEnt":8,"antallRel":5}';

    const htmlFilmDatabase = '<p>Filmdatabase</p>' +
        '<p>Databasen skal inneholde informasjon om kinofilmer. Om hver film skal det lagres tittel, spilletid i minutter og produksjons&aring;r. En film tilh&oslash;rer n&oslash;yaktig en sjanger. Aktuelle sjangere er drama, action, komedie, kriminal, thriller, western, tegnefilm, dokumentar. ' +
        'Filmtilsynet tildeler hver film en nedre aldersgrense, som kan v&aelig;re 7, 11, 15, eller 18 &aring;r, eventuelt merket &quot;for alle&quot;.</p>\n' +
        '<p>Databasen skal ogs&aring; inneholde informasjon om personer som har deltatt i produksjonen av filmer, b&aring;de skuespillere og andre. Om alle personer skal f&oslash;lgende opplysninger lagres: fornavn, etternavn, kj&oslash;nn, f&oslash;dselsdato og eventuelt d&oslash;dsdato. ' +
        'Om skuespillere skal rollenavnet lagres, og om rollen er en hovedrolle, birolle eller statistrolle. Om &oslash;vrige personer lagres kun jobbtittelen, som for eksempel produsent eller fotograf. En skuespiller kan kun ha &eacute;n rolle i en bestemt film. Tilsvarende s&aring; kan en person kan kun ha &eacute;n stilling i en bestemt film.</p>';

    data.push({
      author_id: authorID,
      difficulty_level_id: 4,
      title: 'FilmDatabase',
      description: htmlFilmDatabase,
      solution: jsonFilmDatabase,
      public: 1,
      extra_points: 200,
      tags: 'kinofilm, filmrolle, skuespiller, filmproduksjon',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });


    const jsonPlatesamling = '{"entiteter":[{"id":"ent_1","navn":"Album","attr":["AlbumTittel","Artist"],"pk":["AlbumNr"],"fk":[],"x":86.99998474121094,"y":62,"kobling":false},' +
        '{"id":"ent_4","navn":"Spor","attr":["SangTittel","Varighet"],"pk":["AlbumNr","SporNr"],"fk":["AlbumNr"],"x":555,"y":82,"kobling":false}],"forhold":[{"id":"rel_2","type":"Identifiserende",' +
        '"fraForhold":"ent_1","tilForhold":"ent_4","fraEntitetNavn":"Album","tilEntitetNavn":"Spor",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1","minKarFra":"1","navn":"tilhÃ¸rer"}],"antallEnt":4,"antallRel":2}';

    const htmlPlatesamling = '<p>Du skal lage en database for &aring; holde rede p&aring; din omfattende samling med vinylplater.</p>\n' +
        '<p>Om hvert album skal man lagre artist og tittel. Et album blir dessuten tildelt et unikt albumnummer.</p>\n' +
        '<p>Et album kan inneholde mange sanger (spor). Sporene p&aring; et album er nummerert fra 1 og oppover. Om hvert spor skal ogs&aring; sangtittel og varighet i sekunder lagres.</p>\n' +
        '<p>Merk at samme sangtittel kan forekomme p&aring; flere album.</p>';

    data.push({
      author_id: authorID,
      difficulty_level_id: 2,
      title: 'Platesamling',
      description: htmlPlatesamling,
      solution: jsonPlatesamling,
      public: 1,
      extra_points: 100,
      tags: '',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });


    const htmlVærstasjoner = '<p>Meteorologisk institutt har v&aelig;rstasjoner plassert rundt om i hele landet.</p>\n' +
        '<p>Koordinatene til hver enkelt stasjon skal lagres.</p>\n' +
        '<p>V&aelig;rstasjonene m&aring;ler samlet nedb&oslash;r, gjennomsnittlig temperatur og gjennomsnittlig luftfuktighet hver time.</p>\n' +
        '<p>Data fra stasjonene blir overf&oslash;rt til en sentral database for analyse.</p>';

    const jsonVærstasjoner = '{"entiteter":[{"id":"ent_1","navn":"Stasjon","attr":["X","Y"],"pk":["StasjonsNr"],"fk":[],"x":131,"y":65,"kobling":false},' +
        '{"id":"ent_2","navn":"MÃ¥ling","attr":["Dato","TimeNr","NedbÃ¸r","Temperatur","Luftfuktighet"],"pk":["MNr"],"fk":["StasjonsNr"],"x":519,"y":55,"kobling":false}]' +
        ',"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende","fraForhold":"ent_1","tilForhold":"ent_2","fraEntitetNavn":"Stasjon","tilEntitetNavn":"MÃ¥ling",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],"antallEnt":2,"antallRel":1}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 1,
      title: 'Værstasjoner',
      description: htmlVærstasjoner,
      solution: jsonVærstasjoner,
      public: 0,
      extra_points: 50,
      tags: '',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });





      await queryInterface.bulkInsert('exercises', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercises', null, {});
  }
};
