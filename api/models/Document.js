module.exports = {

  attributes: {
    title: {
      type: 'string',
      defaultsTo: 'Untitled document'
    },

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
      defaultsTo: ''
    },

    isActive: {
      type: 'boolean',
      defaultsTo: true
    }

  }

};
