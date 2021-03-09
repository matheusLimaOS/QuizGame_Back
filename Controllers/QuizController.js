let Question = require("../Models/Question");
let Answer = require("../Models/Answer");

class QuizController {
    async index(req, res) {
        try {
            let questions = await Question.index();

            if(!questions.status){
                res.status(500);
                res.json({message:"Erro interno do sistema"});
                return;
            }

            res.status(200);
            res.json({Questions:questions.questions});
        } catch (error) {
            console.log(error);
            res.status(500);
            res.json("ERRO INTERNO DO SISTEMA");
        }
    }
    async randomQuestion(req,res){
        let max = await Question.MaxID();
        let randomID = Math.floor(Math.random() * ((max.Max+1)-1) + 1);

        let question = await Question.selectByID(randomID);
        let answers = await Answer.selectByQuestionID(randomID);

        res.status(200);
        res.json({Question:question.question,Answers:answers});
    }
    async newQuestion(req,res){
        let {Question1,RightQuestion,Answers} = req.body;

        let result = await Question.insertNewQuestion(Question1,RightQuestion);

        if(!result.status){
            res.status(500);
            res.json({message:"Erro interno do sistema"});
            return;
        }

        for(let i=0;i<5;i++){
            if(Answers[i]!==undefined){
                await Answer.insertAnswer(result.ID_Question,Answers[i]);
            }
            else{
                await Question.deleteByID(result.ID_Question);
                await Answer.deleteByQuestionID(result.ID_Question);
                res.status(500);
                res.json({message:"Ausência de 1 alternativa"});
                return;
            }
        }

        res.status(200);
        res.json({message:"Pergunta criada com sucesso"});
    }
    async verifyAnswer(req,res){
        let {ID,SelectedAnswer} = req.body;

        let verify = await Question.RightAnswerByID(ID);

        if(!verify.status){
            res.status(500);
            res.json({message:"Erro interno do sistema"});
            return;
        }

        if(verify.rightAnswer !== (SelectedAnswer-((ID-1)*5))){
            res.status(200);
            res.json({Right:false,message:"Resposta Incorreta!"});
            return;
        }

        res.status(200);
        res.json({Right:true,message:"Resposta Correta!"});
    }

}

module.exports = new QuizController;
