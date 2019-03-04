const Order = require("../models/order");
const { sendingEmail } = require("../utilities");

// var hbs = require('nodemailer-express-handlebars');

//Simple version, without validation or sanitation
let order = {};

order.getAll = (req, res, next) => {
  Order.find().populate('orderBy')
    .then(data => {
      if (!data) {
        return res.status(422);
      }
      return res.json({ order: data });
    })
    .catch(next);
};
order.get = (req, res, next) => {
  let id = ''
  if(req.params.id){
     id=req.params.id;
  }
  Order.findById(id).populate('orderBy')
    .then(data => {
      if (!data) {
        return res.status(422);
      }
      return res.json({ order: data });
    })
    .catch(next);
};
order.userOrders = (req, res, next) => {
    Order.find({orderBy:req.params.user})
      .then(data => {
        if (!data) {
          return res.status(422);
        }
        return res.json({ order: data });
      })
      .catch(next);
  };
/* adding the order */
order.add = (req, res, next) => {
  if (req.body) {
    let order = new Order();
    order.amazon_order_id = req.body.amazon_order_id;
    order.phone = req.body.phone;
    order.order_details = req.body.order_details;
    order.orderBy = req.body.orderBy;

    order.save((err, data) => {
      if (err) {
        return res.json(err);
      }
      if (!data) {
        return res.status(422);
      }
      return res.json({ order: data });
    });
  }
};

order.update = (req, res, next) => {
  let update = {
      amount: req.body.amount,
      status: req.body.status,
      remark: req.body.remark,
      order_details: req.body.order_details
    },
    options = {
      upsert: false,
      new: false,
      overwrite: false
    };

  if (req.body.phone) {
    update.phone = req.body.phone;
  }

  Order.findByIdAndUpdate(req.params.id, update, options)
    .then(data => {
      return res.json({ order: data });
    })
    .catch(next);
};

order.sendEmail = (req, res, next) => {
 
  Order.findById(req.params.id).populate('orderBy')
    .then(data => {
      console.log('send email');
      let emaildata = {to : 'geeksem83@gmail.com'}; 
      emaildata.html = `<div class="">
      <div id=":mr" tabindex="-1"></div>
      <div id=":n2" class="ii gt">
      <h3>Dear Valued Client</h3>
      We have send the your order cashback to the your specifed paytm number!<br>
      <br>
      `+data.orderBy.email+`
      <br>
      If you still find issue related to your payment, Please contact us. <br>
      <br>     
      <br>
      Thanks for ordering from our website ! <br>
      <p>With Regards,</p>
      Team Buy2Cash
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
        
      <br>
      </div></div></div></div>`;

      sendingEmail(emaildata);

      return res.json({ order: data });
    })
    .catch(next);
};
order.deleteOrder = (req, res, next) => {
  Order.findByIdAndRemove(req.params.id)
    .then(data => {
      if (data === null) {
        return res
          .status(422)
          .json({ success: "NOK", message: "Order not found." });
      }
      return res.json({
        success: "OK",
        message: "Order is deleted successfully."
      });
    })
    .catch(next);
};

module.exports = order;
