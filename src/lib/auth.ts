// Lưu user vào localStorage
"use client";
export const setAuth = (user ) => {
    localStorage.setItem('user', JSON.stringify(user))
    //localStorage.setItem('tokens', JSON.stringify(tokens))
  }
  
  export const unsetAuth = () => {
    localStorage.removeItem('user')
    // localStorage.removeItem('tokens')
  }

// Lấy user từ localStorage
export const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

