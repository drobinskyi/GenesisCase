
async function getData() {
    const response = await fetch('./data/courses.json');
    const data = await response.json();
    return data;
}

async function main() {
    const data = await getData();
    const coursesData = data.courses;
    console.log(coursesData);
    let currentPage = 1;
    let rows = 10;

    // Відображення списку курсів
    function displayList(arrData, rowPerPage, page) {
        const postsEl = document.querySelector('#courses');
        postsEl.innerHTML = "";
        page--;

        const start = rowPerPage * page;
        const end = start + rowPerPage;
        const paginatedData = arrData.slice(start, end);

        paginatedData.forEach(el => {
            const postEl = document.createElement("div");
            postEl.classList.add("course");
        
            postEl.innerHTML = `
                <div class="course-image">
                    <img src="${el.previewImageLink}/cover.webp" alt="${el.description}">
                </div>
                <div class="course-info">
                    <h4>${el.title}</h4>
                    <p class="course-description">${el.description}</p>
                    <p class="course-rating">&#9733; ${el.rating}</p>
                </div>
            `
            postsEl.appendChild(postEl); 

            postEl.addEventListener('click', () => {
                showSelectCourse(el);
            })
        });
    }

    // Відображення пагінації
    function displayPagination(arrData, rowPerPage) {
        const paginationEl = document.querySelector('.pagination');
        const pagesCount = Math.ceil(arrData.length / rowPerPage);
        const ulEl = document.createElement("ul");
        ulEl.classList.add('pagination-list');

        for (let i = 0; i < pagesCount; i++) {
            const liEl = displayPaginationBtn(i + 1);
            ulEl.appendChild(liEl);
        }
        paginationEl.appendChild(ulEl);
    }

    // Робота кнопок пагінації
    function displayPaginationBtn(page) {
        const liEl = document.createElement("li");
        liEl.classList.add('pagination-item');
        liEl.innerHTML = page;

        if (currentPage == page) liEl.classList.add('pagination-item-active');

        liEl.addEventListener('click', () => {
            currentPage = page
            displayList(coursesData, rows, currentPage);

            let currentItemLi = document.querySelector('.pagination-item-active');
            currentItemLi.classList.remove('pagination-item-active');

            liEl.classList.add('pagination-item-active');
        })
        return liEl;
    }

    // Показ інформації про вибраний курс
    function showSelectCourse(el) {
        console.log(el);
        let launchDate = new Date(el.launchDate);
        launchDate = launchDate.toLocaleString();

        let courseWindow = document.querySelector('.modal');
        courseWindow.style.display = 'block';
        courseWindow.innerHTML = `
            <div class="modal-window">
                <img class="course-preview-img" src="${el.previewImageLink}/cover.webp" alt="${el.description}">
                <div class="modal-title">
                    <h4>${el.title}<span>&nbsp;&nbsp;&#9733;&nbsp;${el.rating}</span></h4>
                    <span id="close-modal">Close</span>
                </div>
                <div class="modal-description">
                    <p>${el.description}</p>
                </div>
                <div class="modal-launch-date">
                    <p>Launch date: ${launchDate}</p>
                    <p class="modal-status">Status: ${el.status}</p>
                </div>
            </div>
        `

        let closeCourseWindow = document.querySelector('#close-modal');
        closeCourseWindow.addEventListener('click', () => {
            courseWindow.style.display = 'none';
        });
    }
    
    displayList(coursesData, rows, currentPage);
    displayPagination(coursesData, rows);  
}

main();
