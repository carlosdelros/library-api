process.env.ENVIRONMENT = 'test'

const routePrefix = `/api/v1`

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src/index')
const knex = require('../src/database/connection')

describe(`Checkout Routes:`, () => {
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => knex.migrate.latest())
        .then(() => knex.seed.run())
    })

    afterEach(() => {
        return knex.migrate.rollback()
    })

    describe(`GET ${routePrefix}/checkout`, () => {
        it('Should greet the user if they are a Customer user (passing is_customer body parameter)', (done) => {
            chai.request(server)
            .get(`${routePrefix}/checkout`)
            .set('is_customer', 'true')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                
                // there should be a 200 status code
                res.status.should.equal(200)
                
                // content-type should be json
                res.type.should.equal('application/json')
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')
                
                // the json response body should have a
                // key-value pair of { "message": "Welcome Admin"
                res.body.message.should.equal('Welcome Customer')
                done()
            })
        })
    })

    describe(`POST ${routePrefix}/checkout`, () => {
        it('Should checkout a book', (done) => {
            chai.request(server)
            .post(`${routePrefix}/checkout`)
            .set('is_customer', 'true')
            .send({
                isbn: "9780984782871",
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                
                // there should be a 200 status code
                res.status.should.equal(200)
                
                // content-type should be json
                res.type.should.equal('application/json')
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')
                
                // the json response body should have a
                // key-value pair of { "checkout": {} } containing the information
                // of the checked out book
                res.body.checkout.should.have.all.keys('checkout_date', 'due_date', 'title');
                done()
            })
        })
    })

    describe(`POST ${routePrefix}/checkout/return`, () => {
        it('Should return a book', (done) => {
            chai.request(server)
            .post(`${routePrefix}/checkout/return`)
            .set('is_customer', 'true')
            .send({
                isbn: "9780984782871",
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                
                // there should be a 200 status code
                res.status.should.equal(200)
                
                // content-type should be json
                res.type.should.equal('application/json')
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')

                done()
            })
        })
    })

    describe(`GET ${routePrefix}/checkout/checkouts`, () => {
        it('Should return a list of checkout book from a user', (done) => {
            chai.request(server)
            .get(`${routePrefix}/checkout/checkouts`)
            .set('is_customer', 'true')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
               
                // there should be a 200 status code
                res.status.should.equal(200)
                
                // content-type should be json
                res.type.should.equal('application/json')
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')
                
                // the json response should contain an
                // key-value pair container an array of checked out books { "checkedoutBooks": []}
                res.body.checkedoutBooks.should.have.length(2)

                done()
            })
        })
    })
})