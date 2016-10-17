const fetchParams = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}

const params = completed =>
  Object.assign( {}, fetchParams, { body: JSON.stringify({ completed }) })

const params2 = title =>
  Object.assign( {}, fetchParams, { body: JSON.stringify({ title }) })

const params3 = description =>
  Object.assign( {}, fetchParams, { body: JSON.stringify({ description }) })

$(document).ready( () => {
  $('.updateTitle').keypress( event => {
    element = $( event.target )
    const id = element.data( 'id' )

    if( event.charCode === 13 ) {
      let updatedTitle = element[0].value
      fetch( `/items/${id}/edit`, params2( updatedTitle ))
      .then( result => result.json() )
      .then( json => {
        if( json.success ) {
          let span = element.prev()
          $( span[0] ).html(updatedTitle)
          element.addClass( 'hidden')
          $( span ).removeClass( 'hidden' )
        }
      })
    }
  })

  $( '.title > span' ).click( event => {
    const element = $( event.target )
    $( element[0] ).addClass( 'hidden' )
    let input = element.next()
    $( input[0]).removeClass( 'hidden' )
  })

  $('.updateDescription').keypress( event => {
    element = $( event.target )
    const id = element.data( 'id' )

    if( event.charCode === 13 ) {
      let updatedDescription = element[0].value
      fetch( `/items/${id}/edit`, params3( updatedDescription ))
      .then( result => result.json() )
      .then( json => {
        if( json.success ) {
          let span = element.prev()
          $( span[0] ).html(updatedDescription)
          element.addClass( 'hidden')
          $( span ).removeClass( 'hidden' )
        }
      })
    }
  })

  $( '.description > span' ).click( event => {
    const element = $( event.target )
    $( element[0] ).addClass( 'hidden' )
    let input = element.next()
    $( input[0]).removeClass( 'hidden' )
  })

  $( '.checkmark' ).click( event => {
    const element = $( event.target )
    const id = element.data( 'id' )
    const completed = ! element.data( 'completed' )

    fetch( `/items/${id}/completed`, params( completed ))
    .then( result => result.json() )
    .then( json => {
      if( json.success ) {
        element.data( 'completed', completed )

        const parent = $( `.title[data-id=${id}]` )
        if( completed ) {
          parent.addClass( 'completed' )
        } else {
          parent.removeClass( 'completed' )
        }
      }
    })
  })
})
