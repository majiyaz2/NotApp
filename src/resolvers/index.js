const Query = require("./query");
const Mutation = require('./mutation');
const Note = require("./note");
const User = require('./user');

const {DateTimeScalar} = require("graphql-date-scalars")
module.exports = {
    Query,
    Mutation,
    Note,
    User,
    DateTime: DateTimeScalar
};