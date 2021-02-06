/**
 * Fil som tar seg av all spill logikk
 * */
const { Op } = require("sequelize");
const { Exercise, Difficulty_level, Rank } = require('../models');
const { TIMES_CHECKED_FACTOR, MIN_POINTS } = require('./values');
const { onExerciseCompleted } = require('../utilities/statistic')

// Event handeler som fikser det som skal gjøres når en besvarelse blir oppdatert
exports.beforeAnswerUpdate = async (user, answer) => {

    const solution = await Exercise.findByPk(answer.exercise_id, {
        include: [{model: Difficulty_level, as: 'difficulty_level'}]
    });

    let updateUser = false;

    // Oppdaterer progresjonen om det er endringer i json besvarelse
    await setProgression(answer, solution);

    // Beregner poeng når progression === 100% (oppgaven er løst)
    if(answer.progression === 100){
        updateUser = true;
        await setScore(user, answer, solution);
    }

    if (updateUser){
        await user.save(); // Lagrer ny score i databasen TODO bruker ca 100ms -> noen forbedringer?
    }

    await answer.save(); // Lagrer ny proggresjon i databsen TODO Kan være redundant da metoden som kaller kjører update rett etterpå

}

// Metode som øker progresjonen til en oppgave
setProgression = (answer, solution) => {
    //calculateProgression();
    // TODO bedre algoritme trengs
    if(answer.answer.toString() === solution.solution.toString()){
        answer.progression = 100;
    }
}

// Metode som setter ny score i bruker
setScore = async (user, answer, solution) => {
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
    user.score += Math.round(points);

    // Setter completed til true og completed_at til nå i statistikk tabell
    await onExerciseCompleted(answer);

    // Oppdaterer ranken til bruker
    await setRank(user);

}

setRank = async (user) => {
    const newRank = await Rank.findOne({
        where: { points_required: { [Op.lte] : user.score }},
        order: [['id', 'desc']]
    })
    user.rank_id = newRank.id;
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

calculateProgression = () => {
    // TODO
}



