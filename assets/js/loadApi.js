const fetchApi = async (url) => {
  let results;
  await fetch(url)
    .then((res) => res.json())
    .then((res) => {
      results = res.results;
    })
    .catch((err) => {
      console.error(err);
    });
  return results;
}


const fetchDb = async (url, body) => {
  let config;
  if (body) {
    config = {
      'method': 'POST',
      'body': body,
    }
  }
  let response;
  await fetch(url, config ? config : null)
    .then((res) => res.json())
    .then((res) => {
      if (res !== 'OK') {
        response = res;
      }
    })
    .catch((err) => {
      console.error(err);
    });
  return response;
}


async function getApiUrls() {
  const imagesUrl = await getApiUrlFetch("img");
  const trendingUrl = await getApiUrlFetch("trend");
  const apiUrl = await getApiUrlFetch("api");
  const genresUrl = await getApiUrlFetch("genres");

  return { apiUrl, trendingUrl, imagesUrl, genresUrl };
}

async function getApiUrlFetch(type) {
  let url = '';

  await fetch(`src/controllers/GetApi.php?type=${type}`)
    .then(res => res.json())
    .then((res) => {
      url = res;
    })
    .catch(err => console.error(err));
  return url;
}