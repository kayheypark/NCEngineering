// Get all beers
// app.get('', (req, res) => {
//     global.pool.getConnection((err, connection) => {
//         if (err) throw err;
//         console.log(`connected as id ${connection.threadId}`);

//         connection.query('SELECT * FROM product', (err, rows) => {
//             connection.release(); // return the connection to pool

//             if (!err) {
//                 res.send(rows);
//             } else {
//                 console.log(err);
//             };

//         });

//     });
// });

// module.export = api;