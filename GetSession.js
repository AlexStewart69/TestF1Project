export default async function getSession() {
  const response = await fetch("https://openf1.org/?javascript#sessions");
  const data = await response.json();
  return data;
}
