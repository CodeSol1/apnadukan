const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {
    return {
        login: (req, res) => {
            res.render('auth/login')
        },


        postLogin: (req, res, next) => {
            
            const { email, password } = req.body;
            // valiidate request

            if ( !email || !password) {
                req.flash('error', 'All fields are required');
                
                return res.redirect('/login')
            }
            passport.authenticate('local', (err,user,info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                 })
            })(req,res,next)


        },


        register: (req, res) => {
            res.render('auth/register')
        },


        postregister: async(req,res) => {
            const { name, email, password } = req.body;
            // valiidate request
            if (!name || !email || !password)
            {
                req.flash('error', 'All fields are required'),
                req.flash('name1',name),
                req.flash('email1',email)
                return res.redirect('/register')
            }

            // check if email exists already.
            User.exists({ email: email }, (err, result) => {
                
                if (result) {
                    req.flash('error', 'Email already exists'),
                    req.flash('name1', name),
                    req.flash('email1', email)
                    return res.redirect('/register')
                 }

           })

            // hash password
            const hashedPassword = await bcrypt.hash(password,10)

            // create user
            const user = new User({
                name: name,
                email:email,
                password:hashedPassword

            })

            user.save().then((user) => {
                // login
              return res.redirect('/')
            }).catch(() => {
                req.flash('error', 'Something went wrong')
                  
                return res.redirect('/register')
            })

            

            // console.log(req.body)

        },
        
        logout: (req, res)=>{
            req.logout();
        
            return res.redirect('/login')
            
        }

    }
}

module.exports = authController