const KEY = "User";
export function loadState(sufix) {
  try {
    // console.log(sufix, localStorage.getItem(`${sufix}_${KEY}`));
    const serializedState = localStorage.getItem(`${sufix}_${KEY}`);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(sufix, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(`${sufix}_${KEY}`, serializedState);
  } catch (e) {
    // Ignore
  }
}

export async function removeState(sufix) {
  try {
    localStorage.removeItem(`${sufix}_${KEY}`);
  } catch (e) {
    // Ignore
  }
}
