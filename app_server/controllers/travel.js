/* GET travel list page */
const list = (req, res) => {
  res.render('travel', { title: 'Travlr Getaways - Travel' });
};

module.exports = {
  list
};
