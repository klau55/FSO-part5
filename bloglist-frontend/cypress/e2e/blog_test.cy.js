describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
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
      cy.createBlog({
        'title': 'created by cypress createBlog',
        'author': 'Cypress',
        'url': 'www',
        'likes': 0
      })
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
    })
    it('an new own blog can be deleted', function() {

      cy.get('.blog')
        .contains('view')
        .click()
      cy.get('.blog')
        .contains('delete')
        .click()
      cy.get('html').should('not.contain', 'a blog created by cypress')
    })


    it('someone elses blog can not be deleted', function() {
      cy.get('.blog')
        .contains('view')
        .click()
      cy.get('.blog')
        .contains('delete')
        .click()

    })
  })
})