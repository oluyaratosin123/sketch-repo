const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/ewWKj7zRfM05pYQRcA4r/likes/';

const postAllLikes = async (FirstItem) => {
  const result = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      item_id: FirstItem,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  return result.text();
};

export default postAllLikes;