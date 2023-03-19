async function getData() {
    const response = await fetch('../data/course.json');
    const data = await response.json();
    return data;
}

async function main() {
    const data = await getData();
    let lessons = data.lessons;

    function displayCourse(data) {
        const myCourseHeader = document.querySelector('.my-course-header');
        myCourseHeader.innerHTML = `
            <div class="course-image">
                <img src="${data.previewImageLink}/cover.webp" alt="${data.title}">
            </div>
            <div class="course-info">
                <h3>${data.title}</h3>
                <p class="course-description">${data.description}</p>
                <p class="course-rating">&#9733; ${data.rating}</p>
            </div>
        `
    }

    function displayLessons(arrData) {
        let lock = '';
        arrData.forEach(el => {
            if (el.status == 'locked') lock = '&#128274;';

            const lessonsList = document.querySelector('.my-course-lessons');
            console.log(el);
            lessonsList.innerHTML += `
                <div class="lesson">
                    <div class="lesson-image">
                        <img src="${el.previewImageLink}/lesson-${el.order}.webp" alt="video${el.order}">
                    </div>
                    <div class="lesson-title">
                        <h4>${el.order}.&nbsp;${el.title}&nbsp;${lock}</h4>
                    </div>
                </div>
            `
        });
    }

    displayCourse(data);
    displayLessons(lessons);
}
main();