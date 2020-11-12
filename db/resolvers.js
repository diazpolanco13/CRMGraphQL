const { courses } = require('./courses');



//?<------------------RESOLVERS-------------------------->*//
const resolvers = {
    Query: {
        getCourse: () => courses,
        getTechnology: () => courses
    }
};

module.exports = resolvers