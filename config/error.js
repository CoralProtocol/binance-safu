module.exports = function AppError(message, name, status) {
  // Capturing stack trace, excluding constructor call from it.
  Error.captureStackTrace(this, this.constructor)

  // Saving class name in the property of our custom error as a shortcut.
  this.name = name || this.constructor.name

  this.message = message
  this.status = status || 400
};
