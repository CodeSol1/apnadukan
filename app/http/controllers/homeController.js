const Menu = require('../../models/menu')


function homeController() {
    return {
         index: async (req, res) => {
            const get_burgers = await Menu.find();
            // console.log(get_burgers)
            res.render("home",{burgers:get_burgers})
        }
    }
}

module.exports = homeController