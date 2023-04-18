var shoes = require('../models/shoes');
// List of all Shoes
// List of all shoes
exports.shoes_list = async function(req, res) {
    try{
    theshoes = await shoes.find();
    res.send(theshoes);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific Shoes.

exports.shoes_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: Shoes detail: ' + req.params.id);
};



// Handle Shoes create on POST.
// Handle shoes create on POST.
exports.shoes_create_post = async function(req, res) {
    console.log(req.body)
    let document = new shoes();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"shoes_type":"goat", "cost":12, "size":"large"}
    document.shoes_type = req.body.shoes_type;
    document.shoes_name= req.body.shoes_name;
    document.shoes_cost = req.body.shoes_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// Handle Shoes delete form on DELETE.
/*exports.shoes_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: Shoes delete DELETE ' + req.params.id);
};
// Handle Shoes update form on PUT.
exports.shoes_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: Shoes update PUT' + req.params.id);
};
*/
exports.shoes_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await shoes.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
    };
    
// VIEWS
// Handle a show all view
exports.shoes_view_all_Page = async function(req, res) {
    try{
    theshoes = await shoes.find();
    res.render('shoes', { title: 'shoes Search Results', results: theshoes });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };

   exports.shoes_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await shoes.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
   };
   
   exports.shoes_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
   ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await shoes.findById( req.params.id)
    // Do updates of properties
    if(req.body.shoes_type)
    toUpdate.shoes_type = req.body.shoes_type;
    if(req.body.shoes_name) toUpdate.shoes_name = req.body.shoes_name;
    if(req.body.shoes_cost) toUpdate.shoes_cost = req.body.shoes_cost;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
   failed`);
    }
   };

   exports.shoes_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await shoes.findById( req.query.id)
    res.render('shoesdetail',
    { title: 'shoes Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };

    // Handle building the view for creating a shoes.
    // No body, no in path parameter, no query.
    // Does not need to be async
    exports.shoes_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('shoescreate', { title: 'shoes Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };