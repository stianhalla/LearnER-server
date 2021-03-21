'use strict';

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


    const htmlVærstasjoner = '<p>Meteorologisk institutt har v&aelig;rstasjoner plassert rundt om i hele landet.</p>' +
        '<p>Koordinatene til hver enkelt stasjon skal lagres.</p>' +
        '<p>V&aelig;rstasjonene m&aring;ler samlet nedb&oslash;r, gjennomsnittlig temperatur og gjennomsnittlig luftfuktighet hver time.</p>' +
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

    const timeHtml = '<p>En barneskole trenger et system for &aring; holde rede p&aring; hvilke klasser og l&aelig;rere som skal v&aelig;re i hvilke klasserom til hvilke tidsrom. F&oslash;lgende opplysninger skal lagres:</p>' +
        '<ul>' +
        '\t<li>Om hver l&aelig;rer holder det &aring; lagre et unikt ansattnummer, et fornavn og et etternavn.</li>' +
        '\t<li>En klasse er identifisert ved et klassetrinn og en bokstavkode, f.eks. &quot;4B&quot;. I tillegg skal antall elever i klassen lagres.</li>' +
        '\t<li>Om et klasserom skal det lagres et unikt romnummer, antall sitteplasser, samt om rommet er utstyrt med smartboard og/eller pc.</li>' +
        '\t<li>En romreservasjon er knyttet til ett rom, &eacute;n l&aelig;rer og &eacute;n klasse. I tillegg m&aring; det lagres n&aring;r reservasjonen starter og slutter.</li>' +
        '</ul>' +
        '<p>Vi forenkler litt og antar at skolen bruker n&oslash;yaktig samme timeplan fra uke til uke, og at reservasjoner alltid gjelder et antall hele timer.</p>';

    const timeJson = '{"entiteter":[{"id":"ent_1","navn":"LÃ¦rer","attr":["Fornavn","Etternavn"],"pk":["AnsattNr"],"fk":[],"x":13.000003814697266,"y":8,"kobling":false},' +
        '{"id":"ent_2","navn":"Klasse","attr":["AntallElever"],"pk":["Klassetrinn","Klassekode"],"fk":[],"x":17,"y":270,"kobling":false},{"id":"ent_3","navn":"Reservasjon",' +
        '"attr":["AntallTimer","Ukedag","StartTime"],"pk":["ResNr"],"fk":["AnsattNr","Klassekode","Klassetrinn","RomNr"],"x":376,"y":42,"kobling":false},{"id":"ent_4","navn":"Rom",' +
        '"attr":["AntallPlasser","HarSmartboard","HarPC"],"pk":["RomNr"],"fk":[],"x":707,"y":82,"kobling":false}],"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende",' +
        '"fraForhold":"ent_1","tilForhold":"ent_3","fraEntitetNavn":"LÃ¦rer","tilEntitetNavn":"Reservasjon","maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1","minKarFra":"1","navn":null},' +
        '{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_2","tilForhold":"ent_3","fraEntitetNavn":"Klasse","tilEntitetNavn":"Reservasjon","maxKarTil":"*","maxKarFra":"1",' +
        '"minKarTil":"0/1","minKarFra":"1","navn":null},{"id":"rel_3","type":"Ikke-Identifiserende","fraForhold":"ent_4","tilForhold":"ent_3","fraEntitetNavn":"Rom","tilEntitetNavn":"Reservasjon",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1","minKarFra":"1","navn":null}],"antallEnt":4,"antallRel":3}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 3,
      title: 'Timeplanlegging',
      description: timeHtml,
      solution: timeJson,
      public: 1,
      extra_points: 50,
      tags: 'barneskole, timeplan, romreservasjoner',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const legesenterHtml = '<p>Et legesenter &oslash;nsker &aring; holde rede p&aring; avtalene med pasientene sine.</p>' +
        '<ul>' +
        '<li>Om hver pasient blir det lagret et fornavn, et etternavn og et unikt pasientnummer.</li>' +
        '<li>Om hver lege blir det lagret et fornavn, et etternavn og et unikt legenummer.</li>' +
        '<li>Om hvert rom blir det lagret et unikt romnummer.</li>' +
        '<li>Til hver avtale blir det lagret et unikt avtalenummer, starttid og varighet.</li>' +
        '<li>En avtale skal knyttes til en lege, et rom og en pasient.</li>' +
        '</ul>';

    const legesenterJson = '{"entiteter":[{"id":"ent_1","navn":"Lege","attr":["Fornavn","Etternavn"],"pk":["LegeNr"],"fk":[],"x":187,"y":39,"kobling":false},' +
        '{"id":"ent_2","navn":"Pasient","attr":["Fornavn","Etternavn"],"pk":["PasientNr"],"fk":[],"x":230,"y":277,"kobling":false},' +
        '{"id":"ent_3","navn":"Avtale","attr":["StartTid","Varighet"],"pk":["AvtaleNr"],"fk":["LegeNr","PasientNr","RomNr"],"x":542,"y":111,"kobling":false},' +
        '{"id":"ent_4","navn":"Rom","attr":[],"pk":["RomNr"],"fk":[],"x":849,"y":98,"kobling":false}],"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende",' +
        '"fraForhold":"ent_1","tilForhold":"ent_3","fraEntitetNavn":"Lege","tilEntitetNavn":"Avtale","maxKarTil":"*","maxKarFra":"1","minKarTil":"0",' +
        '"minKarFra":"1","navn":null},{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_2","tilForhold":"ent_3","fraEntitetNavn":"Pasient",' +
        '"tilEntitetNavn":"Avtale","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_3","type":"Ikke-Identifiserende",' +
        '"fraForhold":"ent_4","tilForhold":"ent_3","fraEntitetNavn":"Rom","tilEntitetNavn":"Avtale","maxKarTil":"*","maxKarFra":"1","minKarTil":"0",' +
        '"minKarFra":"1","navn":null}],"antallEnt":4,"antallRel":3}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 3,
      title: 'Legesenter',
      description: legesenterHtml,
      solution: legesenterJson,
      public: 1,
      extra_points: 50,
      tags: 'lege, pasient, avtale',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const forumHtml = '<p>Et diskusjonsforum gir registrerte brukere mulighet for &aring; skrive innlegg om ulike temaer.</p>' +
        '<ul>' +
        '<li>Administrator av forumet definerer listen med temaer.</li>\n' +
        '<li>Brukere kan starte nye diskusjonstr&aring;der under hvert tema, eller svare p&aring; innlegg fra andre brukere.</li>' +
        '<li>Hvert innlegg har en tittel, en dato og en tekst.</li>\n' +
        '<li>Brukere blir identifisert ved e-postadresse. Ved registrering kan brukere velge eget passord og et frivillig kallenavn.</li>' +
        '</ul>' +
        '<p><strong>Merk</strong>: <em>SvarP&aring;Nr </em>skal f&oslash;rst brukes ved oversettelse til logisk modell.</p>';

    const forumJson = '{"entiteter":[{"id":"ent_1","navn":"Bruker","attr":["Kallenavn","Passord"],"pk":["Epost"],"fk":[],"x":58,"y":54,"kobling":false},' +
        '{"id":"ent_2","navn":"Innlegg","attr":["Tittel","Dato","Tekst"],"pk":["Nr"],"fk":["Epost","TemaNr","SvarPÃ¥Nr"],"x":403,"y":59.99998474121094,' +
        '"kobling":false},{"id":"ent_3","navn":"Tema","attr":["TemaNavn"],"pk":["TemaNr"],"fk":[],"x":724,"y":80.00001525878906,"kobling":false}],' +
        '"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende","fraForhold":"ent_1","tilForhold":"ent_2","fraEntitetNavn":"Bruker","tilEntitetNavn":"Innlegg",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1","minKarFra":"1","navn":null},{"id":"rel_3","type":"Ikke-Identifiserende","fraForhold":"ent_2",' +
        '"tilForhold":"ent_2","fraEntitetNavn":"Innlegg","tilEntitetNavn":"Innlegg","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"0",' +
        '"navn":null},{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_3","tilForhold":"ent_2","fraEntitetNavn":"Tema","tilEntitetNavn":"Innlegg",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],"antallEnt":3,"antallRel":3}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 4,
      title: 'Forum',
      description: forumHtml,
      solution: forumJson,
      public: 1,
      extra_points: 50,
      tags: '',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const eksamen2016Html= '<p>LitenJobb.no er en nystartet bedrift som tilbyr en nettbasert l&oslash;sning der man kan legge ut diverse sm&aring;jobber (oppdrag) p&aring; &laquo;anbud&raquo; og ogs&aring; legge inn &laquo;bud&raquo; p&aring; slike jobber. Du skal foresl&aring; en datamodell for selve databasen.</p>\n' +
        '<p>Personer som vil bruke l&oslash;sningen m&aring; f&oslash;rst registrere seg med fornavn, etternavn, epost og et selvvalgt passord. ' +
        'Som registrert bruker kan man b&aring;de legge ut oppdrag som man vil ha utf&oslash;rt, og ogs&aring; legge inn bud p&aring; ' +
        'oppdrag som andre brukere har lagt ut. Et oppdrag blir tildelt et unikt oppdragsnummer, og gis dessuten en kort beskrivelse og en frivillig ' +
        'maksimalpris.</p>\n' +
        '<p>Det m&aring; ogs&aring; lagres hvem som er oppdragsgiver, alts&aring; hvem som har lagt ut oppdraget. Stedet der oppdraget skal utf&oslash;' +
        'res blir ogs&aring; registrert, og best&aring;r av en gateadresse og et kommunenummer. For &aring; gj&oslash;re det enklere &aring; ' +
        'finne fram til aktuelle oppdrag skal databasen inneholde navn p&aring; alle kommuner, og dessuten fylkesnummer og navn p&aring; ' +
        'fylket som kommunen ligger i.</p>\n' +
        '<p>I f&oslash;rste omgang er oppdragene av f&oslash;lgende typer: arrangement (f.eks. bryllup), flytting, husvask, dyrepass og leksehjelp. ' +
        'Det er &oslash;nskelig &aring; utforme databasen slik at det er enkelt &aring; utvide med nye oppdragstyper. ' +
        'Registrerte brukere kan legge inn bud p&aring; et oppdrag, dvs. det minste bel&oslash;pet man er villig til &aring; ' +
        'akseptere for &aring; utf&oslash;re oppdraget. Alle bud blir lagret. Oppdragsgiver kan n&aring;r som helst akseptere ett av budene. ' +
        'Dette skal ogs&aring; lagres.</p>\n' +
        '<p>Etter at oppdraget er utf&oslash;rt kan oppdragsgiver og den som fikk oppdraget gi hverandre en poengsum fra 1 (d&aring;rligst) til 10 (best) ' +
        'for &aring; angi hvor forn&oslash;yd man er med den andre.</p>';

    const eksamen2016Json = '{"entiteter":[{"id":"ent_1","navn":"Bud","attr":["BudPris","Akseptert"],"pk":["BudNr"],"fk":["ONr","BrukerNr"],"x":46,"y":24,' +
        '"kobling":false},{"id":"ent_2","navn":"Bruker","attr":["Fornavn","Etternavn","EPost","Passord"],"pk":["BrukerNr"],"fk":[],"x":137,' +
        '"y":404,"kobling":false},{"id":"ent_3","navn":"Oppdrag","attr":["Adresse","MaksPris","PoengTilBudgiver","PoengTilOppdragsgiver"],' +
        '"pk":["ONr"],"fk":["BrukerNr","TypeNr","KNr"],"x":468,"y":173,"kobling":false},{"id":"ent_4","navn":"Oppdragstype","attr":["Beskrivelse"],' +
        '"pk":["TypeNr"],"fk":[],"x":1008,"y":51,"kobling":false},{"id":"ent_5","navn":"Kommune","attr":["KNavn"],"pk":["KNr"],"fk":["FNr"],"x":847,' +
        '"y":544,"kobling":false},{"id":"ent_6","navn":"Fylke","attr":["FNavn"],"pk":["FNr"],"fk":[],"x":1126,"y":326,"kobling":false}],' +
        '"forhold":[{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_2","tilForhold":"ent_1","fraEntitetNavn":"Bruker","tilEntitetNavn":"Bud",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_4","type":"Ikke-Identifiserende","fraForhold":"ent_2",' +
        '"tilForhold":"ent_3","fraEntitetNavn":"Bruker","tilEntitetNavn":"Oppdrag","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1",' +
        '"navn":null},{"id":"rel_1","type":"Ikke-Identifiserende","fraForhold":"ent_3","tilForhold":"ent_1","fraEntitetNavn":"Oppdrag","tilEntitetNavn":"Bud",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_5","type":"Ikke-Identifiserende","fraForhold":"ent_4",' +
        '"tilForhold":"ent_3","fraEntitetNavn":"Oppdragstype","tilEntitetNavn":"Oppdrag","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1",' +
        '"navn":null},{"id":"rel_6","type":"Ikke-Identifiserende","fraForhold":"ent_5","tilForhold":"ent_3","fraEntitetNavn":"Kommune",' +
        '"tilEntitetNavn":"Oppdrag","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_7","type":"Ikke-Identifiserende",' +
        '"fraForhold":"ent_6","tilForhold":"ent_5","fraEntitetNavn":"Fylke","tilEntitetNavn":"Kommune","maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1",' +
        '"minKarFra":"1","navn":null}],"antallEnt":6,"antallRel":7}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 5,
      title: 'Eksamen 2016',
      description: eksamen2016Html,
      solution: eksamen2016Json,
      public: 1,
      extra_points: 50,
      tags: 'anbud, bud, jobber, oppdrag, eksamen, USN',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const ansattHtml = '<p>Du skal lage en database for &aring; ta vare p&aring; viktige opplysninger om ansatte i en bedrift.</p>' +
        '<p>Om hver ansatt skal man lagre fornavn, etternavn, stilling, l&oslash;nn og telefonnummer.</p>' +
        '<p>Dessuten f&aring;r hver ansatt et unikt ansattnummer.</p>';

    const ansattJson = '{"entiteter":[{"id":"ent_1","navn":"Ansatt","attr":["Fornavn","Etternavn","Stillling","LÃ¸nn","TelefonNr"],"pk":["AnsattNr"],' +
        '"fk":[],"x":99.00001525878906,"y":43,"kobling":false}],"forhold":[],"antallEnt":1,"antallRel":0}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 1,
      title: 'Ansatt',
      description: ansattHtml,
      solution: ansattJson,
      public: 1,
      extra_points: 50,
      tags: 'entitet,attributt',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const bankHtml = '<p>En bank m&aring; ta vare p&aring; opplysninger om sine kunder, kontoer og transaksjoner, det vil si overf&oslash;ringer av ' +
        'bel&oslash;p mellom kontoer.</p>' +
        '<p>Om hver kunde skal f&oslash;dselsnummer (11 siffer), fornavn og etternavn lagres.</p>' +
        '<p>Om hver konto skal kontonummer, rente og saldo lagres. En kunde kan disponere flere kontoer, men det finnes ogs&aring; registrerte kunder som ' +
        '(enn&aring;) ikke har noen konto.</p>' +
        '<p>Videre skal opplysninger om hver transaksjon lagres, n&aelig;rmere bestemt et transaksjonsnummer (l&oslash;penummer), frakonto, tilkonto, ' +
        'selve bel&oslash;pet og tidspunktet da overf&oslash;ringen ble gjort (dato og klokkeslett).</p>' +
        '<p>En transaksjon har alltid b&aring;de en frakonto og en tilkonto, men det finnes kontoer som det hverken er satt inn penger p&aring; ' +
        'eller tatt ut penger fra.</p>';

    const bankJson = '{"entiteter":[{"id":"ent_3","navn":"Kunde","attr":["Fornavn","Etternavn"],"pk":["FÃ¸dselsNr"],"fk":[],"x":42,"y":28,"kobling":false},' +
        '{"id":"ent_4","navn":"Konto","attr":["Rente","Saldo"],"pk":["KontoNr"],"fk":["FÃ¸dselsNr"],"x":356,"y":137,"kobling":false},{"id":"ent_5",' +
        '"navn":"Transaksjon","attr":["Dato","KlSlett","BelÃ¸p"],"pk":["TNr"],"fk":["FraKonto","TilKonto"],"x":745,"y":39,"kobling":false}],' +
        '"forhold":[{"id":"rel_7","type":"Ikke-Identifiserende","fraForhold":"ent_3","tilForhold":"ent_4","fraEntitetNavn":"Kunde","tilEntitetNavn":"Konto",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_6","type":"Ikke-Identifiserende","fraForhold":"ent_4",' +
        '"tilForhold":"ent_5","fraEntitetNavn":"Konto","tilEntitetNavn":"Transaksjon","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1",' +
        '"navn":null},{"id":"rel_5","type":"Ikke-Identifiserende","fraForhold":"ent_4","tilForhold":"ent_5","fraEntitetNavn":"Konto",' +
        '"tilEntitetNavn":"Transaksjon","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],"antallEnt":5,"antallRel":7}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 3,
      title: 'Bank',
      description: bankHtml,
      solution: bankJson,
      public: 1,
      extra_points: 50,
      tags: 'bank, transaksjon, konto, bankkonto',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const varelagerHtml = '<p>Du skal lage en database for et lagersystem.</p>' +
        '<p>Databasen skal inneholde viktige opplysninger om varene (vareslagene) p&aring; lageret.</p>' +
        '<p>Om hver vare skal man lagre navn, pris pr. enhet og antall enheter p&aring; lager. En vare har dessuten et entydig varenummer.</p>' +
        '<p>Om hver varekategori blir det lagret et entydig kategorinummer og navnet p&aring; kategorien.</p>' +
        '<p>En vare tilh&oslash;rer n&oslash;yaktig &eacute;n kategori.</p>' +
        '<p>En kategori kan inneholde null eller mange varer.</p>';

    const varelagerJson = '{"entiteter":[{"id":"ent_1","navn":"Vare","attr":["Pris","AntallEnheter","Varenavn"],"pk":["VareNr"],"fk":["KategoriNr"],' +
        '"x":183,"y":117,"kobling":false},{"id":"ent_2","navn":"Kategori","attr":["KategoriNavn"],"pk":["KategoriNr"],"fk":[],"x":582,"y":118,' +
        '"kobling":false}],"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende","fraForhold":"ent_2","tilForhold":"ent_1","fraEntitetNavn":"Kategori",' +
        '"tilEntitetNavn":"Vare","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],"antallEnt":2,"antallRel":1}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 3,
      title: 'Varelager',
      description: varelagerHtml,
      solution: varelagerJson,
      public: 1,
      extra_points: 50,
      tags: 'varer, lagerstyring',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });


    const fotturHtml = '<p>Du skal lage en database for &aring; administrere p&aring;melding til fotturer i fjellet.</p>' +
        '<ul>' +
        '<li>Hver hytte har et unikt hyttenummer, et navn og er av tre typer: ubetjent, selvbetjent og betjent.</li>' +
        '<li>Noen av hyttene har telefon. For hver hytte skal antall sengeplasser og mulighet for dusj lagres.</li>' +
        '<li>Det blir arrangert fotturer med og uten turleder.</li>' +
        '<li>Turene starter fra en hytte, har varierende lengde (antall dager) og vanskelighetsgrad (lett, middels, krevende, bretur).</li>' +
        '<li>Hver fotturrute er tildelt et unikt rutenummer og blir arrangert en eller flere ganger gjennom en sesong.</li>' +
        '<li>Prisen kan variere for hver gjennomf&oslash;ring av en fotturrute.</li>' +
        '<li>For &aring; melde seg p&aring; en fottur m&aring; man registrere seg med navn og (unik) epostadresse.</li>' +
        '<li>Ogs&aring; turledere er registret med navn og epostadresse i systemet.</li>' +
        '</ul>';

    const forturJson = '{"entiteter":[{"id":"ent_1","navn":"Hytte","attr":["Hyttenavn","Telefon","AntallSenger","HarDusj","Hyttetype"],"pk":["HytteNr"],' +
        '"fk":[],"x":30,"y":100,"kobling":false},{"id":"ent_2","navn":"Person","attr":["Fornavn","Etternavn"],"pk":["EPost"],"fk":[],"x":837,"y":447,' +
        '"kobling":false},{"id":"ent_3","navn":"Turrute","attr":["Vanskelighetsgrad","AntallDager"],"pk":["RuteNr"],"fk":["HytteNr"],"x":358.9999694824219,' +
        '"y":64,"kobling":false},{"id":"ent_4","navn":"Fottur","attr":["Pris"],"pk":["StartDato","RuteNr"],"fk":["RuteNr","EPost"],"x":964,"y":99,' +
        '"kobling":false},{"id":"ent_5","navn":"PÃ¥melding","attr":[],"pk":["StartDato","EPost","RuteNr"],"fk":["StartDato","EPost","RuteNr"],"x":381,' +
        '"y":376,"kobling":false}],"forhold":[{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_1","tilForhold":"ent_3","fraEntitetNavn":"Hytte",' +
        '"tilEntitetNavn":"Turrute","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"0/1","navn":null},{"id":"rel_3",' +
        '"type":"Ikke-Identifiserende","fraForhold":"ent_2","tilForhold":"ent_4","fraEntitetNavn":"Person","tilEntitetNavn":"Fottur","maxKarTil":"1",' +
        '"maxKarFra":"1","minKarTil":"0","minKarFra":"0","navn":"turleder"},{"id":"rel_6","type":"Identifiserende","fraForhold":"ent_2","tilForhold":"ent_5",' +
        '"fraEntitetNavn":"Person","tilEntitetNavn":"PÃ¥melding","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_1",' +
        '"type":"Identifiserende","fraForhold":"ent_3","tilForhold":"ent_4","fraEntitetNavn":"Turrute","tilEntitetNavn":"Fottur","maxKarTil":"*",' +
        '"maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_5","type":"Identifiserende","fraForhold":"ent_4","tilForhold":"ent_5",' +
        '"fraEntitetNavn":"Fottur","tilEntitetNavn":"PÃ¥melding","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null}],' +
        '"antallEnt":5,"antallRel":7}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 5,
      title: 'Fottur',
      description: fotturHtml,
      solution: forturJson,
      public: 1,
      extra_points: 50,
      tags: 'fottur, turforening, hytter, påmelding',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const prosjektStyringHtml = '<p>Du skal utforme databasen for et enkelt prosjektstyringsverkt&oslash;y.</p>' +
        '<ul>' +
        '<li>Om hvert prosjekt skal det lagres et unikt prosjektnummer og et budsjett.</li>' +
        '<li>Om hver ansatt skal det lagres et unikt ansattnummer, fornavn og etternavn, stilling og l&oslash;nn.</li>' +
        '<li>Ansatte kan delta p&aring; prosjekter (men m&aring; ikke). &Eacute;n ansatt kan delta p&aring; mange prosjekter og ett prosjekt kan ha mange ' +
        'prosjektdeltagere.</li>' +
        '<li>Systemet skal lagre antall timer som en ansatt jobber p&aring; et prosjekt.</li>' +
        '<li>Hvert prosjekt har n&oslash;yaktig &eacute;n prosjektleder.</li>' +
        '<li>En ansatt kan maksimalt v&aelig;re prosjektleder for ett prosjekt.</li>' +
        '</ul>';

    const prosjektStyringJson = '{"entiteter":[{"id":"ent_1","navn":"Prosjekt","attr":["Budsjett"],"pk":["ProsjektNr"],"fk":["AnsattNr"],"x":49,"y":60,' +
        '"kobling":false},{"id":"ent_2","navn":"Ansatt","attr":["Fornavn","Etternavn","Stilling","LÃ¸nn"],"pk":["AnsattNr"],"fk":[],"x":653,"y":25,' +
        '"kobling":false},{"id":"ent_3","navn":"Prosjektdeltagelse","attr":["AntallTimer"],"pk":["ProsjektNr","AnsattNr"],"fk":["ProsjektNr","AnsattNr"],' +
        '"x":315,"y":224,"kobling":false}],"forhold":[{"id":"rel_3","type":"Identifiserende","fraForhold":"ent_1","tilForhold":"ent_3",' +
        '"fraEntitetNavn":"Prosjekt","tilEntitetNavn":"Prosjektdeltagelse","maxKarTil":"*","maxKarFra":"1","minKarTil":"0/1","minKarFra":"1","navn":null},' +
        '{"id":"rel_2","type":"Identifiserende","fraForhold":"ent_2","tilForhold":"ent_3","fraEntitetNavn":"Ansatt","tilEntitetNavn":"Prosjektdeltagelse",' +
        '"maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"1","navn":null},{"id":"rel_4","type":"Ikke-Identifiserende","fraForhold":"ent_2",' +
        '"tilForhold":"ent_1","fraEntitetNavn":"Ansatt","tilEntitetNavn":"Prosjekt","maxKarTil":"1","maxKarFra":"1","minKarTil":"0","minKarFra":"1",' +
        '"navn":"prosjektleder"}],"antallEnt":3,"antallRel":4}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 5,
      title: 'Prosjektstyring',
      description: prosjektStyringHtml,
      solution: prosjektStyringJson,
      public: 1,
      extra_points: 50,
      tags: 'prosjekt, prosjektleder, prosjektdeltagelse',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

    const slektsDBHtml = '<p>Databasen skal brukes til slektsforskning og skal inneholde opplysninger om personer man finner opplysninger om i historiske ' +
        'kilder.</p>' +
        '<p>De nummereres fortl&oslash;pende med et l&oslash;penummer fra 1 og oppover. For hver person g&aring;r vi ut fra at f&oslash;lgende opplysninger er' +
        ' tilgjengelige: fornavn, etternavn, kj&oslash;nn og f&oslash;dselsdato. Vi g&aring;r for enkelhets skyld ut fra at disse opplysningene ikke ' +
        'forandrer seg og at alle historiske kilder er helt korrekte.</p>' +
        '<p>Databasen skal ogs&aring; inneholde informasjon om slektstr&aelig;r, det vil si hvem som er far og mor til hvem. En person kan ha mange barn, ' +
        'men bare &eacute;n mor og bare &eacute;n far. Merk at vi ikke har kunnskap om slektsforhold uendelig mange steg bakover. Det vil alts&aring; ' +
        'finnes personer i databasen med ukjent far og/eller mor.</p>' +
        '<p><strong>Merk</strong>: FarNr og MorNr skal f&oslash;rst brukes i logisk modell.Merk: FarNr og MorNr skal f&oslash;rst brukes i logisk modell.</p>';

    const slektsDBJson = '{"entiteter":[{"id":"ent_4","navn":"Person","attr":["Fornavn","Etternavn","FÃ¸dselsdato","KjÃ¸nn"],"pk":["LÃ¸penummer"],' +
        '"fk":["FarNr","MorNr"],"x":317,"y":40.99999237060547,"kobling":false}],"forhold":[{"id":"rel_1","type":"Ikke-Identifiserende",' +
        '"fraForhold":"ent_4","tilForhold":"ent_4","fraEntitetNavn":"Person","tilEntitetNavn":"Person","maxKarTil":"*","maxKarFra":"1","minKarTil":"0",' +
        '"minKarFra":"0","navn":null},{"id":"rel_2","type":"Ikke-Identifiserende","fraForhold":"ent_4","tilForhold":"ent_4","fraEntitetNavn":"Person",' +
        '"tilEntitetNavn":"Person","maxKarTil":"*","maxKarFra":"1","minKarTil":"0","minKarFra":"0","navn":null}],"antallEnt":5,"antallRel":2}';

    data.push({
      author_id: authorID,
      difficulty_level_id: 5,
      title: 'Slektsdatabase',
      description: slektsDBHtml,
      solution: slektsDBJson,
      public: 1,
      extra_points: 50,
      tags: 'prosjekt, prosjektleder, prosjektdeltagelse',
      hint: '',
      hint_penalty: 10,
      created_at: new Date(),
      updated_at: new Date()
    });

      await queryInterface.bulkInsert('exercises', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('exercises', null, {});
    await queryInterface.sequelize.query('ALTER TABLE exercises AUTO_INCREMENT = 1');
  }
};
