import axios from 'axios';
const url = 'https://dry-waters-53761.herokuapp.com';
// const url = 'http://localhost:3001';

export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
  // const request = axios(url, {});

  const request = axios
    .get(`${url}/api/books?limit=${limit}&skip=${start}&order=${order}`)
    .then(response => {
      if (list) {
        return [...list, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: 'GET_BOOKS',
    payload: request,
  };
}

export function getBookWithReviewer(id) {
  const request = axios.get(`${url}/api/getBook?id=${id}`);

  return dispatch => {
    request.then(({ data }) => {
      let book = data;

      axios
        .get(`${url}/api/getReviewer?id=${book.ownerId}`)
        .then(({ data }) => {
          let response = {
            book,
            reviewer: data,
          };

          dispatch({
            type: 'GET_BOOK_W_REVIEWER',
            payload: response,
          });
        });
    });
  };
}

export function clearBookWithReviewer() {
  return {
    type: 'CLEAR_BOOK_W_REVIEWER',
    payload: {
      book: {},
      reviewer: {},
    },
  };
}

export function addBook(book) {
  const request = axios
    .post(`${url}/api/book`, book)
    .then(response => response.data);

  return {
    type: 'ADD_BOOK',
    payload: request,
  };
}
export function clearNewBook() {
  return {
    type: 'CLEAR_NEWBOOK',
    payload: {},
  };
}

export function getUserPosts(userId) {
  const request = axios
    .get(`${url}/api/user_posts?user=${userId}`)
    .then(response => response.data);

  return {
    type: 'GET_USER_POSTS',
    payload: request,
  };
}

export function getBook(id) {
  const request = axios
    .get(`${url}/api/getBook?id=${id}`)
    .then(response => response.data);

  return {
    type: 'GET_BOOK',
    payload: request,
  };
}

export function updateBook(data) {
  const request = axios
    .post(`${url}/api/book_update`, data)
    .then(response => response.data);

  return {
    type: 'UPDATE_BOOK',
    payload: request,
  };
}

export function deleteBook(id) {
  const request = axios
    .delete(`${url}/api/delete_book?id=${id}`)
    .then(response => response.data);

  return {
    type: 'DELETE_BOOK',
    payload: request,
  };
}

export function clearBook() {
  return {
    type: 'CLEAR_BOOK',
    payload: {
      book: null,
      updateBook: false,
      postDeleted: false,
    },
  };
}

/*========= USER ===========*/

export function loginUser({ email, password }) {
  const request = axios(url, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'same-origin',
  }).then(response => response.data);

  // const request = axios
  //   .post(`${url}/api/login`, { email, password })
  //   .then(response => response.data);

  return {
    type: 'USER_LOGIN',
    payload: request,
  };
}

export function auth() {
  const request = axios.get(`${url}/api/auth`).then(response => response.data);

  return {
    type: 'USER_AUTH',
    payload: request,
  };
}

export function getUsers() {
  const request = axios.get(`${url}/api/users`).then(response => response.data);

  return {
    type: 'GET_USER',
    payload: request,
  };
}

export function userRegister(user, userList) {
  const request = axios.post(`${url}/api/register`, user);

  return dispatch => {
    request.then(({ data }) => {
      let users = data.success ? [...userList, data.user] : userList;
      let response = {
        success: data.success,
        users,
      };

      dispatch({
        type: 'USER_REGISTER',
        payload: response,
      });
    });
  };
}
