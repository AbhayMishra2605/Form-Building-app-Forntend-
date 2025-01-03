
const URL ="http://localhost:3000/api"




export const register = (data) => {
    return fetch(`${URL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}

export const login = (data) => {
    return fetch(`${URL}/user/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}



export const getUserDashboard=()=>{
    return fetch(`${URL}/user/user-dashboards`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
})
}


export const getUserDashboardById=(id)=>{
    return fetch(`${URL}/user/shared-dashboardById/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          
        },
})
}


export const editUserMethod = (data) => {
    return fetch(`${URL}/user/edituser`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
}



export const getFolderData = (id)=>{
    return fetch(`${URL}/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
            },
            })
            
}


export const createFolder = (id,data) => {
    return fetch(`${URL}/user/create/${id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
}


export const deleteFolder = (dashboardId,id) => {
    return fetch(`${URL}/user/delete/${dashboardId}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
},
})
}


export const inviteUserByEmail = (data) => {
    return fetch(`${URL}/user/invite-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    }


    export const validateInviteLink = (token) => {
        return fetch(`${URL}/user/validate-invite/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json', // No Authorization needed here
            },
        });
    };
    

export const inviteUsingLink = (data) => {
    return fetch(`${URL}/user/generate-invite-link`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    }




    //get form data
    export const getFormData = (dashboardId,id) => {
        return fetch(`${URL}/user/get/${dashboardId}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
        });
    }



   export const deleteForm = (dashboardId,id,fromId) => {
        return fetch(`${URL}/user/delete/${dashboardId}/${id}/${fromId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            });
            }



    export const createForm = (dashboardId,id,data) => {
        return fetch(`${URL}/user/create/${dashboardId}/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data),
        })
        }


export const getFormDataById = (dashboardId,id,formId) => {
    return fetch(`${URL}/user/getById/${dashboardId}/${id}/${formId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
    });
}
       

export const updateFormById = (dashboardId,id,formId,data) => {
    return fetch(`${URL}/user/update/${dashboardId}/${id}/${formId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data),
    })
    }

    export const shareFormByLink = (dashboardId,id,formId) => {
        return fetch(`${URL}/user/share/${dashboardId}/${id}/${formId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`
            },
        });
    }


    export const getFormDataByToken = (token) => {
        return fetch(`${URL}/user/shared-form-data/${token}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        }


    export const storeFormResponse=(id,data)=>{
        return fetch(`${URL}/user/submit-form/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
                },
                body: JSON.stringify(data),
                })
    }
    


    export const countFormViews=(id)=>{
        return fetch(`${URL}/user/form/view/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
            });
    }



export const formResponcesData=(id)=>{
    return fetch(`${URL}/user/form-details/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            }
            });
            
}