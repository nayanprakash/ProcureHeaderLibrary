/*
 * @file: messages.js
 * @description: Handle staic messages for the application 
 * @date: 04.07.2018
 * @author: Jasdeep Singh
 * 
 */

const Message = {
  emptyField: 'Please Enter Value',
  success: 'Success',
  error: 'Error!',
  authError: 'You are unauthorized user!',
  commonError: 'Something went wrong!',
  logout: 'Logout!',
  added: type => `${type} has been added successfully.`,
  addedError: type => `Error! ${type} not added. Please try again!`,
  updated: type => `${type} has been updated successfully.`,
  updatedError: type => `Error! ${type} not updated. Please try again!`,
  delete: type => `${type} has been deleted successfully.`,
  deletedError: type => `Error! ${type} not deleted. Please try again!`,
  requiredField: field => `Please enter a ${field}.`,
  selectRequired: field => `Please select a ${field}.`,
  validPassword: 'Password should be more than 6 characters.',
  emailRequired: 'Please enter an email address.',
  validEmail: 'Please enter a valid email address.'
};

export default Message;
