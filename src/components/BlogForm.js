import React  from 'react'
import  { useField } from '../hooks'

const BlogForm = ({ handleCreate }) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const submitCreate = (event) => {
    event.preventDefault()
    handleCreate(title.value, author.value, url.value)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={submitCreate}>
        <div>
          title:
          <input
            name="title"
            {...title.input}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            {...author.input}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            {...url.input}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
