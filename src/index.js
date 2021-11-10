const storeState = () => {
  let currentState = {};
  return (stateChangeFunction = state => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = {...newState};
    return newState;
  };
};

const newStoreState = (initialState) => {
  let currentState = initialState; // sets state to given argument
  return (stateChangeFunction = state => state) => { // if no argument is passed in, the stateChangeFunction will be state.. returning the current state
    const newState = stateChangeFunction(currentState); // uses inputted function and current given state to change into new state
    currentState = {...newState}; // updates current state to be the new state
    return newState; // returns new state
  };
};

const stateControl = storeState();

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state, // returns new state object
      [prop] : (state[prop] || 0) + value
    });
  };
};

const newCreature = (givenName) => {
  const obj = {
    name: givenName
  };
  return obj;
};

//const feed = changeState("soil")(1);
const blueFood = changeState("soil")(5);

//const hydrate = changeState("water")(1);
//const superWater = changeState("water")(5);

$(document).ready(function() {
  let creatureArray = [];

  $('#feed').click(function() {
    const newState = stateControl(blueFood);
    $('#soil-value').text(`Soil: ${newState.soil}`);
  });

  $('#show-state').click(function() {
    const currentState = stateControl();
    $('#soil-value').text(`Soil: ${currentState.soil}`);
  });

  $('#new-plant-form').submit(function(event) {
    event.preventDefault();
    const name = $('#name').val();
    const newPlant = newCreature(name);
    creatureArray.push(newPlant);
    displayAllPlants(creatureArray);
  });
});

function displayAllPlants(array) {
  const plantsHtml = array.map((plant) => {
    const plantStateControl = newStoreState(plant);
    const singlePlantState = plantStateControl();
    return `<li> Plant Name: ${singlePlantState.name}</li>`;
  });
  $('#all-plants').html(plantsHtml);
}