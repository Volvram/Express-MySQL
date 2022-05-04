// Подключаем пакеты и порт (npm install body-parser express mysql request)
const express = require('express'); 
const port = 3002;
const app = express();
const bodyParser = require('body-parser');  //Парсер запросов
const routes = require('./routes/routes.js');

// Используем хранение файлов для динамической отправки
app.use(express.static('src'));     // src - директория

// Парсим URL и объекты в json-формат
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// Маршрутищируем запросы
routes(app);

// Старт сервера
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});