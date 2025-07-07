export const updateUserProfile = (data, userId) => {
  const formData = new FormData();

  formData.append('email', data.email);
  formData.append('file', data.file[0]);
  formData.append('bgImage', data.bgImage);
  formData.append('username', data.username);
  formData.append('description', data.description);

  data.tags.forEach(item => {
    formData.append('tags', item);
  });

  return fetch('/server/user/' + userId, {
    method: 'PATCH',
    body: formData,
  }).then(res => res.json());
};
