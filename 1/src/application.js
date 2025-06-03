// BEGIN
export default () => {
    const form = document.querySelector('form');
    const input = form.querySelector('input[name="number"]');
    const result = document.getElementById('result');
    const reset = document.querySelector('button[type="button"]');
    input.focus();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        result.textContent = parseInt(result.textContent, 10) + parseInt(input.value, 10);
        form.reset();
        input.focus();
    });
    reset.addEventListener('click', () => {
        result.textContent = 0;
        form.reset();
        input.focus();
    });
}
// END
