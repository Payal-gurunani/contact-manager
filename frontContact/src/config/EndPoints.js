const API_BASE_URI = import.meta.env.VITE_API_BACKEND_URL;
console.log(API_BASE_URI);

export const Methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
}
export const Endpoints = {
    LOGIN :{
        url : `${API_BASE_URI}/api/v1/users/login`,
        method:Methods.POST
    },
    REGISTER:{
         url : `${API_BASE_URI}/api/v1/users/register`,
        method:Methods.POST
    },
    CREATECONTACT : {
         url : `${API_BASE_URI}/api/v1/contacts/create-contact`,
         method:Methods.POST
    },
    CONTACTS:{
        url:`${API_BASE_URI}/api/v1/contacts/get-contacts`,
        method:Methods.GET
    },
    UPDATECONTACTS : (userId)=>({
        url:`${API_BASE_URI}/api/v1/contacts/update-contact/${userId}`,
        method:Methods.PUT
    }),
    DELETECONTACT : (userId)=>({
        url:`${API_BASE_URI}/api/v1/contacts/delete-contact/${userId}`,
        method:Methods.DELETE
    })
}