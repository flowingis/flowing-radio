module.exports = (title, result) => {
  return {
    title,
    subtitle: result.title,
    art: {
      sources: [
        {
          url: result.image_url
        }
      ]
    },
    backgroundImage: {
      sources: [
        {
          url: result.image_original_url
        }
      ]
    }
  }
}
