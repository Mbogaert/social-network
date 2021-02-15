const { User, Thought } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .select("-__v")
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // get one thought by id
    getThoughtById({ params }, res ) {
        Thought.findOne({
            _id: params.id,
        })
        .select("-__v")
        .then((dbThoughtData) => {
            if (!dbThoughtData) {
              return res.status(404).json({
                message: "no thought with that id!",
              });
            }
            res.status(200).json(dbThoughtData);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    // create thought
    createThought({ body }, res) {
        // console.log(body);
        Thought.create(body)
          .then((dbThoughtData) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: dbThoughtData._id } },
              { new: true }
            )
            .populate(
                { path: "thoughts", select: "-__v", })
        
          .then((dbUserData) => {
            if (!dbUserData) {
              res.status(404).json({ message: "No user found with this id!" });
              return;
            }
            res.status(200).res.json(dbUserData);
          })
          .catch((err) => res.json(err));
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },
    // update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id}, body, {new: true, runValidators: true })
            .then(dbThoughtData => {
                if(!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(deletedThought => {
            if (!deletedThought) {
                return res.status(404).json({ message: 'No thought with this id!'})
            }
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { thoughts: params.id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(200).json({ message: 'Deleted thought'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // add Reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $push: { reactions: body } },
            { new: true }
        )
        .then((dbThoughtData) => {
            console.log(dbThoughtData)
            if (!dbThoughtData) {
                res.status(404).json({ message: "No thought found with this id!"});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch((err) => res.json(err));
    },
    // remove reaction by id
    removeReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.id },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
        .then((dbThoughtData) => {
            if(!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbThoughtData);
         })
        .catch((err) => res.json(err));
    }
}

module.exports = thoughtController;