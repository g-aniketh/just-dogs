let timer;
let deleteFirstDelay;

async function getData() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    createBreedList(data.message);
  } catch (err) {
    console.log("There was a problem fetching the data.");
  }
}

getData();

function createBreedList(breedList) {
  const breedArr = Object.keys(breedList);

  document.querySelector(".breed").innerHTML = `
  <select onchange = "loadByBreed(this.value)">
    <option>Choose a dog breed</option>
    ${breedArr
      .map((breed) => {
        return `<option>${breed}</option>`;
      })
      .join("")}
  </select>
  `;
}

async function loadByBreed(breed) {
  if (breed != "Choose a dog breed") {
    try {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
      const data = await response.json();
      createSlideshow(data.message);
    } catch (err) {
      console.log("There was a problem loading the image.");
    }
  }
}

function createSlideshow(images) {
  let pos = 0;
  clearTimeout(timer);
  clearTimeout(deleteFirstDelay);

  if (images.length > 1) {
    document.querySelector(".slideshow").innerHTML = `
    <div class = "slide" style="background-image: url('${images[0]}')"></div>
    <div class = "slide" style="background-image: url('${images[1]}')"></div>
    `;
    pos += 2;

    if (images.length == 2) pos = 0;

    timer = setInterval(nextSlide, 2700);
  } else {
    document.querySelector(".slideshow").innerHTML = `
    <div class = "slide" style="background-image: url('${images[0]}')"></div>
    <div class = "slide"></div>
    `;
  }

  function nextSlide() {
    document.querySelector(".slideshow").insertAdjacentHTML(
      "beforeend",
      `
    <div class = "slide" style="background-image: url('${images[pos]}')"></div>
    `
    );

    deleteFirstDelay = setTimeout(() => {
      document.querySelector(".slide").remove();
    }, 1000);

    if (pos + 1 >= images.length) {
      pos = 0;
    } else {
      pos++;
    }
  }
}
