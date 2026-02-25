import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";

const API_URL = "http://localhost:3001";

describe("Todo API Core Flows", () => {
  const testUser = {
    firstName: "Alice",
    lastName: "Test",
    username: `testuser_${Date.now()}`,
    password: "password123",
  };

  let authToken = "";
  let listId = "";

  it("should register a new user successfully", async () => {
    const res = await request(API_URL)
      .post("/users")
      .send(testUser)
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token;
  });

  it("should allow login with the registered user", async () => {
    // Basic auth for login
    const basicAuth =
      "Basic " +
      Buffer.from(testUser.username + ":" + testUser.password).toString(
        "base64",
      );

    const res = await request(API_URL)
      .post("/users/login")
      .set("Authorization", basicAuth)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.token).toBeDefined();
    authToken = res.body.token; // Update token just in case
  });

  it("should allow the authenticated user to create a list", async () => {
    const res = await request(API_URL)
      .post("/lists")
      .set("Authorization", `Bearer ${authToken}`)
      .send({ name: "My Core Test List" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.listId).toBeDefined();

    listId = res.body.listId;
  });

  it("should deny a request to access the list without authentication", async () => {
    const res = await request(API_URL).get(`/lists/${listId}`).send();

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.code).toBe("auth-required");
  });

  it("should allow the owner to access the list", async () => {
    const res = await request(API_URL)
      .get(`/lists/${listId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send();

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.list.name).toBe("My Core Test List");
  });

  it("should enforce rate limiting on the login endpoint", async () => {
    // We send more requests than the limit (5 per 5 minutes)
    const basicAuth =
      "Basic " +
      Buffer.from(testUser.username + ":wrongpassword").toString("base64");

    let lastStatus = 200;
    for (let i = 0; i < 6; i++) {
      const res = await request(API_URL)
        .post("/users/login")
        .set("Authorization", basicAuth)
        .send();
      lastStatus = res.status;
    }

    expect(lastStatus).toBe(429); // 429 Too Many Requests
  });
});
