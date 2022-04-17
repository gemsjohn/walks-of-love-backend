const router = require("express").Router();
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
const { Job, Pets, Owner } = require("../models");

// this just calls all jobs on page load and stores it in the jobs variable to use in handlebars
router.get("/", (req, res) => {
  Job.findAll({
    // order: [['timeframe', 'DESC']],
    include: [
      {
        model: Pets,
        attributes: ["pet_name", "pet_type", "description", "owner_id"],
      },
      {
        model: Owner,
        attributes: ["first_name", "last_name"],
      },
    ],
  }).then((dbJobData) => {
    const jobs = dbJobData.map((job) => job.get({ plain: true }));
    res.render("jobsearch", {
      jobs,
    });
  });
});

module.exports = router;
