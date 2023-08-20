const postFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const body = document.querySelector('#post-body').value.trim();
    const type = document.querySelector('#post-type').value.trim();

    if (title && body && type) {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, body, type }),
            headers: { 'Content-type': 'application/json'},
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to post')
        }
    }
};

const dialog = document.getElementById("post-dialog");

document.getElementById("new-post").addEventListener("click", () => {
    dialog.showModal();
});

document.getElementById('post-cancel').addEventListener("click", () => {
    dialog.closest();
});

document
.querySelector ('#post-save')
.addEventListener('click', postFormHandler);