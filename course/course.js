async function getData() {
    const response = await fetch('../data/course.json');
    const data = await response.json();
    return data;
}

async function main() {
    const data = await getData();
    console.log(data);
}

main();