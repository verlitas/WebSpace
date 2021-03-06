const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/")
    .get(usersController.findAll)
    .post(usersController.create)

router
    .route("/:id")
    .get(usersController.findById)
    .put(usersController.update)
    .delete(usersController.remove)

router
    .get("/email/:email", usersController.findByEmail)

router
    .put("/user", usersController.update)

module.exports = router;
