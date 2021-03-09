let express = require("express")
let router = express.Router();
let QuizController = require("../Controllers/QuizController");

router.get("/",QuizController.index);
router.get("/randomQuestion",QuizController.randomQuestion);
router.post("/newQuestion",QuizController.newQuestion);
router.post("/verifyAnswer",QuizController.verifyAnswer);

module.exports=router;
