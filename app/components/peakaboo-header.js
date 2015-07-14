import Ember from 'ember';

export default Ember.Component.extend({
  didInsertElement: function() {
    var $peakaboo = Ember.$("header.peakaboo"),
        offset = $peakaboo.offset().top,
        $mini = $peakaboo.clone().addClass('mini');

    var $menu_btn = Ember.$('#open-button');

    $mini.insertAfter($peakaboo);

    var scrollTimer = null;

    Ember.$(window).scroll(function () {
        handleScroll();
        if(Ember.$(".content-wrap>.tour-info").length===0 && Ember.$(".tour-list>article").length>0){
          stickArticles();
        }
    });

   function handleScroll(){
      var scrollBP = offset + $peakaboo.height()*0.95;
      var scrollTop = Ember.$(window).scrollTop();
      if (scrollTop > scrollBP){
        $mini.css({'display':'block'});
        $peakaboo.addClass('p-hidden');
        $menu_btn.addClass('p-mini');
      }
      else{
        $mini.css({'display':'none'});
        $peakaboo.removeClass('p-hidden');
        $menu_btn.removeClass('p-mini');
      }

      if (scrollTop > (scrollBP + $peakaboo.height()) ){
        $mini.addClass('shadow');
      }
      else{
        $mini.removeClass('shadow');
      }
    }

    function stickArticles(){
        var $window = Ember.$(window),
            docViewTop = $window.scrollTop(),
            docViewBottom = docViewTop + $window.height();

        var clearance = 200;
        var $article = Ember.$('.tour-list>article:not(.stuck)').first();
        var elemTop = $article.offset().top;
        var elemBottom = elemTop + $article.height()+clearance;

        var index = $article.index();
        var index_from_qs = parseInt(location.search.replace('?stop=',''));

        if(isNaN(index_from_qs) === false && index===0){
          var href = location.href.replace(location.search,'');
          window.history.replaceState({},"", href);
        }

        else if(isNaN(index_from_qs) === true && index === 1){
          var href = location.href+'?stop='+index;
          window.history.replaceState({},"", href);
        }

        else if(isNaN(index_from_qs) === false && index_from_qs!==index){
          var href = location.href.replace(location.search,'?stop='+index);
          window.history.replaceState({},"", href);
        }

        if((docViewBottom > elemBottom ) && (docViewTop >= elemTop) ){
          $article.css({'height': $article.height()});
          $article.addClass('stuck').addClass('stuck-bottom');
          if($article.height()>$window.height()){
            $article.children('.container').css({'bottom':clearance});
          }
        }

        var $stuck_article = Ember.$('.tour-list>article.stuck').last();
        if($stuck_article.length>0){
          var stuck_elemTop = $stuck_article.offset().top;
          var stuck_elemBottom = stuck_elemTop + $stuck_article.height()+clearance;

          if((docViewTop < stuck_elemTop) || (docViewBottom < stuck_elemBottom) ){
            $stuck_article.css({'height': ''});
            $stuck_article.removeClass('stuck-bottom').removeClass('stuck');
            $stuck_article.children('.container').css({'bottom':''});
          }
        }

    }
  }
});
