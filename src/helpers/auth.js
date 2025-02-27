export const userRegister = data => {
  fetch('/server/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
