import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "/todoapi/";
} else {
  baseurl = "/todoapi/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true,
  },
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        
        if (!config.headers.Authorization?.startsWith('Basic')) {
           config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        const responseData = error.response.data;
        if (responseData && (responseData.code === 'expired-session' || responseData.code === 'invalid-auth') ) {
            localStorage.removeItem("token");
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
    }
    return Promise.reject(error);
});


export default {
  getLists() {
    return apiClient.get("lists");
  },
  getList(id) {
    return apiClient.get("lists/" + id);
  },
  addList(list) {
    return apiClient.post("lists", list);
  },
  updateList(listId, list) {
    return apiClient.put("lists/" + listId, list);
  },
  deleteList(listId) {
    return apiClient.delete("lists/" + listId);
  },
  getListItems(listId) {
    return apiClient.get("lists/" + listId + "/items");
  },
  addListItem(listId, item) {
    return apiClient.post("lists/" + listId + "/items", item);
  },
  updateListItem(listId, itemId, item) {
    return apiClient.put("lists/" + listId + "/items/" + itemId, item);
  },
  deleteListItem(listId, itemId) {
    return apiClient.delete("lists/" + listId + "/items/" + itemId);
  },
  getUser() {
    return apiClient.get("users");
  },
  addUser(user) {
    return apiClient.post("users", user);
  },
  loginUser(user) {
    const basicAuth = "Basic " + btoa(user.username + ":" + user.password);
    return apiClient.post("users/login", null, {
         headers: {
             Authorization: basicAuth
         }
    });
  },
  logoutUser() {
    return apiClient.post("users/logout");
  },
};