process.env.ENVIRONMENT = 'test'

const routePrefix = `/api/v1`

const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
chai.use(chaiHttp)

const server = require('../src/index')
const knex = require('../src/database/connection')

describe(`Admin Routes:`, () => {
    beforeEach(() => {
        return knex.migrate.rollback()
        .then(() => knex.migrate.latest())
        .then(() => knex.seed.run())
    })

    afterEach(() => {
        return knex.migrate.rollback()
    })

    describe(`GET ${routePrefix}/admin`, () => {
        it('Should greet the user if they are an Admin user (passing is_admin body parameter)', (done) => {
            chai.request(server)
            .get(`${routePrefix}/admin`)
            .set('is_admin', 'true')
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
                res.body.message.should.equal('Welcome Admin')
                done()
            })
        })
    })

    describe(`POST ${routePrefix}/admin/books`, () => {
        it('Should add a new book', (done) => {
            chai.request(server)
            .post(`${routePrefix}/admin/books`)
            .set('is_admin', 'true')
            .send({
                isbn: "9780141033570",
                inventory: 10
            })
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                // there should be a 200 status code
                res.status.should.equal(201)
                // content-type should be json
                res.type.should.equal('application/json')
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')

                done()
            })
        })
    })

    describe(`DELETE ${routePrefix}/admin/books/:isbn`, () => {
    it('Should delete a book', async () => {

            let booksCount = await knex('books').select('*')
            booksCount = booksCount.length
            
            chai.request(server)
            .delete(`${routePrefix}/admin/books/9780984782871`)
            .set('is_admin', 'true')
            .end(async (err, res) => {
                // there should be no errors
                should.not.exist(err)
                
                // there should be a 200 status code
                res.status.should.equal(200)
                
                // content-type should be json
                res.type.should.equal('application/json')
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')
                
                // the book count in the db should be n-1
                // await knex('books').where('isbn', '9780141033570').del()
                let newBooksCount = await knex('books').select('*')
                newBooksCount = newBooksCount.length
                newBooksCount.should.equal(booksCount - 1)
            })
        })
    })

    describe(`GET ${routePrefix}/admin/books/overdue`, () => {
        it('Should rerturn a list of overdues book', (done) => {
            chai.request(server)
            .get(`${routePrefix}/admin/books/overdue`)
            .set('is_admin', 'true')
            .end((err, res) => {
                // there should be no errors
                should.not.exist(err)
                
                // there should be a 200 status code
                
                res.status.should.equal(200)
                res.type.should.equal('application/json')
                // content-type should be json
                
                // the json response body should have a
                // key-value pair of { "status": "success"}
                res.body.status.should.eql('success')

                // the json response should contain an
                // key-value pair container an array of overdue { "overdue": []}
                res.body.overdue.should.have.length(2)
                
                done()
            })
        })
    })
})