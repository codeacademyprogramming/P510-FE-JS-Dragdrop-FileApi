// const box = document.querySelector('.box');

// box.addEventListener('dragstart', (e) => {
// });

// box.addEventListener('drag', (e) => {

// });

// box.addEventListener('dragend', (e) => {

// })

const taskList = Array.from(document.querySelectorAll('.task-list li'));
// const dropArea = document.querySelector('.task-list-2');
const todoList = document.querySelector('.to-do');
const inProgressList = document.querySelector('.in-progress');
const doneList = document.querySelector('.done');


[todoList, inProgressList, doneList].forEach((dropArea) => {
    dropArea.addEventListener('drop', (e) => {
        if (dropArea === e.target) {
            dropArea.append(document.getElementById(e.dataTransfer.getData('text')));
            dropArea.classList.remove('active');
        } else {
            console.log('salammm')
        }
    });

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('active');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('active');
    });
})

taskList.forEach((taskItem) => {
    taskItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', taskItem.id);
    });

    taskItem.addEventListener('dragend', (e) => {
        console.log(e.target);
    });
});

// const colorItems = Array.from(document.querySelectorAll('.color-item'));
const colorDropBox = document.querySelector('.color-drop-box');

// colorItems.forEach((colorItem) => {
//     const redTone = colorItem.getAttribute('data-red');
//     const greenTone = colorItem.getAttribute('data-green');
//     const blueTone = colorItem.getAttribute('data-blue');
//     const finalColor = `rgb(${redTone}, ${greenTone}, ${blueTone})`;
//     colorItem.style.backgroundColor = finalColor;

//     colorItem.addEventListener('dragstart', (e) => {
//         const colorObj = {
//             red: redTone,
//             green: greenTone,
//             blue: blueTone
//         };
//         const stringifiedColorObject = JSON.stringify(colorObj);

//         e.dataTransfer.setData('text', stringifiedColorObject);
//     });
// });

const colorInputsWrapper = Array.from(document.querySelectorAll('.color-inputs-wrapper input'));
const createColorSpanButton = document.querySelector('.create-color-span');
const colorSpansWrapper = document.querySelector('.color-spans-wrapper');
colorInputsWrapper.forEach(colorInput => {
    colorInput.addEventListener('keydown', (e) => {
        if (e.target.value.length > 2 && e.which <= 57 && e.which >= 48) {
            e.preventDefault();
        }
    });

    colorInput.addEventListener('input', (e) => {
        const inputValue = parseInt(e.target.value);
        if (inputValue > 255) {
            e.target.value = "";
        }
    });
});


createColorSpanButton.onclick = function () {
    const colorObject = {};
    colorInputsWrapper.forEach((colorInput) => {
        colorObject[colorInput.name] = colorInput.value;
    });

    const colorSpan = document.createElement('span');
    const listItem = document.createElement('li');

    colorSpan.setAttribute('data-red', colorObject.red);
    colorSpan.setAttribute('data-green', colorObject.green);
    colorSpan.setAttribute('data-blue', colorObject.blue);
    colorSpan.setAttribute('draggable', "true");
    colorSpan.classList.add('color-item');

    const finalColor = `rgb(${colorObject.red}, ${colorObject.green}, ${colorObject.blue})`;
    colorSpan.style.backgroundColor = finalColor;

    colorSpan.addEventListener('dragstart', (e) => {
        const stringifiedColorObject = JSON.stringify(colorObject);

        e.dataTransfer.setData('text', stringifiedColorObject);
    });

    listItem.append(colorSpan);
    colorSpansWrapper.append(listItem);
}



colorDropBox.addEventListener('dragover', (e) => {
    e.preventDefault();
});

colorDropBox.addEventListener('drop', (e) => {
    const { red, green, blue } = JSON.parse(e.dataTransfer.getData('text'));
    const dropBoxRedTone = colorDropBox.getAttribute('data-red');
    const dropBoxGreenTone = colorDropBox.getAttribute('data-green');
    const dropBoxBlueTone = colorDropBox.getAttribute('data-blue');

    const finalRedColor = Math.floor((+red + +dropBoxRedTone) / 2);
    const finalGreenColor = Math.floor((+green + +dropBoxGreenTone) / 2);
    const finalBlueColor = Math.floor((+blue + +dropBoxBlueTone) / 2);

    colorDropBox.setAttribute('data-red', finalRedColor);
    colorDropBox.setAttribute('data-green', finalGreenColor);
    colorDropBox.setAttribute('data-blue', finalBlueColor);

    const finalDropBoxColor = `rgb(${finalRedColor}, ${finalGreenColor}, ${finalBlueColor})`;

    colorDropBox.style.backgroundColor = finalDropBoxColor;
});