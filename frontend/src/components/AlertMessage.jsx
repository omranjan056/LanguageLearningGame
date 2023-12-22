import React from 'react';

const AlertMessage = ({ type, message }) => {
  let alertClass = '';

  switch (type) {
    case 'primary':
      alertClass = 'alert-primary';
      break;
    case 'secondary':
      alertClass = 'alert-secondary';
      break;
    case 'success':
      alertClass = 'alert-success';
      break;
    case 'warning':
      alertClass = 'alert-warning';
      break;
    case 'error':
      alertClass = 'alert-danger';
      break;
    default:
      alertClass = 'alert-info';
  }

  return (
    <div className={`alert ${alertClass} alert-dismissible fade show`} role="alert">
      {message}
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default AlertMessage;
