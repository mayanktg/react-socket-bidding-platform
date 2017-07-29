var Bid = require('../models/Bid');
var BidTransaction = require('../models/BidTransaction');
var bodyparser = require('body-parser');
var moment = require('moment');

module.exports = function(router) {
  router.use(bodyparser.json());

  // query DB for active bids
  router.get('/bid/activebids', function(req, res) {
    Bid.find({ is_active: true }, {}, function(err, data) {
      if (err) {
        return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
      }
      res.json({ bids: data });
    });
  });

  // query DB for disabled bids
  router.get('/bid/inactivebids', function(req, res) {
    Bid.find({ is_active: { '$ne' : true } }, {}, function(err, data) {
      if (err) {
        return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
      }
      res.json({ bids: data });
    });
  });

  // query DB for given bid id
  router.get('/bid/find/:bid_id', function(req, res) {
    const bidId = req.params.bid_id;
    if (!bidId) {
      return res.status(500).json( { isError: true, msg: 'Missing Params bid_id' });
    }

    Bid.findOne({ _id: bidId }, {}, function(err, data) {
      if (err) {
        return res.status(500).json({ isError: true, msg: 'internal server error', stack: err });
      }

      let newData = data.toObject();

      BidTransaction.find({ bid_id: bidId }, function (err, transactions) {
        if (err) {
          return res.status(500).json({ isError: true, msg: 'internal server error', stack: err });
        }

        newData.transactions = transactions;
        res.json({ bid: newData });
      });      
    });
  });

  router.post('/bid/create', function(req, res) {
    const bid = req.body;
    if (!bid) {
      return res.status(500).json( { isError: true, msg: 'Missing body object bid'});
    }

   if (bid.start_date) bid.start_date = new Date(bid.start_date);
   if (bid.end_date) bid.end_date = new Date(bid.end_date); 
    bid.created_at = new Date();
    const newBid = new Bid(bid);
    newBid.save(function (err, data) {
      if (err) {
        return res.status(500).json({msg: 'internal server error'});
      }

      res.json({ success: true });
    });
  });

  // query DB to update bid
  router.put('/bid/update/:bid_id', function(req, res) {
    const bid = req.body;
    const bidId = req.params.bid_id;
    if (!bid) {
      return res.status(500).json( { isError: true, msg: 'Missing body object bid' });
    }

    if (!bidId) {
      return res.status(500).json( { isError: true, msg: 'Missing params bid_id' });
    }

    Bid.update({ _id: bidId }, { '$set': bid }, function(err, data) {
      if (err) {
        return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
      }
      res.json({ success: true });
    });
  });

  // query DB to update bid
  router.put('/bid/invite/:bid_id/:user_id', function(req, res) {
    const bidId = req.params.bid_id;
    const userId = req.params.user_id;

    if (!bidId) {
      return res.status(500).json( { isError: true, msg: 'Missing params bid_id' });
    }

    if (!userId) {
      return res.status(500).json( { isError: true, msg: 'Missing params userId' });
    }

    Bid.update({ _id: bidId }, { $push: { invited_bidders: userId }}, function(err, data) {
      if (err) {
        return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
      }

      let transactionObj = {
        bid_id: bidId,
        user_id: userId,
        status: 'invited',
        created_at: new Date()
      }
      let transaction = new BidTransaction(transactionObj);
      transaction.save(function (err, data) {
        if (err) {
          return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
        }

        res.json({ success: true });
      });
    });
  });

  // query DB to update bid
  router.put('/bid/submitbid/:bid_id/:user_id/:bid_amount', function(req, res) {
    const bidId = req.params.bid_id;
    const userId = req.params.user_id;
    let bidAmount = req.params.bid_amount ? Number(req.params.bid_amount) : 0;

    if (!bidId) {
      return res.status(500).json( { isError: true, msg: 'Missing params bid_id' });
    }

    if (!userId) {
      return res.status(500).json( { isError: true, msg: 'Missing params userId' });
    }

    bidAmount = Number(bidAmount) > 0 ? Number(bidAmount) : 0;
    if (!bidAmount) {
      return res.status(500).json( { isError: true, msg: 'Missing params bid_amount' });
    }

    Bid.findOne({ _id: bidId}, function (err, data) {
      if (err) {
        return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
      }

      if (moment().isAfter(data.end_date) || moment().isBefore(data.start_date)) {
        return res.status(500).json({ isError: true, msg: 'Bidding not allowed', stack: err });
      }

      BidTransaction.update(
        { bid_id: bidId, user_id: userId },
        { '$set': { status: 'bided', bid_amount: bidAmount } },
        { multi: true },
        function(err, data) {
        if (err) {
          return res.status(500).json({isError: true, msg: 'internal server error', stack: err});
        }
        console.log(data);
        res.json({ success: true });
      });
    })

    

  });

}
