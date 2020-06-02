import Api from "./api";

export async function signIn(data) {
  const { email, password } = data;

  const response = await Api.post("/login", {
    email,
    password,
  });

  return response.data;
};

export async function signUp(data) {
  const { name, username, email, password } = data;

  const response = await Api.post("/register", {
    name,
    username,
    email,
    password,
  });

  return response.data;
}