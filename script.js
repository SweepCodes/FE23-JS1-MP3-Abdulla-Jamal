const form = document.querySelector("form");
const submitBtn = document.querySelector("#submit-btn");
const resultDiv = document.querySelector("#result-container");
const errorMsg = document.querySelector('#error-msg')

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#input-text").value;
  const radioName = document.querySelector("#name-choice").checked;
  const radioLang = document.querySelector("#lang-choice").checked;
  if (radioName) {
    getCountryByName(input);
  }
  else if (radioLang) {
    getCountryByLanguage(input);
  }
  else {
    resultDiv.innerHTML = " ";
    errorMsg.innerText = " check the box before you search for something "
    resultDiv.append(errorMsg)
  }
  form.reset();
});

function getCountryByName(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,subregion,flags,population`;
  fetch(URL)
    .then((res) => {
      // console.log(res.status)
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        throw "error";
      }
      else {
        throw 'server or network error'
      }
    })
    .then((result) => {
      resultDiv.innerHTML = "";
      for (const country of result) {
        const divEl = document.createElement('div')
        const nameTag = createEl('h1', divEl)
        const nameEl = createEl('h2', divEl);
        const subregionEl = createEl("h3", divEl);
        const capitalEl = createEl("h4", divEl);
        const populationEl = createEl("p", divEl);
        const flagEl = createEl("img", divEl);
        divEl.classList.add('box-style')
        //////////////////////////////////////////////////
        nameTag.innerText = 'Official Name:'
        nameEl.innerText = `${country.name.official}`;
        subregionEl.innerText = `Subregion: ${country.subregion}`;
        capitalEl.innerText = `Capital: ${country.capital}`;
        populationEl.innerText = `Population: ${country.population}`;
        flagEl.src = `${country.flags.png}`;

        divEl.append(nameTag, nameEl, subregionEl, capitalEl, populationEl, flagEl);
        resultDiv.append(divEl)
      }
    })
    .catch((error) => {
      console.log(error);
      if (error === 'error')
        displayError("type a valid country name");
      else displayError('Network or Server Error')
    });
}
function getCountryByLanguage(lang) {
  const URL = `https://restcountries.com/v3.1/lang/${lang}?fields=name,capital,subregion,flags,population`;
  fetch(URL)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else if (res.status === 404) {
        throw "error";
      }
      else {
        throw 'server or network error'
      }
    })
    .then((result => {
      resultDiv.innerHTML = "";
      result.sort((a, b) => b.population - a.population);
      for (const country of result) {
        const divEl = document.createElement('div')
        const nameTag = createEl('h1', divEl)
        const nameEl = createEl('h2', divEl);
        const subregionEl = createEl("h3", divEl);
        const capitalEl = createEl("h4", divEl);
        const populationEl = createEl("p", divEl);
        const flagEl = createEl("img", divEl);
        divEl.classList.add('box-style')
        //////////////////////////////////////////////////
        nameTag.innerText = 'Official Name:'
        nameEl.innerText = `${country.name.official}`;
        subregionEl.innerText = `Subregion: ${country.subregion}`;
        capitalEl.innerText = `Capital: ${country.capital}`;
        populationEl.innerText = `Population: ${country.population}`;
        flagEl.src = `${country.flags.png}`;

        divEl.append(nameTag, nameEl, subregionEl, capitalEl, populationEl, flagEl);
        resultDiv.append(divEl)

      }
    })).catch((error) => {
      console.log(error)
      if (error === 'error')
        displayError("type a valid language name");
      else displayError('Network or Server Error')
    });
}

function displayError(message) {
  resultDiv.innerHTML = " ";
  const errorMsg = document.createElement("h1");
  errorMsg.innerText = message;
  resultDiv.append(errorMsg);
}

function createEl(element, container) {
  const el = document.createElement(element)
  container.appendChild(el)
  return el;
}