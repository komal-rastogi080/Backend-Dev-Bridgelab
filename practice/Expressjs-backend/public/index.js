
const form = document.querySelector('form');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.querySelector('input[name="name"]').value.trim();
    const branch = document.querySelector('input[name="branch"]').value.trim();
    
    if (!name || !branch) {
        alert('Please fill in all fields');
        return;
    }
    form.submit();
});
