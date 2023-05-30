export const register = async ({ username, email, password } = {}) => {
  const user = { username, email, password };
  const baseURL = import.meta.env.VITE_REACT_APP_CLIENT_API_URL;

  try {
    const res = await fetch(`${baseURL}register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot register at this time. ${err}`);
  }
};

export const login = async ({ email, password } = {}) => {
  const user = { email, password };

  try {
    const res = await fetch(`${baseURL}login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return await res.json();
  } catch (err) {
    throw new Error(`Cannot login at this time. ${err}`);
  }
};

export const logout = async () => {
  try {
    const res = await fetch(`${baseURL}logout`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const res = await fetch(`${baseURL}user`, {
      method: "GET",
      credentials: "include",
    });
    return await res.json();
  } catch (err) {
    throw new Error("Please login to continue");
  }
};
