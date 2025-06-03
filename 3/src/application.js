// BEGIN
// src/index.js
export default (laptops) => {
    const form = document.querySelector('form');
    const selectProcessor = form.querySelector('select[name="processor_eq"]');
    const selectMemory = form.querySelector('select[name="memory_eq"]');
    const inputMin = form.querySelector('input[name="frequency_gte"]');
    const inputMax = form.querySelector('input[name="frequency_lte"]');
    const result = document.querySelector('.result');

    const state = {
        valueProcessor: "",
        valueMemory: "",
        valueMin: "",
        valueMax: "",
    }

    const filterLaptops = () => {
        const filteredLaptops = laptops.filter(laptop => {
            return Object.keys(state).every(key => {
                if (!state[key]) {
                    return true;
                }
                switch (key) {
                    case 'valueProcessor':
                        return laptop.processor === state[key];
                    case 'valueMemory':
                        return String(laptop.memory) === state[key];
                    case 'valueMin':
                        return laptop.frequency >= Number(state[key]);
                    case 'valueMax':
                        return laptop.frequency <= Number(state[key]);
                    default:
                        return true;
                }
            });
        });
        return filteredLaptops;
    };

    const renderResults = () => {
        const filteredLaptops = filterLaptops();

        if (filteredLaptops.length === 0) {
            result.innerHTML = '';
            return;
        }

        const ul = document.createElement('ul');
        ul.classList.add('list-group');

        filteredLaptops.forEach(laptop => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.textContent = laptop.model;
            ul.appendChild(li);
        });

        result.innerHTML = '';
        result.appendChild(ul);
    };

    selectProcessor.addEventListener('change', (e) => {
        e.preventDefault();
        state.valueProcessor = selectProcessor.value;
        renderResults();
    });

    selectMemory.addEventListener('change', (e) => {
        e.preventDefault();
        state.valueMemory = selectMemory.value;
        renderResults();
    });

    inputMin.addEventListener('input', (e) => {
        e.preventDefault();
        state.valueMin = inputMin.value;
        renderResults();
    });

    inputMax.addEventListener('input', (e) => {
        e.preventDefault();
        state.valueMax = inputMax.value;
        renderResults();
    });

    renderResults();
}
// END
