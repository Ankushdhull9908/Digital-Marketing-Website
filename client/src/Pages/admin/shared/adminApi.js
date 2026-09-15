export const API =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : "https://digital-marketing-temp.onrender.com/api";

export const get = (url) => fetch(API + url).then((r) => r.json());

export const post = (url, body) =>
  fetch(API + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const put = (url, body) =>
  fetch(API + url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const del = (url) =>
  fetch(API + url, { method: "DELETE" }).then((r) => r.json());

export const patch = (url, body) =>
  fetch(API + url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((r) => r.json());