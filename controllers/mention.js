exports.getMentions = function(req, res) {
  // Use the Beer model to find all beer
//  Beer.find({ userId: req.user._id },function(err, beers) {
//    if (err)
//      res.send(err);
//
//    res.json(beers);
//  });
    var mentions=[{message:"mensaje1"},{message:"mensaje2"}];
    res.render('mention',{mentions:mentions});
};

