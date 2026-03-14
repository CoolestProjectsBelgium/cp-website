addEventListener('DOMContentLoaded', async (_) => {
    const data = await getData();
    const cards = document.getElementById('cards')
    for (let card of data) {
        // console.log(card)
        const html = `
            <div class="col-sm-6 col-lg-4 mb-4">
                <div class="accordion" id="${trimId(card.projectID)}-parent">
                    <div class="card">
                        <div class="accordion-item">
                            <div class="card-header accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${trimId(card.projectName)}" aria-expanded="true" aria-controls="collapseOne">
                                    ${card.link ?
                `<a href="${card.link}">` :
                ''
            }
                                    <h3>${card.projectName}</h3>
                                    ${card.link ? '</a>' : ''}
                                </button>
                                <p>${card.participants}</p>
                            </div>
                            <div class="card-body">
                                <div id="${trimId(card.projectID)}" class="accordion-collapse collapse" data-bs-parent="#${trimId(card.projectID)}-parent">
                                    <div class="accordion-body">
                                        <img class="card-img" src="${(card.pic === undefined) ? " " : card.pic}" alt="/">
                                    </div>
                                </div>
                                <p>${card.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        cards.appendChild(createElement(html));
    }
})

/**
 *  @return {Promise}
 */
const getData = async () => {
    const data = await fetch('https://backend.coolestprojects.be/website/planning/6/projects.json')
    return await data.json()
}

/**
 * @param {String} HTML represting a single element
 * @return {Element}
 */
const createElement = (html) => {
    let template = document.createElement('template');
    // Sanitize the HTML input to prevent XSS
    template.innerHTML = DOMPurify.sanitize(html);
    return template.content;
}

/**
 * @param {String} string the name of the id
 * @return {String} trimmed string
 */
const trimId = (string) => {
    console.log('trimId debugging: Value:', string, 'Type:', typeof string);
    
    // if input is null, undefined, or not a string, return an empty string
    if (typeof string !== 'string') {
        return '';
    }

    const res = string
        .trim()
        .replaceAll(' ', '')
        .replaceAll('\'', '')
        .replaceAll(/[()\d]+/g, '');
    return res;
}
