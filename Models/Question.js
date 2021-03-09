let knex = require("../database/connection");

class Question{
    async index(){
        try {
            let select = await knex("Questions").select("*");
            return {status:true,questions:select}
        }
        catch (e){
            return {status:false}
        }
    }
    async selectByID(ID){
        try {
            let select = await knex("Questions").select("*").where({ID:ID});
            return {status:true,question:select}
        }
        catch (e){
            return {status:false}
        }
    }
    async MaxID(){
        try{
            let Max = await knex("Questions").count("ID",{as:"max"});

            return {Max:Max[0].max,status:true}
        }
        catch (e){
            console.log(e);
            return {status:false,Message:'Erro interno do sistema'}
        }
    }
    async insertNewQuestion(Question,RightQuestion){
        try{
            let question = await knex("Questions").insert({ID:null,QUESTION:Question,ID_RIGHT_ANSWER:RightQuestion});
            return {status:true,ID_Question:question};
        }
        catch (e){
            return {status:false}
        }
    }
    async deleteByID(ID_question){
        try {
            await knex("Questions").where({ID:ID_question}).del();
            return {status:true}
        }
        catch (e){
            return {status:false}
        }
    }
    async RightAnswerByID(ID_question){
        try {
            let rightAnswer = await knex("Questions").select("ID_RIGHT_ANSWER").where({ID:ID_question});
            return {rightAnswer:rightAnswer[0].ID_RIGHT_ANSWER,status:true};
        }
        catch (e){
            return {status:false};
        }
    }
}

module.exports = new Question();
