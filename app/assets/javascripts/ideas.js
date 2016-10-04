$(document).ready(function(){
  fetchIdeas();
  fetchIdeasButton();
  createIdea();
  deleteIdea();
  increaseQuality();
  decreaseQuality();
  searchTitles();
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
  +" class='btn btn-default btn-xs'><span class='glyphicon glyphicon-thumbs-up'></span></button>"
  +"<button id='decrease-quality' name='button-fetch'"
  +" class='btn btn-default btn-xs'><span class='glyphicon glyphicon-thumbs-down'></span></button>"
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

function searchTitles(){
  var $ideas = $('#latest-ideas');
$('#idea-search').keyup(function() {

    var val = '^(?=.*\\b' + $.trim($(this).val()).split(/\s+/).join('\\b)(?=.*\\b') + ').*$',
        reg = RegExp(val, 'i'),
        text;

    $ideas.show().filter(function() {
        text = $(this).text().replace(/\s+/g, ' ');
        return !reg.test(text);
    }).hide();
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
