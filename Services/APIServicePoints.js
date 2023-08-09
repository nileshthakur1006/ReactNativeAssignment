export const EndPoints = {
  login: 'users/login',
};

export const getPostList = (limit = 10, offset = 0) => {
  return `articles?limit=${limit}&offset=${offset}`;
};

export const getPostDetails = slug => {
  return `articles/${slug}`;
};

export const getAndPostComments = slug => {
  return `articles/${slug}/comments`;
};

export const deleteComment = (slug, id) => {
  return `https://api.realworld.io/api/articles/${slug}/comments/${id}`;
};

export default EndPoints;
