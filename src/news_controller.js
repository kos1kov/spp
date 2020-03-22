function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

class news_controller{
    db = require("./db/config").databaseConnection;
    findAll(){
        return this.db.perform("SELECT * FROM  \`Onliner\`.\`news\` ORDER BY created_at DESC");
    }

    show(id){
        return this.db.perform("SELECT * FROM  \`Onliner\`.\`news\` where id = ?", id);
    }

    create(item){
        return this.db.perform(
            `insert into \`onliner\`.\`news\` (\`name\`, \`description\`, photo, created_at, modified_at) values (?) `,
            [item.name, item.description,item.photo[0] ? item.photo[0].originalname : null, new Date().toMysqlFormat(), new Date().toMysqlFormat()]
        );
    }

    update(item, id){
        return this.db.perform(
            `update \`Onliner\`.\`news\` set name = ?, description = ?, modified_at = ? where id = ?`,
            item.name, item.description, new Date().toMysqlFormat(), id
        );
    }

    delete(id){
        return this.db.perform(
            `
        delete from \`Onliner\`.\`news\`
        where id = ?
        `,
            id
        );
    }
    async perform(sql, ...params) {
        return new Promise(((resolve, reject) => {
            this.db.query(sql, params, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        }))
    }
}
let newsController = new news_controller();
exports.news_controller = newsController;