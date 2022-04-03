const { Thoughts, Users} = require('../models');
const thoughtsController ={
    addThoughts({params, body},res){
        console.log('creating thought!')
        console.log({_id: params.userId})
        Thoughts.create(body)
            .then(({_id}) => {
                return Users.findOneAndUpdate({_id: params.userID},{$push:{thoughts: id}}, {new:true});
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData){
                    res.status(404).json({message: 'No thoughts where found with this id'});
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => res.json(err));
    },
    getAllThoughts(req, res) {
        Thoughts.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        }) 
        .select('-__v')
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
            Thoughts.findOne({ _id: params.id })
                .populate({ 
                    path:'reactions',
                    select:'-__v'
                })
                .select('-__v')
                .then(dbThoughtsData =>{
                    if (!dbThoughtsData){
                        res.status(400).json({message:'No thoughts where found with this id'});
                        return;
                    }
                    res.json(dbThoughtsData)
                })
                .catch(err => {
                    console.log(err);
                    res.sendStatus(400);
                });
        },
        updateThoughts({params, body}, res){
            Thoughts.findOneAndUpdate(
                {_id: params.id},
                body,
                {new: true, runValidators: true}
            )
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData =>{
                if(!dbThoughtsData){
                    res.status(404).json({ message:'No thoughts where found with this id'});
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
        },
        deleteThoughts({params}, res){
            Thoughts.findOneAndDelete({_id: params.id})
            .then(dbThoughtsData => {
                if (!dbThoughtsData){
                    res.status(404).json({message:'No thoughts with this id number'})
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));
        },
        addReaction({params, body}, res){
            Thoughts.findOneAndUpdate({_id: params.thoughtId},{$push:{reaction:body}}, {new: true,runValidators:true})
                .populate({
                    path:'reactions',
                    select:'-__v'
                })
                .select('-__v')
                .then(dbThoughtsData => {
                    if(!dbThoughtsData){
                        res.status(404).json({message:'No thoughts where found with this id number'});
                        return;
                    }
                    res.json(dbThoughtsData);
                })
                .catch(err => res.status(400).json(err))      
        },

        deleteReaction({params},res){
            Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions:
            {reactionId: params.reactionId}}},{new : true })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                res.status(404).json({message:'No thoughts where found with this id number'});
                return;
            }
            res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err));

        }


    };
    module.exports = thoughtsController;
