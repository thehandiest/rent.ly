selenium = require 'selenium-webdriver'
chai = require 'chai'
chai.use require 'chai-as-promised'
expect = chai.expect

before ->
  @timeout 10000
  @driver = new selenium.Builder()
    .withCapabilities(selenium.Capabilities.chrome())
    .build()
  @driver.getWindowHandle()

after ->
  @driver.quit()

describe 'Rent.ly Front end', ->
  beforeEach ->
    @driver.get 'http://localhost:8090/'

  it 'has the title of the app in the window\'s title', ->
    @driver.getTitle().then (title) ->
      expect(title).to.contain 'Rent.ly'

  it 'has a form to search addresses', ->
    @driver.findElement(css: '#searchAddress').then (form) ->
      expect(form).to.be.a('object')

  it 'has a form to register a user', ->
    @driver.findElement(css: '#registerUser').then (form) ->
      expect(form).to.be.a('object')

  it 'has a map to represent found addresses', ->
    @driver.findElement(css: '#map').then (map) ->
      expect(map).to.be.a('object')
