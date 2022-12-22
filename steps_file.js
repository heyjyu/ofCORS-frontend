/* global actor */

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  writeQuestions() {
    this.amOnPage(`${backdoorBaseUrl}/write-questions`);
  },

  submit() {
    this.click('[type=submit]');
  },
});
