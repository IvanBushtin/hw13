jQuery(function ($) {
    const task = [];
    const taskList = $('#task-list');
    const inputField = $('#input-field');

    function addTask(value) {
        task.push(value);
        renderTask();
    }

    function renderTask() {
        taskList.empty();
        $.each(task, function (i) {
            taskList.append(`
                        <li>
                            ${this}<button data-index="${i}">Delete Task</button></li>`);
        });
    }

    function removeTask(index) {
        task.splice(index, 1);
        renderTask();
    }

    inputField.on('change', function () {
        addTask(this.value);
        this.value = '';
    });

    $(taskList).on('click', 'button', function () {
        const index = $(this).data('index');
        removeTask(index);
    })
});