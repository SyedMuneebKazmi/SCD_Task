exports.paginate = (model) => {
    return async (req, res, next) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      try {
        const results = await model.find().skip(startIndex).limit(limit);
        res.paginatedResults = results;
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error during pagination', error });
      }
    };
  };
  