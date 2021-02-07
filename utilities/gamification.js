/**
 * Fil som tar seg av all spill logikk
 * */
const { Op } = require("sequelize");
const { Exercise, Difficulty_level, Rank } = require('../models');
const { TIMES_CHECKED_FACTOR, MIN_POINTS } = require('./values');
const { onExerciseCompleted } = require('../utilities/statistic')

// Event handeler som fikser det som skal gjøres når en besvarelse blir levert fra klient
// Klient skal bare sende med json når besvarelsen er løst, men server gjør en dobbel sjekk for å ungå fusk
// Om json besvarelse ikke får 100% progressjon fra server, så sendes en feilmeding til klienten og oppdateringer avsluttes.
exports.onJsonAnswerRecived = async (user, answer) => {

    const resMessage = {status: 'error', name: '', message: []}; // Objekt som skal returneres til klient med nyttig status melding

    const solution = await Exercise.findByPk(answer.exercise_id, {
        include: [{model: Difficulty_level, as: 'difficulty_level'}]
    });

    let updateUser = false;
    let updateAnswer = false;

    // Oppdaterer progresjonen som burde være 100% fra klienten
    await setProgression(answer, solution, resMessage);

    // Beregner poeng når progression === 100% (oppgaven er løst)
    if(answer.progression === 100){
        updateUser = true;
        updateAnswer = true;
        await setScore(user, answer, solution, resMessage);
    }

    if (updateUser){
        user.save(); // Lagrer ny score i databasen, trenger ikke await da bruker kan oppdateres når resten er ferdig
    }
    if(updateAnswer){
        await answer.save(); // Lagrer ny proggresjon i databsen
    }

    return resMessage;
}

// Metode som setter progressjonen til en besvarelse til 100 dersom den er fullført
setProgression = async (answer, solution, resMessage) => {
    const progression = await calculateProgression(answer, solution);

    if(progression !== 100){
        resMessage.name = 'Evaluation failed'
        resMessage.message.push(`The server evaluated your answer to be ${progression}% done, try again.`);
        resMessage.message.push('Your answer does not match the solution enough to be considered completed');
    }else{
        answer.progression = 100;
    }
}

// Metode som setter ny score i bruker
setScore = async (user, answer, solution, resMessage) => {
    // Antall mulige poeng
    const basePoints = solution.difficulty_level.points + solution.extra_points;
    const hintPenalty = solution.hint_penalty;

    const { penalty, points } = calculatePoints(
        answer.times_checked,
        answer.hint_used,
        hintPenalty,
        basePoints
    );

    answer.penalty_recived = Math.round(penalty);
    answer.points = Math.round(points);
    user.score += Math.round(points);

    // Setter completed til true og completed_at til nå i statistikk tabell
    await onExerciseCompleted(answer);

    // Oppdaterer ranken til bruker
    const rankUp = await setRank(user); // Returnerer om bruker gikk opp i rank

    resMessage.status = 'success'
    resMessage.name = 'Evaluation succeeded'
    resMessage.message.push('Congratulations, you have completed this exercise!');
    resMessage.message.push(`Maximum possible points: ${basePoints}`);
    resMessage.message.push(`Your points: ${points}`);
    resMessage.message.push(`You pressed 'check' ${answer.times_checked} times`);
    resMessage.message.push(answer.hint_used ? 'You used hint to solve this exercise' : 'You solved this exercise without using hint');
    resMessage.message.push(`Penalty received: ${penalty} points`);
    if(rankUp){resMessage.message.push('Congratulations you have a new rank');}
}

setRank = async (user) => {
    const oldRank = user.rank_id;
    const newRank = await Rank.findOne({
        where: { points_required: { [Op.lte] : user.score }},
        order: [['id', 'desc']]
    })

    user.rank_id = newRank.id;

    return oldRank !== newRank.id;
}

// Hjelpe metode som regner ut poegn
calculatePoints = (timesChecked, hintUsed, hintPenalty, basePoints) => {
    let penalty;
    if(hintUsed){
        penalty = hintPenalty + (timesChecked * (TIMES_CHECKED_FACTOR * basePoints));
    }else {
        penalty = timesChecked * TIMES_CHECKED_FACTOR;
    }
    let points = basePoints - penalty;
    return { penalty , points: points > MIN_POINTS ? points : MIN_POINTS }
}

calculateProgression = async (answer, solution) => {
    // TODO implementer algoritme
    console.log(answer.answer)
    if(answer.answer.toString() === solution.solution.toString()){
        return 100;
    }
    return 50; // Helt feil
}



