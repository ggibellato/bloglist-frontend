const blogs = [
  {
    id : 1,
    author :'author 1',
    title : 'blog 1',
    likes : 0,
    url : 'https://test.com',
    user : {
      username : 'testus1',
      name: 'test'
    }
  },
  {
    id : 2,
    author :'author 2',
    title : 'blog 2',
    likes : 0,
    url : 'https://test.com',
    user : {
      username : 'testus1',
      name: 'test'
    }
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }