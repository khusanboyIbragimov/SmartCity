const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

/*-------------------------------GET Request----------------------------------*/
function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("log out success");
}

function userInfo(req, res, next) {
  db.any(
    `SELECT fullname, username, phone_number, user_imgurl, user_id
     FROM users
     WHERE user_id=${req.user.user_id}`
  )
  .then(data => {
    res.json(data);
  })
  .catch(err => {
    console.log(err);
  });
}

function getAllNews(req, res, next) {
  db.any(
   `SELECT news.news_id, title, news_timestamp, FULLname, news_imgurl, text,
    string_agg(DISTINCT rightnews.USER_id::CHARACTER VARYING, ', ') AS users_who_agree,
    string_agg(DISTINCT wrongnews.USER_id::CHARACTER VARYING, ', ') AS users_who_disagree
    FROM rightnews
    FULL JOIN news ON(rightnews.news_id=news.news_id)
    INNER JOIN users ON (users.user_id=news.user_id)
    FULL JOIN wrongnews ON(wrongnews.news_id=news.news_id)
    GROUP BY rightnews.news_id, news.news_id, users.fullname
    ORDER BY news_timestamp DESC`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getAllRentItems(req, res, next) {
  db.any(
   `SELECT title, description, item_timestamp, FULLname, item_id, phone_number, price, item4rent_imgurl, section
    FROM item4rent
    INNER JOIN users
    ON(users.user_id=item4rent.user_id)
    ORDER BY item_timestamp DESC;`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getAllServices(req, res, next) {
  db.any(
   `SELECT title, description, FULLname, service_id, phone_number, price, service_imgurl, section
    FROM services
    INNER JOIN users
    ON(users.user_id=services.user_id);`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getAllSaleItems(req, res, next) {
  db.any(
   `SELECT title, condition, description, item_timestamp, FULLname, item_id, phone_number, price, item4sale_imgurl, section
    FROM item4sale
    INNER JOIN users
    ON(users.user_id=item4sale.user_id)
    ORDER BY item_timestamp DESC;`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

// SELECT survey_question.survey_question_id, survey_question_options.survey_question_options_id, options,
// string_agg(DISTINCT votes_of_options.USER_id::CHARACTER VARYING, ', ') AS users,
// COUNT (votes_of_options.user_id)
// FROM survey_question_options
// FULL JOIN survey_question
// ON (survey_question.survey_question_id=survey_question_options.survey_question_id)
// FULL JOIN votes_of_options
// ON (survey_question_options.survey_question_options_id=votes_of_options.survey_question_options_id)
// GROUP BY survey_question.survey_question, survey_question_options.survey_question_options_id, survey_question.survey_question_id;

function getAllSurveys(req, res, next) {
  db.any(
   `SELECT survey_question.survey_question_id, survey_question,survey_timestamp,
    survey_question_options.survey_question_options_id, fullname, options AS text,
    string_agg(DISTINCT votes_of_options.USER_id::CHARACTER VARYING, ',') AS users
    FROM votes_of_options
    FULL JOIN survey_question
    ON (survey_question.survey_question_id=votes_of_options.survey_question_id)
    FULL JOIN survey_question_options
    ON (survey_question.survey_question_id=survey_question_options.survey_question_id)
    INNER JOIN users
    ON (survey_question.user_id=users.user_id)
    GROUP BY survey_question.survey_question_id, survey_question_options.options,
    survey_question_options.survey_question_options_id, users.fullname
    ORDER BY survey_timestamp desc;`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    res.json(err);
  })
}

function getSingleItem(req, res, next) {
  if (req.params.section === 'sale') {
    db.any(
      `SELECT title, condition, description, item_timestamp, fullname, phone_number, price, item4sale_imgurl, views
       FROM item4sale
       INNER JOIN users
       ON(users.user_id=item4sale.user_id)
       WHERE item_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  } else if (req.params.section === 'rent') {
    db.any(
      `SELECT title, condition, description, item_timestamp, fullname, phone_number, price, item4rent_imgurl, views
       FROM item4rent
       INNER JOIN users
       ON(users.user_id=item4rent.user_id)
       WHERE item_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  } else if (req.params.section === 'service') {
    db.any(
      `SELECT title, description, fullname, phone_number, price, service_imgurl, views
       FROM services
       INNER JOIN users
       ON(users.user_id=services.user_id)
       WHERE service_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  }
}

function getAllAnnouncements(req, res, next) {
  db.any(
    `SELECT title, announcement, announ_timestamp, FULLname, user_imgurl, announcement_id
     FROM announcement
     INNER JOIN users
     ON(users.user_id=announcement.user_id)
     ORDER BY announ_timestamp DESC;`
   )
   .then( data => {
     res.json(data);
     console.log(data)
   })
   .catch( err => {
     console.log(err);
   })
}

function getUsersPosts(req, res, next) {
  db.any(
    `SELECT *
     FROM news
     WHERE user_id=${req.user.user_id}
     ORDER BY news_timestamp DESC;`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getUsersAnnouncement(req, res, next) {
  db.any(
    `SELECT *
     FROM announcement
     WHERE user_id=${req.user.user_id}
     ORDER BY announ_timestamp DESC;`
  )
  .then( data => {
    res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getUsersId(req, res, next) {
  if (req.user !== undefined) {
    db.any(
      `SELECT user_id
       FROM users;`
    )
    .then( () => {
      res.json(req.user.user_id);
    })
    .catch( (err) => {
      console.log(err);
    })
  }
}

function getMyRatings(req, res, next) {
  db.any(
    `SELECT rating_question_id, rating_question
     FROM rating_question
     WHERE user_id=${req.user.user_id}`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

function getUsersRentItems(req, res, next) {
  db.any(
    `SELECT item_id, description, item_timestamp, title, price
     FROM item4rent
     WHERE user_id=${req.user.user_id}`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

function getUsersServices(req, res, next) {
  db.any(
    `SELECT service_id, description, title, price, service_imgurl
     FROM services
     WHERE user_id=${req.user.user_id}`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

function getUsersSaleItems(req, res, next) {
  db.any(
    `SELECT item_id, description, item_timestamp, title, price, condition
     FROM item4sale
     WHERE user_id=${req.user.user_id}`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

// SELECT ARRAY( SELECT rating_score
//   FROM survey_rating
//   WHERE survey_question_id=4);

// SELECT survey_question.survey_question_id, survey_question, fullname,  AVG(rating_score), array(SELECT feedback FROM survey_rating WHERE survey_rating.survey_question_id IN(SELECT survey_question_id FROM survey_rating))
//    FROM survey_question
//    INNER JOIN users
//    ON(users.user_id=survey_question.user_id)
// FULL JOIN survey_rating
// ON(survey_question.survey_question_id=survey_rating.survey_question_id)
// GROUP BY survey_question.survey_question_id, users.fullname, survey_rating.feedback;

// SELECT feedback, survey_rating.survey_question_id
// FROM survey_rating
// WHERE survey_rating.survey_question_id
// IN (SELECT survey_question.survey_question_id
// FROM survey_question
// INNER JOIN survey_rating
// ON (survey_question.survey_question_id=survey_rating.survey_question_id))
// GROUP BY survey_rating.survey_question_id, survey_rating.feedback


// SELECT survey_question_id , string_agg(user_id::CHARACTER varying, ',')
// FROM survey_rating
// GROUP BY survey_question_id;

function getAllRatings(req, res, next) {
  if (req.user !== undefined) {
    db.any(
      `SELECT rating_question.rating_question_id, rating_question, fullname, rating_timestamp,
       AVG(rating_score), string_agg(rating_question_score.user_id::CHARACTER varying, ',') AS users_who_rated,
       string_agg(DISTINCT feedback, ' ~* ') AS feedbacks
       FROM rating_question
       INNER JOIN users
       ON(users.user_id=rating_question.user_id)
       FULL JOIN rating_question_score
       ON(rating_question.rating_question_id=rating_question_score.rating_question_id)
       GROUP BY rating_question.rating_question_id, users.fullname, rating_question_score.rating_question_id
			 ORDER BY rating_timestamp DESC;`
     )
     .then( data => {
       if (data !== null) {
         res.json(data);
       }
     })
     .catch( err => {
       console.log(err);
     })
  }
  else {
    db.any(
      `SELECT rating_question.rating_question_id, rating_question, fullname,  AVG(rating_score),
       string_agg(DISTINCT feedback, ' ~* ') AS feedbacks
       FROM rating_question
       INNER JOIN users
       ON(users.user_id=rating_question.user_id)
       FULL JOIN rating_question_score
       ON(rating_question.rating_question_id=rating_question_score.rating_question_id)
       GROUP BY rating_question.rating_question_id, users.fullname, users.user_id;`
     )
     .then( data => {
       if (data !== null) {
         res.json(data);
       }
     })
     .catch( err => {
       console.log(err);
     })
  }
}

function getWrongCounts(req, res, next) {
  db.any(
    `SELECT wrongnews.news_id, COUNT (wrongnews.user_id) as wrongees
    FROM wrongnews
    WHERE wrongnews.news_id
    IN (SELECT news_id FROM wrongnews)
    GROUP BY wrongnews.news_id`
  )
  .then( data => {
      res.json(data);
  })
  .catch( err => {
    console.log(err);
  })
}

function getRightCounts(req, res, next) {
    db.any(
      `SELECT rightnews.news_id, COUNT (rightnews.user_id) as rightees
       FROM rightnews
      WHERE rightnews.news_id
      IN (SELECT news_id FROM rightnews)
      GROUP BY rightnews.news_id`
    )
    .then( (data) => {
      res.json(data);
    })
    .catch( (err) => {
      console.log(err);
    })
  }
  function getSurveyCounts(req, res, next) {
    db.any(
      `SELECT COUNT (user_id) AS value, survey_question_options.survey_question_options_id
      FROM votes_of_options
      INNER JOIN survey_question_options
      ON (survey_question_options.survey_question_options_id=votes_of_options.survey_question_options_id)
      GROUP BY votes_of_options.survey_question_options_id, survey_question_options.options, survey_question_options.survey_question_options_id;`
    )
    .then( (data) => {
      res.json(data);
    })
    .catch( (err) => {
      console.log(err);
    })
  }

function getUserSurveys(req, res, next) {
  db.any(
    `SELECT survey_question, survey_question.survey_question_id,
     string_agg (DISTINCT options:: CHARACTER VARYING, ', ') AS options
     FROM survey_question
     INNER JOIN survey_question_options
     ON (survey_question.survey_question_id=survey_question_options.survey_question_id)
     WHERE user_id=${req.user.user_id}
     GROUP BY survey_question.survey_question, survey_question.survey_question_id;`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

/*-------------------------------POST Request----------------------------------*/
function getRegister(req, res, next) {
  return authHelpers
    .createUser(req)
    .then(response => {
      passport.authenticate("local", (err, user, info) => {
        if (user) {
          res.status(200).json({
            status: "success",
            data: user,
            message: "Registered one user"
          });
        }
      })(req, res, next);
    })
    .catch(err => {
      res.status(500).json({
        error: err,
        detail: err.detail
      });
    });
}

function insertNews(req, res, next) {
  return db.none(
    "INSERT INTO news (user_id, title, text, news_imgurl) VALUES (${user_id}, ${title}, ${text}, ${news_imgurl})",
    {
      user_id: req.user.user_id,
      title: req.body.title,
      text: req.body.text,
      news_imgurl: req.body.news_imgurl
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function ratingQuestion(req, res, next) {
  return db.none(
    "INSERT INTO rating_question (user_id, rating_question) VALUES (${user_id}, ${rating_question})",
    {
      rating_question: req.body.rating_question,
      user_id: req.user.user_id
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function surveyQuestion(req, res, next) {
  return db.one(
    "INSERT INTO survey_question(user_id, survey_question) VALUES (${user_id}, ${survey_question}) RETURNING survey_question_id",
    {
      user_id: req.user.user_id,
      survey_question: req.body.survey_question
    }
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

function postSurveyOptions(req, res, next) {
  return db.task(
    t => {
      const options = req.body.options;
      const queries = options.map( option => {
        return t.none(
          "INSERT INTO survey_question_options (survey_question_id, options) VALUES (${survey_question_id}, ${options})",
          {
            survey_question_id: req.body.survey_question_id,
            options: option.name
          }
        )
      })
      return t.batch(queries);
    })
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

// SELECT COUNT (votes_of_options.user_id), survey_question, options, survey_question.survey_question_id,
// string_agg(DISTINCT votes_of_options.USER_id::CHARACTER VARYING, ', ') AS users
// FROM survey_question
// FULL JOIN survey_question_options
// ON (survey_question.survey_question_id=survey_question_options.survey_question_id)
// FULL JOIN votes_of_options
// ON (survey_question_options.survey_question_options_id=votes_of_options.survey_question_options_id)
// GROUP BY survey_question.survey_question, survey_question_options.options, survey_question.survey_question_id
// ORDER BY survey_question.survey_question_id;

function rating(req, res, next) {
  return db.none(
    "INSERT INTO rating_question_score (rating_question_id, user_id, rating_score, feedback) VALUES (${rating_question_id}, ${user_id}, ${rating_score}, ${feedback})",
    {
      rating_question_id: req.body.rating_question_id,
      user_id: req.user.user_id,
      rating_score: req.body.rating_score,
      feedback: req.body.feedback
    }
  )
    .then((data) => {
      res.json('success');
    })
    .catch((err) => {
      console.log(err);
    })
}

function insertAnnouncement(req, res, next) {
  return db.none(
    "INSERT INTO announcement (user_id, title, announcement) VALUES (${user_id}, ${title}, ${announcement})",
    {
      user_id: req.user.user_id,
      title: req.body.title,
      announcement: req.body.announcement
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function insertRentItem(req, res, next) {
  return db.none(
    "INSERT INTO item4rent (user_id, title, description, price, item4rent_imgurl, section, views) VALUES (${user_id}, ${title}, ${description}, ${price}, ${item4rent_imgurl}, ${section}, ${views})",
    {
      user_id: req.user.user_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      item4rent_imgurl: req.body.item4rent_imgurl,
      section: "rent",
      views: 0
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function insertService(req, res, next) {
  return db.none(
    "INSERT INTO services (user_id, title, description, price, service_imgurl, section, views) VALUES (${user_id}, ${title}, ${description}, ${price}, ${service_imgurl}, ${section}, ${views})",
    {
      user_id: req.user.user_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      service_imgurl: req.body.service_imgurl,
      section: "service",
      views: 0
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function insertSaleItem(req, res, next) {
  return db.none(
    "INSERT INTO item4sale (user_id, title, description, price, condition, item4sale_imgurl, section, views) VALUES (${user_id}, ${title}, ${description}, ${price}, ${condition}, ${item4sale_imgurl}, ${section}, ${views})",
    {
      user_id: req.user.user_id,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      condition: req.body.condition,
      item4sale_imgurl: req.body.item4sale_imgurl,
      section: "sale",
      views: 0
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function postSurveyVote(req, res, next) {
  return db.none(
    "INSERT INTO votes_of_options(user_id, survey_question_id, survey_question_options_id) VALUES (${user_id}, ${survey_question_id}, ${survey_question_options_id})",
    {
      user_id: req.user.user_id,
      survey_question_id: req.body.survey_question_id,
      survey_question_options_id: req.body.survey_question_options_id
    }
  )
  .then( (data) => {
    res.json('success');
  })
  .catch( (err) => {
    console.log(err);
  })
}

function insertRightNews(req, res, next) {
  return db.none(
    "INSERT INTO rightnews (user_id, news_id) VALUES (${user_id}, ${news_id})",
    {
      user_id: req.user.user_id,
      news_id: req.body.news_id
    }
  )
    .then( (data) => {
      return db.none(
        `DELETE
         FROM wrongnews
         WHERE user_id=${req.user.user_id} AND news_id=${req.body.news_id}
         `
      )
    })
    .then( (data) => {
      res.json('success')
    })
    .catch( (err) => {
      console.log(err);
    })
}

function insertWrongNews(req, res, next) {
  return db.none(
    "INSERT INTO wrongnews (user_id, news_id) VALUES (${user_id}, ${news_id})",
    {
      user_id: req.user.user_id,
      news_id: req.body.news_id
    }
  )
    .then( (data) => {
      return db.none(
        `DELETE
         FROM rightnews
         WHERE user_id=${req.user.user_id} AND news_id=${req.body.news_id}
         `
      )
    })
    .then( (data) => {
      res.json('success')
    })
    .catch( (err) => {
      console.log(err);
    })
}


function login(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      res.status(500).send("error while trying to log in");
    } else if (!user) {
      res.status(401).send("wrong_password");
    } else if (user) {
      req.logIn(user, function(err) {
        if (err) {
          res.status(500).send("error");
        } else {
          res.status(200).send(user);
        }
      });
    }
  })(req, res, next);
}

/*-------------------------------PATCH Request----------------------------------*/
function updateProfile(req, res, next) {
  return db
    .none(
      `UPDATE users
       SET fullname=$1, username=$2, phone_number=$3, user_imgurl=$4
       WHERE user_id=${req.user.user_id};`,
      [
        req.body.fullname,
        req.body.username,
        req.body.phone_number,
        req.body.user_imgurl
      ]
    )
    .then(data => {
      res.json("success");
    })
    .catch(error => {
      res.json(error);
    });
}

function editNews(req, res, next) {
  return db
    .none(
      `UPDATE news
       SET title=$1, text=$2
       WHERE news_id=${req.body.news_id}`,
       [
         req.body.title,
         req.body.text,
       ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function editAnnouncement(req, res, next) {
  return db
    .none(
      `UPDATE announcement
       SET title=$1, announcement=$2
       WHERE announcement_id=${req.body.announcement_id}`,
       [
         req.body.title,
         req.body.announcement,
       ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function deleteNews(req, res, next) {
  console.log("deleteNews: ", req.body.news_id)

  return db
    .none(
      `DELETE
       FROM news
       WHERE news_id=${req.body.news_id}`
    )
    .then( (data) => {
      res.json(data);
    })
    .catch( (err) => {
      console.log(err);
    })
}

function deleteRightNews(req, res, next) {
  console.log("deleterightNews: ", req.body.news_id)
  return db
    .none(
      `DELETE
       FROM rightnews
       WHERE news_id=${req.body.news_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}

function deleteWrongNews(req, res, next) {
  console.log("deletewrongNews: ", req.body.news_id)
  return db
    .none(
      `DELETE
       FROM wrongnews
       WHERE news_id=${req.body.news_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      res.json(err);
    })
}

function deleteAnnouncement(req, res, next) {
  return db
  .none(
    `DELETE
     FROM announcement
     WHERE announcement_id=${req.body.announcement_id}`
  )
  .then( (data) => {
    res.json(data);
  })
  .catch( (err) => {
    console.log(err);
  })
}

function deleteMyRating(req, res, next) {
  return db
    .none(
      `DELETE
       FROM rating_question
       WHERE rating_question_id=${req.body.rating_question_id};`
    )
    .then( (data) => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function deleteMySurvey(req, res, next) {
  return db
    .none(
      `DELETE
       FROM survey_question
       WHERE survey_question_id=${req.body.survey_question_id};`
    )
    .then( (data) => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function deleteFeedback4MyRating(req, res, next) {
  return db
    .none(
      `DELETE
       FROM rating_question_score
       WHERE rating_question_id=${req.body.rating_question_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function deleteRentItem(req, res, next) {
  return db
    .none(
      `DELETE
       FROM item4rent
       WHERE item_id=${req.body.item_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function deleteService(req, res, next) {
  return db
    .none(
      `DELETE
       FROM services
       WHERE service_id=${req.body.service_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function deleteSaleItem(req, res, next) {
  return db
    .none(
      `DELETE
       FROM item4sale
       WHERE item_id=${req.body.item_id};`
    )
    .then( data => {
      res.json("deleted");
    })
    .catch( err => {
      console.log(err);
    })
}

function editMyRating(req, res, next) {
  return db
    .none(
      `UPDATE rating_question
       SET rating_question=$1
       WHERE rating_question_id=${req.body.rating_question_id}`,
      [
        req.body.rating_question,
      ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function editRentItem(req, res, next) {
  return db
    .none(
      `UPDATE item4rent
       SET title=$1, description=$2, price=$3
       WHERE item_id=${req.body.item_id}`,
      [
        req.body.title,
        req.body.description,
        req.body.price
      ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function editService(req, res, next) {
  return db
    .none(
      `UPDATE services
       SET title=$1, description=$2, price=$3
       WHERE service_id=${req.body.service_id}`,
      [
        req.body.title,
        req.body.description,
        req.body.price
      ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function editSaleItem(req, res, next) {
  return db
    .none(
      `UPDATE item4sale
       SET title=$1, description=$2, price=$3, condition=$4
       WHERE item_id=${req.body.item_id}`,
      [
        req.body.title,
        req.body.description,
        req.body.price,
        req.body.condition
      ]
    )
    .then( (data) => {
      res.json('success');
    })
    .catch( (err) => {
      console.log(err);
    })
}

function increaseViews(req, res, next) {
  if (req.params.section === 'sale') {
    db.any(
      `UPDATE item4sale
       SET views=views + 1
       WHERE item_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  } else if (req.params.section === 'rent') {
    db.any(
      `UPDATE item4rent
       SET views=views + 1
       WHERE item_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  } else if (req.params.section === 'service') {
    db.any(
      `UPDATE services
       SET views=views + 1
       WHERE service_id=${req.params.id}`
    )
    .then( data => {
      res.json(data);
    })
    .catch( err => {
      res.json(err);
    })
  }
}


module.exports = {
  /*-------GET Request-------*/
  logoutUser,
  userInfo,
  getAllNews,
  getAllRentItems,
  getAllServices,
  getAllSaleItems,
  getAllSurveys,
  getSingleItem,
  getAllAnnouncements,
  getUsersPosts,
  getMyRatings,
  getUsersRentItems,
  getUsersServices,
  getUsersSaleItems,
  getAllRatings,
  getUsersAnnouncement,
  getUsersId,
  getWrongCounts,
  getRightCounts,
  getSurveyCounts,
  getUserSurveys,
  /*-------POST Request-------*/
  login,
  getRegister,
  rating,
  insertNews,
  insertAnnouncement,
  insertRentItem,
  insertService,
  insertSaleItem,
  postSurveyVote,
  insertRightNews,
  insertWrongNews,
  ratingQuestion,
  surveyQuestion,
  postSurveyOptions,
  /*-------PATCH Request-------*/
  updateProfile,
  editNews,
  editAnnouncement,
  deleteNews,
  deleteRightNews,
  deleteWrongNews,
  deleteAnnouncement,
  deleteMyRating,
  deleteMySurvey,
  deleteFeedback4MyRating,
  deleteRentItem,
  deleteService,
  deleteSaleItem,
  editMyRating,
  editRentItem,
  editService,
  editSaleItem,
  increaseViews
}
