$(document).ready(function(){
  fetchIdeas();
  fetchIdeasButton();
  createIdea();
  deleteIdea();
  // changeQuality();
});

function fetchIdeas(){
  $.ajax({
    url: "api/v1/ideas.json",
    type: "get"
  }).then(collectIdeas)
  .then(renderIdeas)
  .fail(handleError)
}


function collectIdeas( ideasData ){
  return ideasData.map(createIdeaHtml);
}

function createIdea(){
  $("#create-idea").on("click", function(){
    var ideaParams = {
      idea: {
        title: $("#idea-title").val(),
        body: $("#idea-body").val()
      }
    }
    $.post("api/v1/ideas.json", ideaParams)
    .then(createIdeaHtml)
    .then(renderIdea)
    .then($('#idea-title').val(''))
    .then($('#idea-body').val(''))
    .fail(handleError)
  })
}

function renderIdea(ideaData){
  $("#latest-ideas").prepend(ideaData);
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
  +data.body.substring(0,100)
  +"</p>"
  +"<p>Quality: "
  +data.quality
  +"</p>"
  +"<button id='delete-idea' name='button-fetch'"
  +" class='btn btn-default btn-xs'>Delete</button>"
  +"<button id='change-quality' name='button-fetch'"
  +" class='btn btn-default btn-xs'>Change Quality</button>"
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
//
// function changeQuality(){
//   $('#latest-ideas').on('click', '#change-quality', funciton(){})
// }
