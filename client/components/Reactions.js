import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'

import { Chip } from '@mui/material'

const ROLE = gql`query { role }`

const Reactions = ({ key = null, initReactions = [], onChange = () => {} }) => {
  let loadedInit = false

  const { data: { role = 'guest' } = { } } = useQuery(ROLE, {
    onError: (error) => {
      console.log(error.message);
    }
  })
  
  const initDefaultReactions = [
    {
      label: 'laugh',
      emoji: '😂',
      number: 0,
    },
    {
      label: 'heart',
      emoji: '❤️',
      number: 0,
    },
    {
      label: 'cry',
      emoji: '😭',
      number: 0,
    },
    {
      label: 'fire',
      emoji: '🔥',
      number: 0,
    },
    {
      label: 'like',
      emoji: '👍',
      number: 0,
    },
    {
      label: 'unamused',
      emoji: '😒',
      number: 0,
    },
    {
      label: 'broken',
      emoji: '💔',
      number: 0,
    },
    {
      label: 'dislike',
      emoji: '👎',
      number: 0,
    },
    {
      label: 'shock',
      emoji: '😱',
      number: 0,
    }
  ]

  const [defaultReactions, setDefaultReactions] = useState(initDefaultReactions);
  const [reactions, setReactions] = useState(defaultReactions);
  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (!loadedInit && initReactions?.length) {
      const defRes = defaultReactions.map((el) => {
        const init = initReactions.find(element => el.label === element.label)

        if (init) {
          return {
            ...el,
            number: init?.selected ? init.number - 1 : init.number,
          }
        }

        return el
      })

      const res = defaultReactions.map((el) => {
        const init = initReactions.find(element => el.label === element.label)

        if (init) return {
          ...el,
          number: init.number,
          active: init.selected
        }

        return el
      })

      setDefaultReactions(defRes)
      setReactions(res)

      loadedInit = true
    }
  }, [initReactions]);

  useEffect(() => {
    if (role) setDisable(role === 'guest')
  }, [role]);

  const clickReaction = ({ label }) => {
    onChange(label)

    const result = defaultReactions.map(reaction => {
      if (label === reaction.label) {
        return {
          ...reaction,
          active: true,
          number: Number(reaction.number) + 1
        }
      }

      return reaction
    })

    setReactions(result)
  }

  const hover = disable ? {} : {
    '&:hover': {
      bgcolor: '#9B00FF',
      color: '#ffffff'
    }
  }

  return (
    <>
      <div className='reactions'>
        {
          reactions.map((reaction) => <>
            <Chip
              key={`${key}_${reaction.label}`}
              label={`${reaction.emoji} ${reaction.number}`}
              sx={{
                color: reaction.active ? '#ffffff' : null,
                bgcolor: reaction.active ? '#9B00FF' : null,
                ...hover,
              }}
              onClick={() => { !disable && clickReaction(reaction)}}
            />
          </>)
        }
      </div>

      <style jsx>{`
        .reactions {
          display: flex;
          flex-wrap: wrap;
          gap: .5em;
        }
      `}</style>
    </>
  )
}

export default Reactions