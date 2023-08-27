// Generates password of length between 6 and 15 of random characters
export const passwordGenerator = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const password = [];

  const length = 6 + Math.floor(Math.random() * 10);

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password.push(characters[randomIndex]);
  }

  return password.join("");
};

// Generates file name of length between 6 characters along with current date to ensure random name for each file
export const fileNameGenerator = (prefix = "") => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const key = [];
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    key.push(characters[randomIndex]);
  }

  const currentDate = new Date().toISOString();
  const formattedDate = currentDate.replace(/[-:.TZ]/g, "");

  const paddedPrefix = prefix.padEnd(6, "_");

  return paddedPrefix.substring(0, 6) + "_" + key.join("") + formattedDate;
};
