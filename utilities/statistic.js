/**
 * Fil for å håndtere automatiks oppdatering av user_exercise_stats tabell
 * */

const { User_exercise_stat } = require('../models');

// Når en besvarelse opprettes økes antall attempts med 1
exports.onAnswerCreated = async (answer) => {

    const [ row, build ] = await User_exercise_stat.findOrBuild({
        where: {user_id: answer.user_id, exercise_id: answer.exercise_id }
    })

    row.attempts += 1;

    await row.save();

}

exports.onExerciseCompleted = async (answer) => {

    const row = await User_exercise_stat.findOne({
        where: {user_id: answer.user_id, exercise_id: answer.exercise_id }
    })

    row.completed = true;
    row.completed_at = new Date();

    await row.save();
}
