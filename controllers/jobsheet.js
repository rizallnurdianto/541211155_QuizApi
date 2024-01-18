//Penggunaan model Quiz
const db = require('../models');
const Quiz = db.quizzes;

//Memproses jawaban dari satu quiz
exports.submitOne = async(req, res) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try{
        var quiz = await Quiz.findOne({
            where: {
                id: req.body.quizId
            }
        });

        if(req.body.answer == quiz.key) {
            res.status(200).json({
                'message': 'True'
            })
        } else {
            res.status(200).json({
                'message': `Jawaban benar adalah ${quiz.key}`
            })
        }
    } catch(error) {
        res.status(500).json({
            message: e.message
        });
    }
};

//Memproses jawaban lebih dari satu quiz dengan json array
exports.submitMany = async(req, res) => {
    const jobsheet = {
        quizId: req.body.quizId,
        answer: req.body.answer,
    };

    try {
        let benar = 0
        let totalSoal = jobsheet.quizId.length
        for (let i = 0; i < totalSoal; i++) {
            const quiz = await Quiz.findOne({
                limit: 1,
                where: {
                    id: jobsheet.quizId[i]
                },
                order: [['id', 'DESC']],
            });
            if(quiz.key == jobsheet.answer[i]){
                benar = benar + 1
            }
        }

        res.status(200).json({
            message: `benar ${benar} dari ${totalSoal} soal`
        })
    } catch (error) {
        res.status(500).json({
            message: e.message
        });
    }
};

