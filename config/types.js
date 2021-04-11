/**
 * @author Stian Helgerud
 * Fil med konstanter
 * */

const notation = { ER: 1, SIMPLIFIED_ER: 2, UML: 3 };
const userType = { STUDENT: 1, TEACHER: 2};
const achievementType = { COMPLETED_EXERCISES: 1, WITHOUT_CHECK: 2 };

const _numberOfAvatars = 6;
const avatarType = {
    NUMBER_OF_AVATARS: _numberOfAvatars,
    ADMIN_AVATAR: {"id": _numberOfAvatars, "filename": "admin.png"}
};

const defaultValue = {
    AVATAR: 1,
    RANK: 1,
    VERIFIED: false,
    NOTATION: notation.ER,
    USER_TYPE: userType.STUDENT,
    ACHIEVEMENT_TYPE: achievementType.COMPLETED_EXERCISES
};

module.exports.notation = notation;
module.exports.userType = userType;
module.exports.defaultValue = defaultValue;
module.exports.achievementType = achievementType;
module.exports.avatarType = avatarType;