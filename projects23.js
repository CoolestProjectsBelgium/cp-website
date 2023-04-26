addEventListener('DOMContentLoaded', async (_) => {
    data = await getData();
    const cards = document.getElementById('cards')
    for (let card of data) {
        console.log(card)
        const html = `
            <div class="col-sm-6 col-lg-4 mb-4">
                <div class="card">
                    <div class="card-header">
                        <p>${card.projectName}</p>
                    </div>
                    <div class="card-body">
                        <p>${card.description}</p>
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
    const data = await fetch('http://localhost:8000/projects.json')
    return await data.json()
}

/**
 * @param {String} HTML represting a single element
 * @return {Element}
 */
const createElement = (html) => {
    var template = document.createElement('template');
    template.innerHTML = html;
    return template.content;
}
