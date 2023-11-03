import React from 'react'

const Error = ({ children }) => {
  const error = (() => {
    if (!children) return null
    if (typeof children === 'string') return children

    if (Array.isArray(children)) {
      if (children[0]?.extensions?.exception?.errors) {
        const errorsList = Object.values(children[0]?.extensions?.exception?.errors)
        if (errorsList.length === 1 ) return errorsList[0].message

        return (<ul>
          {errorsList.map(({ message }, index) => <li key={`${message}-${index}`}>{message}</li>)}
        </ul>)
      }

      console.log(children[0]);
      return children[0].message
    }

    return null
  })()

  return (
    <>
      {error &&
        <div className='error'>{error}</div>}

      <style jsx>{`
        .error {
          color: red;
          font-weight: 1000;
          margin: 1em 0;

          ul {
            list-style: inside;
          }
        }
      `}</style>
    </>
  )
}

export default Error