export const server_url = process.env.NODE_ENV === "production" ? "https://rooma.ca/" : "http://localhost:8080/";

export const server_api = `${server_url}api/`;
