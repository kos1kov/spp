class Database{
    mysql = require('mysql');

    databaseConnection = this.mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "2002"
    });

    constructor() {
        this.databaseConnection.connect((err) => {
            if (err) throw err;
            console.log("Connected!");
            this.databaseConnection.query("CREATE DATABASE IF NOT EXISTS Onliner", function (err, result) {
                if (err) throw err;
                console.log("Database created");
            });

            setTimeout(async () => {
                await this.perform(`
                CREATE TABLE IF NOT EXISTS \`Onliner\`.\`users\` (
                  \`id\` INT NOT NULL AUTO_INCREMENT,
                  \`username\` VARCHAR(1024) NULL,
                  \`email\` VARCHAR(1024) NULL,
                  \`passwordhash\` VARCHAR(256),
                  PRIMARY KEY (\`id\`))
                  ENGINE = InnoDB;
                `);

                await this.perform(`       
                CREATE TABLE IF NOT EXISTS \`Onliner\`.\`news\` (
                  \`id\` INT NOT NULL AUTO_INCREMENT,
                  \`name\` VARCHAR(1024) NOT NULL,
                  \`description\` VARCHAR(1024) NOT NULL,
                  \`photo\` VARCHAR(1024) NULL,
                  \`created_at\` DATETIME NOT NULL,
                  \`modified_at\` DATETIME NOT NULL,
                  PRIMARY KEY (\`id\`)
                  )
                  ENGINE = InnoDB;`
                );

            }, 2500);
        })
    }

    async perform(sql, ...params) {
        return new Promise(((resolve, reject) => {
            this.databaseConnection.query(sql, params, function (err, result) {
                if (err)
                    reject(err);
                resolve(result);
            });
        }))
    }
}

let database = new Database();
exports.databaseConnection = database;