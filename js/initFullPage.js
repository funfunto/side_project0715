$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors:['home', 'about', 'exp', 'skill', 'works', 'contact', 'footer'],
    sectionsColor: ['rgba(0,0,0,.05)', 'rgba(0,0,0,.05)', 'rgba(0,0,0,.05)', 'rgba(0,0,0,.2)', 'rgba(0,0,0,.2)', 'rgba(217 187 187 / 90%)', '#222'],
    scrollOverflow: true,
    menu: '#header'
  });
  $(document).on('click', '#btnGoDown', function(){
    $.fn.fullpage.moveSectionDown();
  });
  $(".expCard").hide();
  
  let bubble = [".babyBlue", ".hotPink", ".yellow", ".orange", ".green", ".purple"];
  let card = [".translate", ".pianoClub", ".shopping", ".government", ".campaign", ".technical"];
  for(let i=0; i<6; i++) {
    $(bubble[i]).hover(function() {
      $(card[i]).fadeIn(60);
    }, function() {
      $(card[i]).fadeOut(60);
    });
  }
});