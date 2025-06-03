// BEGIN
// src/index.js
export default (companies) => {
    const container = document.querySelector('.container');
    const state = {
        companiesList: companies,
        uiState: {
            collapse: [
                {id: 1, visibility: 'hidden'},
                {id: 2, visibility: 'hidden'},
                {id: 3, visibility: 'hidden'}
            ]
        },
        currentDescription: null,
    };
    const render = (state) => {
        const existingDescription = container.querySelector('div');
        if (existingDescription) {
            container.removeChild(existingDescription);
        }
        if (state.currentDescription) {
            const descriptionDiv = document.createElement('div');
            descriptionDiv.textContent = state.currentDescription;
            container.appendChild(descriptionDiv);
        }
    };
    const createButton = (state) => {        
        state.companiesList.forEach(company => {
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.textContent = company.name;
            container.appendChild(button);
            button.addEventListener('click', () => {
                state.uiState.collapse.forEach(item => {
                    if (item.visibility === 'shown' && item.id === company.id) {
                        item.visibility = 'hidden';
                        state.currentDescription = null;
                    } else if (item.visibility === 'hidden' && item.id === company.id) {
                        item.visibility = 'shown';
                        state.currentDescription = company.description;
                    }
                });
                render(state);
            });
        });
    };
    createButton(state);
}
// END

