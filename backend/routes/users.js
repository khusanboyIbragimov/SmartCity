var express = require('express');
var router = express.Router();
var db = require('../db/queries');
const { loginRequired } = require("../auth/helpers");

/****************************** GET Method *********************** */
router.get('/logoutUser', db.logoutUser);
router.get('/userInfo', loginRequired, db.userInfo);
router.get('/getallnews', db.getAllNews);
router.get('/getallannouncements', db.getAllAnnouncements);
router.get('/getUsersPosts', loginRequired, db.getUsersPosts);
router.get('/getUsersAnnouncement', loginRequired, db.getUsersAnnouncement);
router.get("/getMySurveys", loginRequired, db.getMySurveys);
router.get("/getUsersRentItems", loginRequired, db.getUsersRentItems);
router.get("/getUsersServices", loginRequired, db.getUsersServices);
router.get("/getUsersSaleItems", loginRequired, db.getUsersSaleItems);
router.get('/getallsurveys', db.getAllSurveys);
router.get('/get_all_rent_items', db.getAllRentItems);
router.get('/get_all_services', db.getAllServices);
router.get('/get_all_sale_items', db.getAllSaleItems);
router.get('/getUsersId', db.getUsersId);
router.get('/getwrongcounts', db.getWrongCounts);
router.get('/getrightcounts', db.getRightCounts);

/****************************** POST Method ********************** */
router.post('/register', db.getRegister);
router.post('/login', db.login);
router.post('/news', loginRequired, db.insertNews);
router.post('/rightnews', loginRequired, db.insertRightNews);
router.post('/wrongnews', loginRequired, db.insertWrongNews);
router.post('/surveyquestion', loginRequired, db.surveyQuestion);
router.post('/rating', loginRequired, db.rating);
router.post('/announcement', loginRequired, db.insertAnnouncement);
router.post('/insert_rent_item', loginRequired, db.insertRentItem);
router.post('/insert_service', loginRequired, db.insertService);
router.post('/insert_sale_item', loginRequired, db.insertSaleItem);

/****************************** PATCH Method ********************** */
router.patch('/updateprofile', loginRequired, db.updateProfile);
router.patch('/deletenews', loginRequired, db.deleteNews);
router.patch('/delete_wrong_news', loginRequired, db.deleteWrongNews);
router.patch('/delete_right_news', loginRequired, db.deleteRightNews);
router.patch('/deleteannouncement', loginRequired, db.deleteAnnouncement);
router.patch('/delete_my_survey', loginRequired, db.deleteMySurvey);
router.patch('/delete_feedback_4my_survey', loginRequired, db.deleteFeedback4MySurvey);
router.patch('/delete_rent_item', loginRequired, db.deleteRentItem);
router.patch('/delete_service', loginRequired, db.deleteService);
router.patch('/delete_sale_item', loginRequired, db.deleteSaleItem);
router.patch('/edit_my_survey', loginRequired, db.editMySurvey);
router.patch('/edit_rent_item', loginRequired, db.editRentItem);
router.patch('/edit_service', loginRequired, db.editService);
router.patch('/edit_sale_item', loginRequired, db.editSaleItem);
router.patch('/editnews', loginRequired, db.editNews);
router.patch('/editannouncement', loginRequired, db.editAnnouncement);



module.exports = router;




