describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'user2',
      username: 'user2',
      password: '123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
    cy.visit('')
  })

  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })
  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')
  })
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()
    cy.contains('Wrong credentials')
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.login('mluukkai', 'salainen')
    })
    it('a new blog can be created', function() {
      cy.contains('new Blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Cypress Hill')
      cy.get('#url').type('www.leningradspb.ru')
      cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })
    it('a blog can be liked', function() {
      cy.createBlog({
        'title': 'created by cypress createBlog',
        'author': 'Cypress',
        'url': 'www',
        'likes': 0
      })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('.blog').should('contain', 'likes: 1')
    })
    it('a new own blog can be deleted', function() {
      cy.createBlog({
        'title': 'created by cypress createBlog',
        'author': 'Cypress',
        'url': 'www',
        'likes': 0
      })
      cy.get('.blog')
        .contains('view')
        .click()
      cy.get('.blog')
        .contains('delete')
        .click()
      cy.get('html').should('not.contain', 'created by cypress')
    })


    it('someone elses blog can not be deleted', function() {
      cy.createBlog({
        'title': 'created by cypress createBlog',
        'author': 'Cypress',
        'url': 'www',
        'likes': 0
      })
      cy.get('.blog')
        .contains('view')
        .click()
      cy.get('.blog').contains('delete')
      cy.login('user2', '123')
      cy.get('.blog')
        .contains('view')
        .click()
      cy.get('.blog').should('not.contain', 'delete')
    })
    it('sort by likes button works', function() {
      cy.createBlog({
        'title': 'Title with second most likes',
        'author': 'aa',
        'url': 'aa',
        'likes': 10
      })
      cy.createBlog({
        'title': 'Title with most likes',
        'author': 'bb',
        'url': 'bb',
        'likes': 20
      })
      cy.get('.blog').eq(0).should('contain', 'Title with second most likes')
      cy.get('.blog').eq(1).should('contain', 'Title with most likes')
      cy.contains('SORT BY LIKES')
        .click()
      cy.get('.blog').eq(0).should('contain', 'Title with most likes')
      cy.get('.blog').eq(1).should('contain', 'Title with second most likes')
    })
  })
})