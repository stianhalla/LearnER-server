# LearnER server
## Installasjon/oppsett: 
### 1. Instaler dependencies
```
npm install
```
### 2. Lag .env fil (hjemmekatalog)
```
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
DB_DIALECT=
NODE_ENV=development
PORT=3090
```
### 3. Lag config.js fil (hjemmekatalog)
```
module.exports = { secret : 'enTilfeldigLangString' } 
```
secret må byttes ut med egen **hemmelig** string
### 4. Bygge database med dummy data 
```
sequelize db:migrate 
sequelize db:seed:all
```
## Bruk av LearnER-server 
### 1. Starte server 
```
npm run dev
```
### 2. Slette database
SQL:
```
SET foreign_key_checks = 0;
drop table avatars, exercises, ranks, sequelizemeta, users,difficulty_levels, answers, rank_has_avatars, logins, user_exercise_stats, messages, synonyms, exercise_has_words, words, quiz_question_has_resources, db_quiz_alternatives, db_quiz_chapters, db_quiz_questions, db_quiz_resources;
SET foreign_key_checks = 1;
```
Sequelize:
```
sequelize db:seed:undo:all
sequelize db:migrate:undo:all
```
### 3. Velge fil til seed
```
sequelize db:seed --seed file1 file2 fileN
```
