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
export const searchJobPosting = (text) => get(`search/jobPosting?text=${text}`);
export const getCompany = (id) => get(`company/profile/${id}`);
export const getJob = (id) => get(`job/${id}`);
export const applyJob = (id, d) => put(`jobApplication/${id}`, d);
export const withdrawJobApplication = (id) => destroy(`jobApplication/${id}`);
export const addResume = (id, d) => post(`resume/${id}`, d);
export const setPrimaryResume = (id) => put(`resume/primary/${id}`);
export const getCompanyJobApplications = () => get('company/jobApplications');
export const getEmployeeJobApplications = () => get('employee/jobApplications');
export const setJobApplicationStatus = (id, d) => put(`company/jobApplication/status/${id}`, d);
export const logout = () => put('logout');
export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
