const mysql = require('mysql');
var pool;

module.exports = {
    getPool: function () {
		if (pool)
			return pool;

		const offset = new Date().getTimezoneOffset(), o = Math.abs(offset);
		const timezone_offset = (offset < 0 ? "+" : "-") + ("00" + Math.floor(o / 60)).slice(-2) + ":" + ("00" + (o % 60)).slice(-2);
		
		console.log(timezone_offset);
		
		pool = mysql.createPool({
			connectionLimit: 4,
			host: '10.189.164.34',
			user: 'rio',
			password: '',
			database: 'rio203',
			timezone: timezone_offset
	
		})

		return pool;
    }
};
