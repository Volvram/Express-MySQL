// Подгружаем модуль пула
const pool = require('../data/config.js');

const router = app => {
    // GET-запросы
    app.get('/', (request, response) => {
        response.sendFile(`src/index.html`, null, (error) => {
            if (error) throw error;
        });
    });
    app.get('/student', (request, response) => {
        pool.query(`SELECT student.id, student.name, student.surname, student.patronymic, student.group_id AS group_number, university.group.direction, university.group.profile, university.personal_information.phone_number, university.personal_information.email
        FROM student JOIN university.group
        ON student.group_id = university.group.id
        JOIN personal_information
        ON student.id = university.personal_information.student_id`, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });
    app.get('/student/:id', (request, response) => {       //Динамическая обработка запроса
        const id = request.params.id;       //Получение id из параметров запроса
        pool.query('SELECT * FROM university.student WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Post-запросы
    app.post('/student', (request, response) => {
        if (!request.body) return response.sendStatus(400);
        pool.query(`INSERT INTO university.student SET ?`, request.body, (error, result) => {
            if (error) throw error;
            response.status(201).send(`Student added  with ID: ${result.insertId}`);
        });
        console.log(request.body);
    });

    // PUT-запросы
    app.put('/student/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE university.student SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('Student updated successfully.');
        });
    });

    // DELETE-запросы
    app.delete('/student/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM university.student WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send('Student deleted.');
        });
    });
}

module.exports = router;