$(document).ready(function(){
  var $ideas = []
  fetchIdeas();
  fetchIdeasButton();
  createIdea();
  deleteIdea();
  increaseQuality();
  decreaseQuality();
  searchTitles();
});


function searchTitles(){
  $("#idea-search").on('keyup', function(e){
    var searchMatches = search(e.target.value)
    var ideasHtml = searchMatches.map(function(e) {
      return createIdeaHtml(e)
    })
    renderIdeas(ideasHtml)
  })
}

function search(arg){
  if (arg){
    return $ideas.filter(function(e){
      return e.title.toLowerCase().includes(arg.toLowerCase()) || e.body.toLowerCase().includes(arg.toLowerCase())
    })
  } else {
    return $ideas
  }
}

function fetchIdeas(){
  $.ajax({
    url: "api/v1/ideas.json",
    type: "get",
    success: function(response){
      $ideas = response
    }
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
  +"'><h3 class='ideaTitleEdit' contenteditable='true'>Title: "
  +data.title
  +"</h3>"
  +"<h6>Published on: "
  +data.created_at
  +"</h6><p class='ideaBodyEdit' contenteditable='true'>Description: "
  +data.body.substring(0,100)
  +"</p>"
  +"<p>Quality: "
  +data.quality
  +"</p>"
  +"<button id='delete-idea' name='button-fetch'"
  +" class='btn btn-default btn-xs'>Delete</button>"
  +"<button id='increase-quality' name='button-fetch'"
  +" class='btn btn-default btn-xs'><i class='fa fa-camera-retro'></i></button>"
  +"<button id='decrease-quality' name='button-fetch'"
  +" class='btn btn-default btn-xs'><i class='fa fa-camera-retro'></i></button>"
  +"</div></br>")
}

function increaseQuality(){
  $('#latest-ideas').on('click', '#increase-quality', function(){
    var $idea = $(this).closest('.idea');
    $.ajax({
      url: 'api/v1/ideas/' + $idea.data('id') + "?change=increase",
      type: 'put'
    })
    .then(fetchIdeas)
    .fail(handleError)
  })
}

function decreaseQuality(){
  $('#latest-ideas').on('click', '#decrease-quality', function(){
    var $idea = $(this).closest('.idea');
    $.ajax({
      url: 'api/v1/ideas/' + $idea.data('id') + "?change=decrease",
      type: 'put'
    })
    .then(fetchIdeas)
    .fail(handleError)
  })
}

function saveUpdate(){
  $('#latest-ideas').on('click', '')
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

// function searchTitles(){
//   $("#idea-search").bind("keyup", function() {
//     var text = $(this).val().toLowerCase();
//     var titles = $(".ideaTitleEdit");
//
//     //first, hide all:
//     titles.parent().hide();
//
//     //show only those matching user input:
//     titles.filter(function () {
//       return $(this).text().toLowerCase().indexOf(text) == 0;
//     }).parent().show();
//
//   });
// }
//
// function changeQuality(){
//   $('#latest-ideas').on('click', '#change-quality', funciton(){})
// }
