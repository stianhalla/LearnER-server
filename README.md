# LearnER server
## Installasjon/oppsett: 
### 1. Instaler dependencies
```
npm install
```
### 2. Lag .env fil (hjemmekatalog)
```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=
DB_PORT=3306
DB_DIALECT=mysql
NODE_ENV=development
PORT=3090
EMAIL=
EMAIL_PASSWORD=
EMAIL_SERVICE=Outlook365
API_URL=http://localhost:3090/api
CLIENT_HOMEPAGE=http://localhost:3000
SECRET=enTilfeldigLangString

```
### 3. Bygge database med dummy data 
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
drop table avatars, exercises, ranks, sequelizemeta, users,difficulty_levels, answers, rank_has_avatars, logins, user_exercise_stats, messages, synonyms, exercise_has_words, words, user_has_achievements, achievements ,quiz_question_has_resources, db_quiz_alternatives, db_quiz_chapters, db_quiz_questions, db_quiz_resources;
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


### DEPLOYMENT
heroku login
git push heroku master

heroku run bash
npm install -g sequelize-cli

sequelize db:seed:undo:all
sequelize db:migrate:undo:all
sequelize db:migrate 
sequelize db:seed:all

# slett alle brukere
# legg inn gamle brukere 
alter table users auto_increment = 5
# oppdater author_id i oppgaver

# Oppdatere synonymer
sequelize db:seed:undo --seed 20210203150545-synonym-data-seeder.js
sequelize db:seed --seed 20210203150545-synonym-data-seeder.js
