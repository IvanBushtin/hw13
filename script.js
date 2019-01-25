jQuery(function ($) {
    const task = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = $('#task-list');
    const inputField = $('#input-field');

    if (task.length) {
        renderTask();
    }

    function saveTask() {
        if (task.length) {
            localStorage.setItem('tasks', JSON.stringify(task));
        }
    }

    function addTask(value) {
        task.push({
            value: value,
            completed: false,
        });
        renderTask();
        saveTask();
    }

    function renderTask() {
        taskList.empty();
        $.each(task, function (i) {
            taskList.append(`
              <li data-index="${i}">
                ${this.value}
                <input type="checkbox" ${this.completed && 'checked'} class="completeTask" value="false">
                <button>Delete Task</button>
              </li>
            `);
        });
    }

    function removeTask(index) {
        task.splice(index, 1);
        saveTask();
        renderTask();
    }

    function completeTask() {
        const parent = $(this).parent();
        const index = parent.data('index');
        const tasks = task[index];

        tasks.completed = !tasks.completed;

        task[index] = tasks;

        parent.toggleClass("done");

        saveTask();
    }

    function changeTask() {

    }

    inputField.on('change', function () {
        addTask(this.value);
        this.value = '';
    });
    $(taskList).on('click', 'button', function () {
        const index = $(this).parent().data('index');
        removeTask(index);
    })
    $(taskList).on('click', ".completeTask", completeTask)
});