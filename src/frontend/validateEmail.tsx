export default function validateEmail (email: string):boolean {
  const hasSymbol = /@/.test(email);

  if (!hasSymbol) {
    alert("Email must include @");
  }

  return hasSymbol;
}