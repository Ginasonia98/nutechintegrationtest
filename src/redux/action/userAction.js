const KEY = "Action";
export function loadState(sufix) {
  try {
    const intialUser = localStorage.getItem(`${sufix}_${KEY}`);
    if (!intialUser) return undefined;
    return JSON.parse(intialUser);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(sufix, state) {
  try {
    const intialUser = JSON.stringify(state);
    localStorage.setItem(`${sufix}_${KEY}`, intialUser);
  } catch (e) {
    console.log("error: ", e);
  }
}

export async function removeState(sufix) {
  try {
    localStorage.removeItem(`${sufix}_${KEY}`);
  } catch (e) {
    console.log("error", e);
  }
}

export async function updateState(sufix, state) {
  try {
    const intialUser = JSON.stringify(state);
    localStorage.setItem(`${sufix}_${KEY}`, intialUser);
  } catch (e) {
    console.log("error: ", e);
  }
}
