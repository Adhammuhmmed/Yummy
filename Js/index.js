// ? =============> Global ===============>
const closeBtn = document.getElementById("closeBtn");
const openBtn = document.getElementById("openBtn");
const loading = document.querySelector(".loading");
let inputs = document.querySelectorAll(".home input");
const rowData = document.getElementById("rowData");
const searchName = document.getElementById("searchName");
const searchLetter = document.getElementById("searchLetter");
homeData();

// SIDEBAR
function closeSide() {
  $(".side-bar").animate({ left: "-250px" }, 500);
  $(".links a").animate({ top: "200px" }, 250);
  $(openBtn).show(0);
  $(closeBtn).hide(0);
}
function openSide() {
  $(".side-bar").animate({ left: "0" }, 500, function () {
    for (let i = 0; i < 5; i++) {
      $(".links a")
        .eq(i)
        .animate({ top: "0" }, (i + 5) * 100);
    }
  });
  $(openBtn).hide(0);
  $(closeBtn).show(0);
}

closeBtn.addEventListener("click", () => {
  closeSide();
});
openBtn.addEventListener("click", () => {
  openSide();
});
// SIDEBAR
// ? =============> Global ===============>

//  =============> HOME ===============>
async function homeData() {
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s`
  );
  const response = await api.json();
  const responseMeals = response.meals;
  loading.classList.add("d-none");
  displayHomeData(responseMeals);
}
function displayHomeData(responseMeals) {
  $(".search-input").css({ display: "none" });
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `                <div class="item col-md-3" onclick="details(${responseMeals[i].idMeal})">
        <div class="inner">
            <img src="${responseMeals[i].strMealThumb}" alt="Meal Image" class="w-100">
            <div class="layer">
                    <h3>${responseMeals[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  rowData.innerHTML = box;
}
//  =============> HOME ===============>

// ! =============> SEARCH ===============>
document.getElementById("searchLink").addEventListener("click", () => {
  closeSide();
  // $(openBtn).show(0);
  // $(closeBtn).hide(0);
  $("#searchSection").css({ opacity: "1" });
  $(".search-input").css({ display: "flex" });
  $("#rowData").css({ opacity: "0" });
  document.getElementById("form").classList.add("d-none");
});
searchName.addEventListener("input", async function () {
  const nameTerm = searchName.value;
  await searchByName(nameTerm);
});
async function searchByName() {
  const nameTerm = searchName.value;
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${nameTerm}`
  );
  const response = await api.json();
  const mealResponse = await response.meals;
  loading.classList.add("d-none");

  dispalySearchName(mealResponse);
}
function dispalySearchName(array) {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `<div class="item col-md-3"  onclick="details(${array[i].idMeal})">
<div class="inner">
    <img src="${array[i].strMealThumb}" alt="Meal Image" class="w-100">
    <div class="layer">
            <h3>${array[i].strMeal}</h3>
    </div>
</div>
</div>`;
  }
  rowData.innerHTML = box;
  $("#rowData").css({ opacity: "1" });
}
searchLetter.addEventListener("input", async function () {
  const letterTerm = searchLetter.value;
  await searchByLetter(letterTerm);
});
async function searchByLetter() {
  const letterTerm = searchLetter.value;
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${letterTerm}`
  );
  const response = await api.json();
  const mealResponse = await response.meals;
  loading.classList.add("d-none");
  dispalySearchLetter(mealResponse);
}
function dispalySearchLetter(array) {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `<div class="item col-md-3"  onclick="details(${array[i].idMeal})">
<div class="inner">
    <img src="${array[i].strMealThumb}" alt="Meal Image" class="w-100">
    <div class="layer">
            <h3>${array[i].strMeal}</h3>
    </div>
</div>
</div>`;
  }
  rowData.innerHTML = box;
  $("#rowData").css({ opacity: "1" });
}
// ! =============> SEARCH ===============>

//  =============> CATEGORY ===============>
document.getElementById("categoryLink").addEventListener("click", () => {
  closeSide();
  $("#rowData").css({ opacity: "0" });
  $("#searchSection").css({ opacity: "0" });
  document.getElementById("form").classList.add("d-none");
  category();
});
async function category() {
  $(".search-input").css({ display: "none" });
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );
  const response = await api.json();
  const responseCategories = response.categories;
  loading.classList.add("d-none");
  displayCategory(responseCategories);
}
function displayCategory(array) {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    box += `  <div class="item col-md-3" onclick="categorMeal('${array[i].strCategory}')">
            <div class="inner overflow-hidden text-center">
                <img src="${array[i].strCategoryThumb}" alt="Meal Image" class="w-100">
                <div class="layer d-flex flex-column text-center overflow-hidden">
                        <h3>${array[i].strCategory}</h3>
                        <p>${array[i].strCategoryDescription}</p>
                </div>
            </div>
        </div>`;
  }
  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
async function categorMeal(category) {
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  const response = await api.json();
  const responsMeals = response.meals;
  loading.classList.add("d-none");

  displayCategoryMeals(responsMeals);
}
function displayCategoryMeals(array) {
  let box = "";
  for (let i = 0; i < 20; i++) {
    box += `<div class="item col-md-3" onclick="details(${array[i].idMeal})">
         <div class="inner">
             <img src="${array[i].strMealThumb}" alt="Meal Image" class="w-100">
             <div class="layer">
                     <h3>${array[i].strMeal}</h3>
             </div>
         </div>
     </div>`;
  }
  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
//  =============> CATEGORY ===============>

// ! =============> DETAILS ===============>
async function details(itemId) {
  closeSide();
  $(openBtn).show(0);
  $(closeBtn).hide(0);
  $("#rowData").css({ opacity: "0" });
  $("#searchSection").css({ opacity: "0" });
  document.getElementById("form").classList.add("d-none");
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${itemId}`
  );
  const response = await api.json();
  const responseDetails = response.meals;
  loading.classList.add("d-none");
  displayDetails(responseDetails);
}
function displayDetails(array) {
  $(".search-input").css({ display: "none" });
  let box = ` <div class="row details-row">
                <div class="image-col col-md-4">
                  <div class="image">
                    <img src="${array[0].strMealThumb}" alt="Meal Image" class="w-100">
                  </div>
                  <h3 class="my-3">${array[0].strMeal}</h3>
                </div>
                <div class="info-col col-md-8">
                  <div class="instructions">
                    <h1>Instructions</h1>
                    <p>${array[0].strInstructions}</p>
                    <h2>Area : ${array[0].strArea}</h2>
                    <h2>Category : ${array[0].strCategory}</h2>
                    <h2>Recipes :</h2>
                    <div class="recipes d-flex gap-3 flex-wrap my-2">
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure1}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure2}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure3}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure4}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure5}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure6}</span></p>
                      <p><span class="badge text-bg-secondary">${array[0].strMeasure7}</span></p>
                    </div>
                    <h2>Tags :</h2>
                    <div class="tags my-2">
                      <a href="${array[0].strSource}" class="btn btn-success">Source</a>
                      <a href=https://"${array[0].strYoutube}" class="btn btn-danger">Youtube</a>
                    </div>
                  </div>
                </div>
              </div>`;
  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
// ! =============> DETAILS ===============>

//  =============> AREA ===============>
document.getElementById("areaLink").addEventListener("click", () => {
  closeSide();
  $(openBtn).show(0);
  $(closeBtn).hide(0);
  $("#rowData").css({ opacity: "0" });
  $("#searchSection").css({ opacity: "0" });
  document.getElementById("form").classList.add("d-none");
  areaData();
});
async function areaData() {
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );
  const response = await api.json();
  const responseArea = response.meals;
  loading.classList.add("d-none");
  diplayArea(responseArea);
}
function diplayArea(array) {
  $(".search-input").css({ display: "none" });
  let box = ``;
  for (let i = 0; i < 20; i++) {
    box += `    <div class="item col-md-3 area" onclick="areaMeal('${array[i].strArea}')">
    <div class="inner text-center">
      <span class"home-icon"><i class="fa-solid fa-house-laptop"></i></span>
      <h3 class="area-text">${array[i].strArea}</h3> 
    </div>
</div>`;
  }

  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
async function areaMeal(area) {
  $("#rowData").css({ opacity: "0" });
  $("#searchSection").css({ opacity: "0" });
  $("#form").css({ display: "none" });
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );
  const response = await api.json();
  const responseaAreaMeal = response.meals;
  loading.classList.add("d-none");
  displayOnlyAreaMeals(responseaAreaMeal);
}
function displayOnlyAreaMeals(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `<div class="item col-md-3" onclick="details(${array[i].idMeal})">
         <div class="inner">
             <img src="${array[i].strMealThumb}" alt="Meal Image" class="w-100">
             <div class="layer">
                     <h3>${array[i].strMeal}</h3>
             </div>
         </div>
     </div>`;
  }
  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
//  =============> AREA ===============>

// ! =============> INGRRDIENT ===============>
document.getElementById("ingredientLink").addEventListener("click", () => {
  closeSide();
  $(openBtn).show(0);
  $(closeBtn).hide(0);
  $("#rowData").css({ opacity: "0" });
  $("#searchSection").css({ opacity: "0" });
  document.getElementById("form").classList.add("d-none");
  ingredients();
});
async function ingredients() {
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  const response = await api.json();
  const responseIngerdientsMeal = response.meals;
  loading.classList.add("d-none");
  displayIngredients(responseIngerdientsMeal);
}
function displayIngredients(array) {
  $(".search-input").css({ display: "none" });
  let box = ``;
  for (let i = 0; i < 20; i++) {
    box += `    <div class="item col-md-3 ingredients overflow-hidden" onclick="ingredientsMeal('${array[i].strIngredient}')">
    <div class="inner text-center overflow-hidden">
      <span class"home-icon"><i class="fa-solid fa-drumstick-bite"></i></span>
      <h3 class="area-text">${array[i].strIngredient}</h3>
      <p>${array[i].strDescription}</p>
    </div>
</div>`;
  }

  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
async function ingredientsMeal(ingredient) {
  loading.classList.remove("d-none");
  const api = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );
  const response = await api.json();
  const responseaIngredientMeal = response.meals;
  loading.classList.add("d-none");
  displayIngredientsMeals(responseaIngredientMeal);
}
function displayIngredientsMeals(array) {
  let box = "";
  for (let i = 0; i < array.length; i++) {
    box += `<div class="item col-md-3" onclick="details(${array[i].idMeal})">
         <div class="inner">
             <img src="${array[i].strMealThumb}" alt="Meal Image" class="w-100">
             <div class="layer">
                     <h3>${array[i].strMeal}</h3>
             </div>
         </div>
     </div>`;
  }
  $("#rowData").css({ opacity: "1" });
  rowData.innerHTML = box;
}
// ! =============> INGRRDIENT ===============>

//  =============> CONTACT ===============>
document.getElementById("contactLink").addEventListener("click", () => {
  closeSide();
  $(openBtn).show(0);
  $(closeBtn).hide(0);
  $("#rowData").css({ opacity: "0" });
  $(".search-input").css({ display: "none" });
  document.getElementById("form").classList.remove("d-none");
  loading.classList.add("d-none");
});

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    submit();
  });
});

// ! =============> VALIDTION ===============>
function submit() {
  const submitBtn = document.getElementById("submitBtn");
  if (
    validName() &&
    validEmail() &&
    validPhone() &&
    validAge() &&
    validPassword() &&
    validRePassword()
  ) {
    submitBtn.removeAttribute("disabled");
  } else {
    submitBtn.setAttribute("disabled", true);
  }
}
function validName() {
  const regex = /^[A-Za-z\s'-]+$/;
  const text = nameInput.value;
  const alertMsg = document.getElementById("alertMsgName");
  if (regex.test(text) == true) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
function validEmail() {
  const regex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  const text = emailInput.value;
  const alertMsg = document.getElementById("alertEmailMsg");
  if (regex.test(text) == true) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
function validPhone() {
  const regex = /^\+?[0-9()-]{7,20}$/gm;
  const text = phoneInput.value;
  const alertMsg = document.getElementById("alertPhoneMsg");
  if (regex.test(text) == true) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
function validAge() {
  const regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/gm;
  const text = ageInput.value;
  const alertMsg = document.getElementById("alertAgeMsg");
  if (regex.test(text) == true) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
function validPassword() {
  const regex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
  const text = passwordInput.value;
  const alertMsg = document.getElementById("alertPasswordMsg");
  if (regex.test(text) == true) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
function validRePassword() {
  const alertMsg = document.getElementById("alertRePasswordMsg");
  if (passwordInput.value === rePasswordInput.value) {
    alertMsg.classList.add("d-none");
    return true;
  } else {
    alertMsg.classList.remove("d-none");
    return false;
  }
}
//  =============> CONTACT ===============>
