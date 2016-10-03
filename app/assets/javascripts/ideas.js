$(document).ready(function(){
  fetchIdeas();
  fetchIdeasButton();
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
  +"</div></br>")
}

function renderIdeas( ideasData ){
  $("#latest-ideas").html(ideasData);
}

function handleError(error){console.log(error)}

function fetchIdeasButton(){
  $("button[name=button-fetch]").on("click", fetchIdeas);
}
