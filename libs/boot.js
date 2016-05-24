import fs from "fs";

module.exports = app => {
    if (process.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`NodeAPI Start Project - porta ${app.get("port")}`);
            });
        });
    }
}
