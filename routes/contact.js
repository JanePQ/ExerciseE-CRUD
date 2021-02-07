let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the db schema
let contactModel = require('../models/contact');

/* GET Contact List page - READ Operation */
router.get('/', (req, res, next) =>{
    contact.find((err, contactList) => {
       
        if (err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('contacts/index', {
                title: 'Contact List',
                contactList: contactList
            });
            
        }
    });
});

/**GET Route for the Add page (this will display the add page)*/
router.get('/add', (req, res, next) => {
    res.render('contacts/add', {
        title: "Add a New Contact"
    });
});

// POST - process the Add page for the Contact-List
router.post('/add', (req, res, next) => {
    
    let newContact = contactModel({
        "firstName":req.body.FirstNameTextField,
        "lastName":req.body.LastNameTextField,
        "age":req.body.AgeTextField
    });

    contactModel.create(newContact, (err, contact) => {
        if(err) {
            console.log(err);
            res.end(err);
        } 
        else {
            // takes the user back to the contact-list page
            res.redirect('/contact-list');
        }
    });
});

/* GET the Edit Page */
router.get('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    contactModel.findById(id, (err, contactObject) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // show the edit view
            res.render('contacts/edit', {
                title: "Edit Contact",
                contact: contactObject
            });
        }
    });

});

/* POST - process the information from Edit page */
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updatedContact = contactModel({
        "_id": id,
        "firstName": req.body.FirstNameTextField,
        "lastName": req.body.LastNameTextField,
        "age":req.body.AgeTextField
    });

    contactModel.update({_id: id}, updatedContact, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact-list
            res.redirect('/contact-list');
        }
    })
});

/* GET the and process the delete page */
router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;

    contactModel.remove({_id: id}, (err) => {
        if(err) {
            console.log(err);
            res.end(err);
        }
        else {
            // refresh the contact list
            res.redirect('/contact-list');
        }
    });
});


module.exports = router;