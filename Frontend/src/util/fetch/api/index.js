import {
  get, post, destroy, put, apiUrl,
} from '..';

export const currentUser = () => get('currentUser');
export const loginUser = (type, d) => put(`login/${type}`, d);
export const signupCompany = (d) => post('signup/company', d);
export const signupEmployee = (d) => post('signup/employee', d);
export const updateCompany = (d) => put('company', d);
export const addJobPosting = (d) => post('jobPosting', d);
export const getJobPosting = (d) => get('jobPosting', d);
export const updateEmployee = (d) => put('employee', d);
export const searchCompany = (text) => get(`search/company?text=${text}`);
export const getCompany = (id) => get(`company/${id}`);
// export const deleteCompany = (id) => destroy(`company/${id}`);
export const logout = () => put('logout');
export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
