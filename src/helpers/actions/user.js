export const updateUserProfile = (data, userId) => {
  const formData = new FormData();
  formData.append('file', data.file[0]);
  formData.append('username', data.username);
  formData.append('email', data.email);

  return fetch('/server/user/' + userId, {
    method: 'PATCH',
    body: formData,
  }).then(res => res.json());
};
