const router = require("express").Router()
const Workout = require("../models/Workouts.js")
// create workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbCreateEx => {
            res.json(dbCreateEx)
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }])
        .then(dbGet => {
            res.json(dbGet)
        }).catch(err => {
            res.status(400).json(err);
        });
})

//Find exercise by id
router.get("/api/exercise/:id", ({ params }, res) => {
    Workout.find(params.id)
        .then(dbGetEx => {
            res.json(dbGetEx)

        }).catch(err => {
            res.status(400).json(err)
        })
});

//update workout
router.put("/api/workouts/:id", ({ params, body }, res) => {
    //no idea what to do here
    Workout.findByIdAndUpdate(params.id, {
        $push: {
            exercises: body
        }
    })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});





router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration"
                }
            }
        }]).sort({ day: -1 }).limit(7).sort({ day: 1 })


        .then((dbFindEx) => {
            res.json(dbFindEx)
        }).catch((err => {
            res.status(400).json(err)
        }))

})
module.exports = router;

