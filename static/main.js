document.body.className = document.body.className
  ? document.body.className + " js-enabled"
  : "js-enabled";

window.GOVUKFrontend.initAll();

window.onload = () => {
  const hideButton = document.getElementById("hideButton");
  const cookieBanner = document.getElementById("cookie-banner");

  cookieBanner.style.display = "none";

  const isCookieSet = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("hideButton="));

  if (!isCookieSet) cookieBanner.style.display = "block";

  hideButton.addEventListener("click", () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);

    document.cookie =
      "hideButton=hidden; expires=" + date.toUTCString() + "; path=/";

    cookieBanner.style.display = "none";
  });
};
