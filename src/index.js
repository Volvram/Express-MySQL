function displayAll(){
    // Получаем таблицу со страницы
    const table = document.querySelector('.students');

    // Запрашиваем данные из БД
    async function req(){
        let response = await fetch('http://localhost:3002/student');
        response = await response.json();

        // Отображаем данные
        response.forEach(student => {
            let string = document.createElement('tr');

            string.innerHTML = `<td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.patronymic}</td>
            <td>${student.group_id}</td>
            <td>${student.direction}</td>
            <td>${student.profile}</td>
            <td>${student.phone_number}</td>
            <td>${student.email}</td>`;

            table.append(string);
        });
    }
    req();
}

displayAll();