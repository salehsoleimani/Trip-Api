module.exports = {
    dev : {
        port : process.env.port || 7800,
        db : process.env.DB_LINK || "mongodb://127.0.0.1/trip",
        jwt : 'TRIPtrip2019',
        hash : 'triphash@13',
        USE_REDIS : true,
        redisUrl : 'redis://127.0.0.1:6379',
    },
    prod : {}
}

