const url1 = ' https://dummyjson.com/posts';
const url2 = 'https://dummyjson.com/products';
const url3 = 'https://dummyjson.com/todos';

const getData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // show data in UI
          console.log(data);
          resolve(true);
        })
        .catch(error => {
          console.log(error);
          reject(false);
        });
    }, url === url1 ? 1000 : url === url2 ? 2000 : 3000); // set timeout based on url
  });
}

const promiseAPI10 = () => {
  return getData(url1);
}

const promiseAPI20 = (prevResult) => {
  if (prevResult) {
    return getData(url2);
  } else {
    return Promise.reject(false);
  }
}

const promiseAPI30 = (prevResult) => {
  if (prevResult) {
    return getData(url3);
  } else {
    return Promise.reject(false);
  }
}

const button = document.querySelector('button');
button.addEventListener('click', () => {
  promiseAPI10()
    .then(result => promiseAPI20(result))
    .then(result => promiseAPI30(result))
    .then(result => console.log('All promises resolved successfully'))
    .catch(error => console.log('Something went wrong:', error));
});