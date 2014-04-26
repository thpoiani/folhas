module.exports = {

  attributes: {
    hash: {
      type: 'string',
      required: true,
      unique: true,
      index: true
    },

    author: {
      type: 'email',
      defaultsTo: null
    },

    text: {
      type: 'text',
      defaultsTo: null
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true
    }

  }

};
