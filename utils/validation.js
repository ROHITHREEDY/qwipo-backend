const validateCustomerInput = (data, isUpdate = false) => {
  const errors = [];
  
  if (!isUpdate || data.firstName !== undefined) {
    if (!data.firstName || data.firstName.trim() === '') errors.push('First name is required');
  }
  
  if (!isUpdate || data.lastName !== undefined) {
    if (!data.lastName || data.lastName.trim() === '') errors.push('Last name is required');
  }
  
  if (!isUpdate || data.phoneNumber !== undefined) {
    if (!data.phoneNumber || data.phoneNumber.trim() === '') errors.push('Phone number is required');
  }
  
  return errors;
};

module.exports = {
  validateCustomerInput,
};
