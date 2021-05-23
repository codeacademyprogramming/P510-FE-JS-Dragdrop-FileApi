const fileUploadInput = document.getElementById('file-upload');
const imagePlaceholderTop = document.getElementById('image-placeholder');
const imagePlaceholderBottom = document.getElementById('image-placeholder-2');

fileUploadInput.addEventListener('change', (e) => {
    Array.from(e.target.files).forEach((file) => {
        previewImage(file, imagePlaceholderTop);
    });
});

function previewImage(file, ip) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    // console.log(e.target.files[0].lastModifiedDate);

    fileReader.onloadend = function () {
        // creating an image
        const wrapper = document.createElement('div');
        const image = document.createElement('img');
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-danger', 'mt-5');
        button.innerText = 'Delete this file';
        // image.src = fileReader.result;
        image.setAttribute('src', fileReader.result);
        wrapper.append(image, button);
        ip.append(wrapper);

        // deleting file
        button.onclick = function () {
            // If ok button is pressed then confirmed's value is true, else confirmed's value is false
            const confirmed = window.confirm('Delete etmek istediyinizden eminsinizmi?');

            if (confirmed) {
                wrapper.remove();
            }
        }
    }
}

const dropFileContainer = document.querySelector('.image-drop-area');

// Longer
// dropFileContainer.addEventListener("dragenter", (e) => {
//     e.preventDefault();
// });

// dropFileContainer.addEventListener("drag", (e) => {
//     e.preventDefault();
// })

// dropFileContainer.addEventListener("dragover", (e) => {
//     e.preventDefault();
// })

// Shorter
["dragenter", "dragover", "drag", "drop", "dragleave"].forEach((event) => {
    dropFileContainer.addEventListener(event, (e) => {
        e.preventDefault();
    });
});


dropFileContainer.addEventListener("drop", (e) => {
    Array.from(e.dataTransfer.files).forEach((file) => {
        previewImage(file, imagePlaceholderBottom);
    });
});


