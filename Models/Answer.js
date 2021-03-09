let knex = require("../database/connection");

class Answer{
    async insertAnswer(ID_Question,Answer){
        try{
            await knex("Answers").insert({ID:null,ID_QUESTION:ID_Question,ANSWER:Answer});
        }
        catch (e){
        }
    }
    async deleteByQuestionID(ID_question){
        try {
            await knex("Answers").where({ID_QUESTION:ID_question}).del();
            return {status:true}
        }
        catch (e){
            return {status:false}
        }
    }
    async selectByQuestionID(ID_question){
        try {
            let select = await knex("Answers").select("*").where({ID_QUESTION:ID_question});
            return {status:true,Answers:select}
        }
        catch (e){
            return {status:false}
        }
    }
}

module.exports = new Answer();
