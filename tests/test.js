
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

// Configure chai
chai.use(chaiHttp);
chai.should();
describe("records", () => {
    describe("GET /demo/v1/accounts/", () => {
        // Test to get all records record
        it("should get all records record", (done) => {
             chai.request(app)
                 .get("/demo/v1/accounts/")
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a("object");
                     done();
                  });
         });
        // Test to get single record record
        it("should get a single record record", (done) => {
             const id = 1;
             chai.request(app)
                 .get(`/demo/v1/accounts/${id}/record`)
                 .end((err, res) => {
                    console.log( res.body, res.status);
                     res.should.have.status(200);
                     res.body.should.be.a("array");
                     done();
                  });
         });
         
        // Test to get single record record
        it("should not get a single record record", (done) => {
             const id = 5;
             chai.request(app)
                 .get(`/demo/v1/accounts/${id}/record`)
                 .end((err, res) => {

                    console.log( res.body, res.status);
                     res.should.have.status(404);
                     done();
                  });
         });
    });
});