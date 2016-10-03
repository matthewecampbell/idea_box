$(document).ready(function(){
  fetchIdeas();
  fetchIdeasButton();
  deleteIdea();
});

function fetchIdeas(){
  $.ajax({
    url: "api/v1/ideas.json",
    type: "get"
  }).then(collectIdeas)
  .then(renderIdeas)
  .fail(handleError)
}


function  collectIdeas( ideasData ){
  return ideasData.map(createIdeaHtml);
}

function createIdeaHtml( data ){
  return $("<div class='idea' data-id='"
  +data.id
  +"'><h3>Title: "
  +data.title
  +"</h3>"
  +"<h6>Published on: "
  +data.created_at
  +"</h6><p>Description: "
  +data.body
  +"</p>"
  +"<p>Quality: "
  +data.quality
  +"</p>"
  +"<button id='delete-idea' name='button-fetch'"
  +" class='btn btn-default btn-xs'>Delete</button>"
  +"</div></br>")
}

function renderIdeas( ideasData ){
  $("#latest-ideas").html(ideasData);
}

function handleError(error){console.log(error)}

function fetchIdeasButton(){
  $("button[name=button-fetch]").on("click", fetchIdeas);
}

function deleteIdea(){
  $('#latest-ideas').on('click', '#delete-idea', function(){
    var $idea = $(this).closest('.idea');
    $.ajax({
      url: 'api/v1/ideas/' + $idea.data('id'),
      type: 'delete'
    }).then(function(){
      $idea.remove();
    })
    .fail(handleError);
  });
}
