const FETCH_PARAMS = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  credentials: 'include'
}

const params = data =>
  Object.assign( {}, FETCH_PARAMS, { body: JSON.stringify( data ) } )

const titleEdited = event => {
  element = $( event.target )
  const id = element.data( 'id' )

  if( event.charCode === 13 ) {
    let updatedTitle = element[0].value
    fetch( `/items/${id}/edit`, params( { title: updatedTitle } ) )
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
}

const titleClicked = event => {
  const element = $( event.target )
  $( element[0] ).addClass( 'hidden' )
  let input = element.next()
  $( input[0]).removeClass( 'hidden' )
}

$(document).ready( () => {
  $('.edit-title').keypress( titleEdited )

  $( '.title > span' ).click( titleClicked )

  $('.edit-description').keypress( event => {
    element = $( event.target )
    const id = element.data( 'id' )

    if( event.charCode === 13 ) {
      let updatedDescription = element[0].value
      fetch( `/items/${id}/edit`, params( { description: updatedDescription } ) )
      .then( result => result.json() )
      .then( json => {
        if( json.success ) {
          let span = element.prev()
          $( span[0] ).html( updatedDescription )
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

    fetch( `/items/${id}/completed`, params({ completed: completed } ) )
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

  $( '.heading' ).hover( event => {
    const element = $( event.target )
    
    $( '.plusMinus' ).addClass( 'hidden2' )
  })

  $( '.plusMinus' ).click( event => {
    const element = $( event.target )
    parent = $( element.parent() )
  })
})
