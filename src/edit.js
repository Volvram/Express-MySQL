

let sendingObject = [];

function displayAll(){
    // Получаем таблицу со страницы
    const table = document.querySelector('.edit-students');

    // Запрашиваем данные из БД
    async function req(){
        let response = await fetch('http://localhost:3002/student');
        response = await response.json();

        // Отображаем данные
        response.forEach(student => {
            let string = document.createElement('tr');

            string.innerHTML = `<td><input type='number' name='id' value=${student.id} readonly></td>
            <td><input type='text' name='name' value=${student.name}></td>
            <td><input type='text' name='surname' value=${student.surname}></td>
            <td><input type='text' name='patronymic' value=${student.patronymic}></td>
            <td><input type='text' name='group_id' value=${student.group_id}></td>
            <td><input type='text' name='direction' value='${student.direction}' readonly></td>
            <td><input type='text' name='profile' value='${student.profile}' readonly></td>
            <td><input type='text' name='phone_number' value=${student.phone_number}></td>
            <td><input type='email' name='email' value=${student.email}></td>`;

            table.append(string);
        });
    }

    req();
}

displayAll();