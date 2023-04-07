export default function validatePassword (password: string):boolean {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isLongEnough = password.length >= 8 && password.length <= 255;

  let error:string = "Password needs:\n";
  if (!hasUpperCase) {
    error += "- 1 upper case letter\n"
  }
  if (!hasLowerCase) {
    error += "- 1 lower case letter\n"
  }
  if (!hasNumber) {
    error += "- 1 number\n"
  }
  if (!hasSymbol) {
    error += "- 1 symbol\n"
  }
  if (!isLongEnough) {
    error += "- within 8-255 characters"
  }

  if (!(hasUpperCase && hasLowerCase && hasNumber && hasSymbol && isLongEnough)) {
    alert(error);
  }

  return hasUpperCase && hasLowerCase && hasNumber && hasSymbol && isLongEnough;
}