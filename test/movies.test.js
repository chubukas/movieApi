const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../src/app");
const Movie = require("../src/movies/moviesModel");
const getMovie = require("../src/utils/getMovie");

const request = supertest(app);

let token;

beforeAll((done) => {
  request
    .post("/auth")
    .send({
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/moviesearchtest",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => done()
  );
});

afterEach((done) => {
  mongoose.connection.db.dropDatabase(() => {
    mongoose.connection.close(() => done());
  });
});

// testing data

describe("Testing Endpoints", () => {
  it("POST /auth", async () => {
    const body = {
      username: "basic-thomas",
      password: "sR-_pcoow-27-6PAwCD8",
    };
    const response = await request.post("/auth").send(body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("POST /movies", async () => {
    const body = {
      title: "Intricate",
    };
    const response = await request
      .post("/movies")
      .set("Authorization", `Bearer ${token}`)
      .send(body);
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("GET /movies", async () => {
    const post = await Movie.create({
      userId: 1,
      Title: "Good films",
      Released: "12/2/2012",
      Genre: "Action",
      Director: "Ben Hosfiled",
    });
    await request
      .get("/movies")
      .expect(200)
      .then((response) => {
        // Check the response type and length
        expect(Array.isArray(response.body.data)).toBeTruthy();
        expect(response.body.data.length).toEqual(1);

        // // Check the response data
        expect(response.body.data[0].userId).toBe(post.userId);
        expect(response.body.data[0].Title).toBe(post.Title);
        expect(response.body.data[0].Genre).toBe(post.Genre);
      });
  });
});

describe("Testing Functions", () => {
  it("Should return movies data", async () => {
    const response = await getMovie("Intricate");
    expect(response).toBeTruthy();
  });
});
